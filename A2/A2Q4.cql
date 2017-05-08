DROP KEYSPACE IF EXISTS ass2 ;
CREATE KEYSPACE IF NOT EXISTS  ass2 WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};
USE ass2;

create table driver (driver_name text, email text, password text, mobile int,
current_position text, skill set<text>, primary key (driver_name))
with compaction = {'class': 'LeveledCompactionStrategy'} and dclocal_read_repair_chance = 1;

create index driver_skill_idx on driver (values(skill));
create index driver_current_position_idx on driver (current_position);

create table vehicle (vehicle_id text, status text, type text, primary key (vehicle_id))
with compaction = {'class': 'LeveledCompactionStrategy'};

create index veh_stat_idx on vehicle (status);

create table time_table (line_name text, service_no int, time int, distance double, latitude double, longitude double, stop text,
primary key ((line_name, service_no), time)) with clustering order by (time desc);

create table data_point (line_name text, service_no int, date int, sequence timestamp, longitude double, latitude double,
speed double, primary key ((line_name, service_no, date), sequence)) with clustering order by (sequence desc);



COPY driver FROM   '/home/wusong3/SWEN432/A2/driver_data.csv' ;
COPY vehicle FROM   '/home/wusong3/SWEN432/A2/vehicle_data.csv';
COPY time_table FROM   '/home/wusong3/SWEN432/A2/time_table_data.csv';
COPY data_point FROM  '/home/wusong3/SWEN432/A2/data_point_data.csv';


describe tables;
select * from driver limit 1 ;
select * from vehicle limit 1 ;
select * from time_table limit 1 ;
select * from data_point limit 1 ;
