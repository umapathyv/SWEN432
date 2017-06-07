Question 1 :


DROP TABLE TIME ;
CREATE TABLE time (
      TimeId serial primary key,
      OrderDate date NOT NULL,
      DayOfWeek character(10) NOT NULL,
      Month character(10) NOT NULL,
      Year integer NOT NULL
  );

INSERT INTO time ( OrderDate, DayOfWeek, Month ,Year )
SELECT  DISTINCT  cust_order.orderdate ,
  to_char(   cust_order.orderdate  ,'Day') as DayOfWeeek  , to_char( cust_order.orderdate ,'Month' ) as Month,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;

SELECT * FROM TIME;



DROP MATERIALIZED VIEW Sales ;
CREATE materialized view Sales as
select customer.CustomerId as  CustomerId , TIME.TimeId as TimeId   , book.isbn AS  ISBN ,  SUM(order_detail.quantity * book.price)  AS Amnt
from book NATURAL join order_detail NATURAL JOIN cust_order NATURAL JOIN customer NATURAL JOIN TIME
group by  customer.CustomerId  ,  TIME.TimeId  ,book.isbn
order by  customer.CustomerId , TIME.TimeId   ,  book.isbn  ;

select * from Sales ;



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






wusong3=> SELECT SUM(avg_amnt)/ COUNT(DISTINCT sales.CustomerId)
wusong3-> AS Total_Avg
wusong3-> FROM avg_amnt_view NATURAL join  sales ;
       total_avg
------------------------
 13281.9230769230769225
(1 row)
