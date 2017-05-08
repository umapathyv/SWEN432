USE WellingtonTranzMetro;
SELECT comment from CQLselectComment where CQLid =1;
SELECT pwd, drv_name from drivers where drv_name = 'pondy' ;

SELECT comment from CQLselectComment where CQLid =2;
select * from days_registered_counts where drv_name = 'pondy' ;

SELECT comment from CQLselectComment where CQLid =3;
consistency  one  ;
SELECT * FROM timeTableForPassengers ;

SELECT comment from CQLselectComment where CQLid =4;
consistency  one  ;
SELECT * FROM dispatchAllocation ;

SELECT comment from CQLselectComment where CQLid =5;
consistency  quorum ;
select * from vehicles where status='Upper Hutt' allow filtering ;

SELECT comment from CQLselectComment where CQLid =6;
consistency  quorum ;
select * from drivers where cur_pos='Upper Hutt' and skill CONTAINS  'Matangi' ALLOW FILTERING;

SELECT comment from CQLselectComment where CQLid =7;
consistency  one  ;
select * from dataPoint limit 1;

SELECT comment from CQLselectComment where CQLid =8;
consistency  one  ;
select * from dataPoint;

SELECT comment from CQLselectComment where CQLid =9;
consistency  one  ;
select * from timeTable where latitude > -41.2262  and services_no = 1 and lineName ='Hutt Vale Line'   order by time asc limit 1 ALLOW FILTERING ;

SELECT comment from CQLselectComment where CQLid =10;
consistency  one  ;
select * from timeTable where latitude < -41.2262 and services_no = 1 and lineName ='Hutt Vale Line'  limit 1  allow filtering ;
