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


SELECT EXTRACT(WEEK FROM TIMESTAMP (SELECT orderdate FROM  cust_order where)  );


 SELECT   EXTRACT( WEEK FROM TIMESTAMP   cust_order.orderdate  ) AS WEEK  FROM  cust_order order by orderdate  asc ;

CREATE FUNCTION MyInsert(_sno integer, _eid integer, _sd date, _ed date, _sid integer, _status boolean)
  RETURNS void AS
  $BODY$
      BEGIN
        INSERT INTO app_for_leave(sno, eid, sd, ed, sid, status)
        VALUES(_sno, _eid, _sd, _ed, _sid, _status);
      END;
  $BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;



DROP TABLE TIME ;
CREATE TABLE time (
      TimeId integer NOT NULL,
      OrderDate date NOT NULL,
      DayOfWeek character(10) NOT NULL,
      Month character(10) NOT NULL,
      Year integer NOT NULL
  );

DROP SEQUENCE timeIDseq ;  CREATE SEQUENCE timeIDseq START  1;

INSERT INTO time (TimeId, OrderDate, DayOfWeek,Month ,Year )
SELECT  nextval('timeIDseq') ,  cust_order.orderdate ,
EXTRACT(DOW FROM  cust_order.orderdate ) as week  ,  EXTRACT(MONTH FROM  cust_order.orderdate ) as MONTH,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;

SELECT * FROM TIME; -- ORDER BY TimeId;


SELECT *   FROM   cust_order order by orderdate  asc ;


SELECT  cust_order.orderdate ,
EXTRACT(DOW FROM  cust_order.orderdate ) as week  ,  EXTRACT(MONTH FROM  cust_order.orderdate ) as MONTH,
EXTRACT(Year FROM  cust_order.orderdate ) as Year
FROM  cust_order order by orderdate  asc ;


SELECT nextval('timeIDseq');


CREATE TABLE Sales (
    CustomerId integer NOT NULL,
    TimeId integer NOT NULL,
    ISBN integer NOT NULL,
    Amnt decimal NOT NULL
);

create materialized view SalesFact as select c.customerid , b.isbn , t.TimeId FROM customer as c, book as b, time as  t  ;


   avg(amnt) as avg_amnt from sales group by customerid;

create materialized view avg_amnt_view as select customerid, avg(amnt) as avg_amnt from sales group by customerid;



Question 2
select avg(avg_amnt) from avg_amnt_view;



SELECT s.price, c.cust_key
FROM   customer c
       time t
       book b

WHERE  c.customerid = s.cust_id
