Question 1 :



DROP TABLE if exists  TIME ;
CREATE TABLE time (
      TimeId serial primary key,
      OrderDate date NOT NULL,
      DayOfWeek character(10) NOT NULL,
      Month character(10) NOT NULL,
      Year integer NOT NULL
  );

INSERT INTO time ( OrderDate, DayOfWeek, Month ,Year )
SELECT  DISTINCT cust_order.orderdate ,
  to_char(   cust_order.orderdate  ,'Day') as DayOfWeeek  , to_char( cust_order.orderdate ,'Month' ) as Month,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;

SELECT COUNT(*) FROM TIME;




drop  materialized view if exists Sales ;
CREATE materialized view Sales as
select customer.CustomerId as  CustomerId ,TIME.TimeId as TimeId   , book.isbn AS  ISBN ,  SUM(order_detail.quantity * book.price)  AS Amnt
from book NATURAL join order_detail NATURAL JOIN cust_order NATURAL JOIN customer NATURAL JOIN TIME
group by  customer.CustomerId  ,  TIME.TimeId  ,book.isbn
order by  customer.CustomerId , TIME.TimeId   ,  book.isbn  ;

select COUNT(*) from Sales;


Question 2



wusong3=> create materialized view avg_amnt_view as select customerid,
wusong3-> avg(amnt) as avg_amnt from sales group by customerid;
SELECT 104
wusong3=>
wusong3=> select avg(avg_amnt) from avg_amnt_view;
         avg
----------------------
 202.9588687852809865
(1 row)

wusong3=>
wusong3=>
wusong3=> select avg(amnt) from sales;
         avg
----------------------
 161.3691588785046729
(1 row)


The second one is the correct answer because average of average is ignoring the weight of each column.




create materialized view customerSUM AS
SELECT SUM(AMNT) ,  customerid FROM SALES GROUP BY customerid ;




SELECT COUNT(DISTINCT sales.CustomerId)
AS Total_Avg
FROM avg_amnt_view NATURAL join  sales ;

wusong3=> SELECT SUM(avg_amnt)/ COUNT(DISTINCT sales.CustomerId)
wusong3-> AS Total_Avg
wusong3-> FROM avg_amnt_view NATURAL join  sales ;
       total_avg
-----------------------
 4973.7019230769230768
(1 row)


Question 3 .
a)
SELECT SUM (AMNT) AS money, customer.customerid , customer.l_name  , customer.f_name   from sales  NATURAL join customer
group by customer.customerid , customer.l_name  , customer.f_name
 ORDER BY money DESC limit 5;


 wusong3=> SELECT SUM (AMNT) AS money, customer.customerid , customer.l_name  , customer.f_name   from sales  NATURAL join customer
 wusong3-> group by customer.customerid , customer.l_name  , customer.f_name
 wusong3->  ORDER BY money DESC limit 5;
   money   | customerid |        l_name        |        f_name
 ----------+------------+----------------------+----------------------
  17810.00 |          1 | Jacson               | Kirk
  14100.00 |          3 | Andree               | Peter
  11780.00 |         14 | Anslow               | Craig
   7145.00 |          2 | Leow                 | May-N
   6095.00 |         79 | Liang                | Jiajun
 (5 rows)





b)



drop  materialized view if exists BestCS ;
create materialized view BestCS AS
  SELECT SUM (AMNT) AS money, customer.customerid AS CID, customer.l_name  , customer.f_name   from sales  NATURAL join customer
  group by customer.customerid , customer.l_name  , customer.f_name
  ORDER BY money DESC limit 1 ;
SELECT CID FROM BestCS ;


drop  materialized view if exists BestCSorders ;
create materialized view BestCSorders AS
Select Sum (AMNT) AS BST , order_detail.orderid from sales NATURAL join order_detail NATURAL JOIN customer NATURAL JOIN cust_order
where  sales.customerid =   (SELECT CID FROM BestCS )
 group by order_detail.orderid  ;


 drop  materialized view if exists numerator ;
 create materialized view numerator AS
SELECT COUNT(BST) as n FROM BestCSorders WHERE BST > (Select SUM(AMNT)  / COUNT(cust_order.orderid)  from customer NATURAL join cust_order NATURAL join sales) ;


drop  materialized view if exists denominator ;
create materialized view denominator AS
SELECT  COUNT(cust_order.orderid) as no_of_ord from customer NATURAL join cust_order  where customer.customerid =  (SELECT CID FROM BestCS ) ;



drop  materialized view if exists division ;
create materialized view division AS
SELECT  n, no_of_ord  from numerator  NATURAL join  denominator ;


select n/no_of_ord from division ;
