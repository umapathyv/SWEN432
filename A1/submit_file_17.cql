/*Question 4. [20 marks] Create data model using CQL 3 statements that support
the requirements. To answer questions, use Cassandra CCM. In your answers,
copy your CCM and CQL commands.
a. [5 marks] Create a cluster and a keyspace that will satisfy infrastructure and
availability requirements above.
*/
--source '/home/wusong3/SWEN432/A1/submit_file_17.cql';
--> source '/home/wusong3/SWEN432/A1/q6.cql';

DROP KEYSPACE IF EXISTS WellingtonTranzMetro ;
CREATE KEYSPACE IF NOT EXISTS  WellingtonTranzMetro WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};
USE WellingtonTranzMetro;


/*
b. [15 marks] Define tables listed in your answer to question 3 above. For the
table definitions include any non default property settings. Optimize your
database solution just for iPhone application queries you identified in
question 2 above.
*/

CREATE TABLE IF NOT EXISTS CQLselectComment(
   CQLid int PRIMARY KEY,
    comment text
 );
 INSERT INTO CQLselectComment (CQLid, comment) VALUES(1 ,'--1. Get the current password of driver pondy. ;');

INSERT INTO CQLselectComment (CQLid, comment) VALUES(2 , '--2. Get the number of days per month for registered driver pondy.' );

INSERT INTO CQLselectComment (CQLid, comment) VALUES(3 ,  '--3. Publish a time table for passengers.');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(4 ,  '--4. Extract a list of departure stations with time in descending order');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(5 ,  '--5.Find the vehicle in Upper Hutt.');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(6 ,  '--6.Find the driver in Upper Hutt with the skill Matangi.');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(7 ,  '--7.Select the last data point for a service on a day.');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(8 ,  '--8.Select all Data points for a service on a day in a time interval 10 seconds for vehicle FA4567 with driver pondy');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(9 ,  '--9.Get the north direction neighbours for a given data point  -41.2262 IN services_no 1 and lineName Hutt Vale Line');
INSERT INTO CQLselectComment (CQLid, comment) VALUES(10 ,  '--10.Get the south direction neighbours for a given data point  -41.2262 IN services_no 1 and lineName Hutt Vale Line ');





CREATE TABLE IF NOT EXISTS drivers(
   drv_name text PRIMARY KEY,
   cur_pos text,
   mobile  int,
   pwd text,
   skill set<text>
 );


CREATE TABLE IF NOT EXISTS timeTableForPassengers(
   station_name  text,
   time SET<int>,
   lineName text,
  PRIMARY KEY (station_name)
  );


CREATE TABLE IF NOT EXISTS  dispatchAllocation(
   station  text,
   vehicle  text,
   driver  text,
   services_no int ,
   time int,
   lineName text,
  PRIMARY KEY ((station, lineName), time)
  )WITH CLUSTERING ORDER BY (time desc)  ;
ALTER TABLE dispatchAllocation WITH compaction = { 'class' :  'LeveledCompactionStrategy'  };


CREATE TABLE IF NOT EXISTS vehicles(
   vehicle_id text,
   status text,
   vehicle_type  text,
   distance_travelled  double ,
    PRIMARY KEY(vehicle_id)
   );


CREATE TABLE IF NOT EXISTS dataPoint(
   drv_name text,
   vehicle_id text,
   services_no int ,
   lineName text ,
   day int ,
   sequence timestamp ,
   latitude double,
   longitude double ,
   speed double ,
    PRIMARY KEY (vehicle_id , sequence )
      )WITH CLUSTERING ORDER BY (sequence DESC);

CREATE TABLE IF NOT EXISTS timeTable(
   station_name   text ,
   longitude double,
   latitude double,
   services_no int ,
   distance double ,
   time int,
   lineName text,
  PRIMARY KEY (( lineName , services_no ) , time)
  )WITH CLUSTERING ORDER BY (time DESC);

CREATE TABLE IF NOT EXISTS days_registered_counts
(drv_name text, date int,
total_count counter static,
daily_count counter,
  PRIMARY KEY (drv_name,date)
);

-- Optimize database solution just for iPhone application queries
CREATE INDEX latitudeIndex ON dataPoint (latitude);


/*
Question 5. [20 marks] Provide CQL3 statements to support each of the
application write and update requests you specified in Question 1 above. Show
the consistency level before each write and update statement.
*/
--1. Write records to drivers table.
consistency  quorum ;
INSERT INTO drivers (drv_name, cur_pos, mobile, pwd, skill) VALUES('milan','Upper Hutt', 211111, 'mm77', {'Guliver'});
consistency  quorum ;
INSERT INTO drivers (drv_name, cur_pos, mobile, pwd, skill) VALUES('pavle','Upper Hutt', 213344, 'pm33', {'Ganz Mavag','Guliver'});
consistency  quorum ;
INSERT INTO drivers (drv_name, cur_pos, mobile, pwd, skill) VALUES('pondy','Wellington', 216677, 'pondy', {'Matangi', 'Kiwi Rail'});

--2. write records to timeTableForPassengers table.
consistency  quorum ;
INSERT INTO timeTableForPassengers (station_name, time ,lineName) VALUES('Wellington',  {0617, 0629} , 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTableForPassengers (station_name, time ,lineName) VALUES('Petone',  {0620,0630}, 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTableForPassengers (station_name, time ,lineName) VALUES('Woburn',  {0700,0720}, 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTableForPassengers (station_name, time ,lineName) VALUES('Upper Hutt',  {0805,0837}, 'Hutt Vale Line');

--3. write records to dispatchAllocation table.
consistency  quorum ;
INSERT INTO dispatchAllocation (station, vehicle, driver, services_no ,time ,lineName ) VALUES('Wellington', 'FA1122' ,  'milan' , 1, 0605 , 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO dispatchAllocation (station, vehicle, driver, services_no ,time ,lineName) VALUES('Wellington', 'FA4864' , 'pondy' ,2, 0617 , 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO dispatchAllocation (station, vehicle, driver, services_no ,time ,lineName) VALUES('Upper Hutt',  'FA4567' , 'pavle'  ,4,0700, 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO dispatchAllocation (station, vehicle, driver, services_no ,time ,lineName) VALUES('Upper Hutt',  'FP8899' , 'milan'  ,5,0705, 'Hutt Vale Line');

--4. write records to vehicles table.
consistency  quorum ;
INSERT INTO vehicles (vehicle_id, status, vehicle_type ) VALUES('FA1122', 'Upper Hutt', 'Matangi');
consistency  quorum ;
INSERT INTO vehicles (vehicle_id, status, vehicle_type) VALUES('FP8899', 'maintenance', 'Ganz Mavag');
consistency  quorum ;
INSERT INTO vehicles (vehicle_id, status, vehicle_type) VALUES('FA4864', 'Wellington', 'Matangi');
consistency  quorum ;
INSERT INTO vehicles (vehicle_id, status, vehicle_type) VALUES('FA4567', 'Wellington', 'Matangi');

--5. write records to dataPoint table.
consistency  quorum ;
INSERT INTO dataPoint (drv_name,vehicle_id, services_no, lineName, day, sequence,latitude,longitude,speed) VALUES('pondy','FA4567', 1,   'Hutt Vale Line',20170325,1490475600000,-41.2262,174.77  ,29.1);
consistency  quorum ;
INSERT INTO dataPoint (drv_name,vehicle_id, services_no,lineName,day,sequence,latitude,longitude,speed) VALUES('pondy','FA4567',1, 'Hutt Vale Line',  20170325,  1490475610000,-41.2263 ,175,  70.1);
consistency  quorum ;
INSERT INTO dataPoint (drv_name,vehicle_id, services_no,lineName,day,sequence,latitude,longitude,speed) VALUES('pondy','FA4567', 1, 'Hutt Vale Line',  20170325, 1490475620000,-41.2264, 175.07,  80.5);

--6. Write records to timeTable table.
consistency  quorum ;
INSERT INTO timeTable (station_name, longitude, latitude,services_no, distance, time ,lineName) VALUES('Wellington',174.7762, -41.2865, 1 ,0, 0605  , 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTable (station_name, longitude, latitude,services_no, distance,time ,lineName) VALUES('Petone',    174.8851, -41.227 , 1 , 8.3 ,0617, 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTable (station_name, longitude, latitude,services_no, distance, time ,lineName) VALUES('Woburn',  174.9081, -41.211, 1, 11.0,0620,     'Hutt Vale Line' );
consistency  quorum ;
INSERT INTO timeTable (station_name, longitude, latitude,services_no, distance, time ,lineName) VALUES('Waterloo',174.7762, -41.2092, 1 ,13.3, 0625  , 'Hutt Vale Line');
consistency  quorum ;
INSERT INTO timeTable (station_name, longitude, latitude,services_no, distance, time ,lineName) VALUES('Waikanae',174.7762, -40.8755, 5 ,62.8, 1025  , 'Waikanae Line');


--7.Update the password for driver 'pondy'.
consistency  quorum ;
UPDATE drivers SET pwd = 'newPwd' WHERE drv_name='pondy';

--8. Driver 'pondy' comes to Wellington station thus update his current_position to 'Wellington'.
consistency  quorum ;
UPDATE drivers SET cur_pos = 'Wellington' WHERE drv_name='pondy'   ;

--9.Driver 'pondy' is assigned to a service thus to update his current_position to ‘FA4567’.
consistency  quorum ;
UPDATE drivers SET cur_pos = 'FA4567' WHERE drv_name='pondy'  ;

--10.Driver 'pondy' deregisters from his work thus to update current_position to ‘not_available’.
consistency  quorum ;
UPDATE drivers SET cur_pos = 'not_available' WHERE drv_name='pondy'  ;

--11. Update the number of days per month for registered driver 'pondy'.
consistency  quorum ;
UPDATE days_registered_counts SET daily_count = daily_count + 1, total_count = total_count+ 1 WHERE drv_name = 'pondy' AND date = 20160321;

--12.Update the skill of driver 'pondy' from {'Matangi', 'Kiwi Rail'} to  {'Matangi', 'Kiwi Rail','Guliver'}
consistency  quorum ;
UPDATE drivers SET skill = skill + {'Guliver'} WHERE drv_name='pondy'  ;

--13. Update the status of a vehicle.
consistency  quorum ;
update  vehicles  set  status =  'in_use'  where  vehicle_id  ='FA4567'   ;

--14. Update the current_position to destination 'Upper Hutt' of driver 'pondy'.
consistency  quorum ;
UPDATE drivers SET cur_pos = 'Upper Hutt' WHERE drv_name='pondy'  ;

--15. Update the status to destination 'Upper Hutt' of vehicle 'FA4567'.
consistency  quorum ;
UPDATE vehicles SET status = 'Upper Hutt' WHERE vehicle_id='FA4567'  ;

--16.Update the total distance travelled for  vehicle ‘FA4567’ .
consistency  quorum ;
UPDATE  vehicles  set  distance_travelled =  10  where  vehicle_id  ='FA4567'  ;

--17.Update the total distance travelled for  vehicle 'FA1122' .
consistency  quorum ;
UPDATE  vehicles  set  distance_travelled =  20  where  vehicle_id  ='FA1122'  ;
