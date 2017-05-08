--9.Get the north direction neighbours for a given data point  "-41.2262 IN services_no 1 and lineName 'Hutt Vale Line' "
consistency  one  ;
select * from timeTable where latitude > -41.2262  and services_no = 1 and lineName ='Hutt Vale Line'   order by time asc limit 1 ALLOW FILTERING ;
