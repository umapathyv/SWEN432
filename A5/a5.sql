Question 1 :

CREATE TABLE customer (
    customerid integer NOT NULL,
    l_name character(20) NOT NULL,
    f_name character(20),
    city character(15) NOT NULL,
    district character(15) NOT NULL,
    country character(15) NOT NULL,
    CONSTRAINT customer_customerid CHECK ((customerid > 0))
);


CREATE TABLE book (
    isbn integer NOT NULL,
    title character(60) NOT NULL,
    edition_no smallint DEFAULT 1,
    price numeric(6,2) NOT NULL,
    CONSTRAINT book_edition_no CHECK ((edition_no > 0)),
    CONSTRAINT book_price CHECK ((price > (0)::numeric))
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
  to_char(   cust_order.orderdate  ,'Day') as week  , to_char( cust_order.orderdate ,'Month' ) as Month,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;

SELECT * FROM TIME; -- ORDER BY TimeId;




CREATE TABLE Sales (
    CustomerId integer NOT NULL,
    TimeId integer NOT NULL,
    ISBN integer NOT NULL,
    Amnt decimal NOT NULL
);

drop materialized view sales ;
create materialized view Sales (CustomerId,TimeId,ISBN ,Amnt ) as select  CustomerId, TimeId  , book.ISBN ,  SUM(order_detail.quantity * book.price) FROM customer  NATURAL JOIN  time   NATURAL JOIN   book  NATURAL JOIN  order_detail group by   CustomerId, TimeId , book.isbn  , orderid ;


create materialized view avg_amnt_view as select CustomerId,
  avg(Amnt) as avg_amnt from Sales group by CustomerId;

Question 2
