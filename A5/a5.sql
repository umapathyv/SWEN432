Question 1 :

CREATE TABLE author (
    authorid integer NOT NULL,
    name character(15),
    surname character(15) NOT NULL
);


--
-- Name: book; Type: TABLE; Schema: public; Owner: ; Tablespace:
--

CREATE TABLE book (
    isbn integer NOT NULL,
    title character(60) NOT NULL,
    edition_no smallint DEFAULT 1,
    price numeric(6,2) NOT NULL,
    CONSTRAINT book_edition_no CHECK ((edition_no > 0)),
    CONSTRAINT book_price CHECK ((price > (0)::numeric))
);


--
-- Name: book_author; Type: TABLE; Schema: public; Owner: ; Tablespace:
--

CREATE TABLE book_author (
    isbn integer NOT NULL,
    authorid integer NOT NULL,
    authorseqno smallint DEFAULT 1,
    CONSTRAINT book_author_authorseqno CHECK ((authorseqno > 0))
);


--
-- Name: cust_order; Type: TABLE; Schema: public; Owner: ; Tablespace:
--

CREATE TABLE cust_order (
    orderid integer NOT NULL,
    orderdate date NOT NULL,
    customerid integer NOT NULL ,
    CONSTRAINT cust_order_customerid CHECK ((customerid > 0)),
    CONSTRAINT cust_order_orderid CHECK ((orderid > 0))
);


--
-- Name: customer; Type: TABLE; Schema: public; Owner: ; Tablespace:
--

CREATE TABLE customer (
    customerid integer NOT NULL,
    l_name character(20) NOT NULL,
    f_name character(20),
    city character(15) NOT NULL,
    district character(15) NOT NULL,
    country character(15) NOT NULL,
    CONSTRAINT customer_customerid CHECK ((customerid > 0))
);


--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: ; Tablespace:
--

CREATE TABLE order_detail (
    orderid integer NOT NULL,
    item_no smallint NOT NULL,
    isbn integer DEFAULT 0 NOT NULL,
    quantity smallint DEFAULT 1 NOT NULL,
    CONSTRAINT order_detail_item_no CHECK ((item_no > 0)),
    CONSTRAINT order_detail_orderid CHECK ((orderid > 0)),
    CONSTRAINT order_detail_quantity CHECK ((quantity > 0))
);




DROP TABLE TIME ;
CREATE TABLE time (
      TimeId serial primary key,
      OrderDate date NOT NULL,
      DayOfWeek character(10) NOT NULL,
      Month character(10) NOT NULL,
      Year integer NOT NULL
  );

INSERT INTO time ( OrderDate, DayOfWeek, Month ,Year )
SELECT   cust_order.orderdate ,
  to_char(   cust_order.orderdate  ,'Day') as DayOfWeeek  , to_char( cust_order.orderdate ,'Month' ) as Month,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;

SELECT * FROM TIME;



drop TABLE Sales  ;
CREATE TABLE Sales (
    CustomerId integer NOT NULL,
    TimeId integer NOT NULL,
    ISBN integer NOT NULL,
    Amnt decimal NOT NULL
);


drop materialized view Sales ;
CREATE materialized view Sales as
select customer.CustomerId as  CustomerId ,TIME.TimeId as TimeId   , book.isbn AS  ISBN ,  SUM(order_detail.quantity * book.price)  AS Amnt
from book NATURAL join order_detail NATURAL JOIN cust_order NATURAL JOIN customer NATURAL JOIN TIME
group by  customer.CustomerId  ,  TIME.TimeId  ,book.isbn
order by  customer.CustomerId , TIME.TimeId   ,  book.isbn  ;




Question 2



wusong3=> create materialized view avg_amnt_view as select customerid,
wusong3-> avg(amnt) as avg_amnt from sales group by customerid;
SELECT 104
wusong3=> select avg(avg_amnt) from avg_amnt_view;
         avg
----------------------
 207.4102788575413087
(1 row)

wusong3=> select avg(amnt) from sales;
         avg
----------------------
 194.0228807201800450
(1 row)



create materialized view avg_amnt_view as select customerid,
avg(amnt) as avg_amnt from sales group by customerid;


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
