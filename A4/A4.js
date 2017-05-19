
1.

> db.reserves.aggregate ([ {$match: {'reserves.sailor.name' :{$exists: true} }}, {$project: {_id:'$reserves.sailor.sailorId', name :'$reserves.sailor.name' , skills: '$reserves.sailor.skills' ,  address: '$reserves.sailor.address'}}]);
{ "_id" : 707, "name" : "James", "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }
{ "_id" : 111, "name" : "Peter", "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }
{ "_id" : 111, "name" : "Peter", "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 919, "name" : "Eileen", "skills" : [ "sail", "motor", "swim" ], "address" : "Lower Hutt" }
{ "_id" : 707, "name" : "James", "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }
{ "_id" : 707, "name" : "James", "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }
{ "_id" : 111, "name" : "Peter", "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 999, "name" : "Charmain", "skills" : [ "row" ], "address" : "Upper Hutt" }
{ "_id" : 999, "name" : "Charmain", "skills" : [ "row" ], "address" : "Upper Hutt" }
{ "_id" : 777, "name" : "Alva", "skills" : [ "row", "sail", "motor", "dance" ], "address" : "Masterton" }
{ "_id" : 919, "name" : "Eileen", "skills" : [ "sail", "motor", "swim" ], "address" : "Lower Hutt" }
{ "_id" : 110, "name" : "Paul", "skills" : [ "row", "swim" ], "address" : "Upper Hutt" }
{ "_id" : 777, "name" : "Alva", "skills" : [ "row", "sail", "motor", "dance" ], "address" : "Masterton" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }


2.

> db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
 {$group : {_id : '$reserves.sailor.sailorId',  "name": {"$first":'$reserves.sailor.name'} ,   "address": {"$first":'$reserves.sailor.address'} ,  "no_of_reserves" : {$sum : 1} }} ,
{$sort : {"no_of_reserves" : -1}} ,
{$limit : 1}]);

{ "_id" : 818, "name" : "Milan", "address" : "Wellington", "no_of_reserves" : 6 }




3.

> db.reserves.aggregate ([  {$match: {'reserves.date':  {$exists:true}}} ,
{$group : {_id : null,    "total_reserves" : {$sum : 1} }} ,
{$sort : {"total_reserves" : -1}},
{$project:{_id:0 , "total_reserves" :1} }

]);
{ "total_reserves" : 18 }


4.

> db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
...  {$group : {_id : '$reserves.sailor.sailorId',   "no_of_reserves" : {$sum : 1} }} ,
...   {$group : {_id : null  ,    avg_reserves: {$avg:"$no_of_reserves"} }} ,
... {$sort : {"no_of_reserves" : -1}} ,
... {$project:{_id:0 , avg_reserves :1}}
... ]);
{ "avg_reserves" : 2.7142857142857144 }





5.

var skills = [  "row" ] ;
db.reserves.aggregate ([  {$match: {'reserves.boat.driven_by':  {$in: skills}}}
]);



Bonus :
> var av  =  db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
...  {$group : {_id : '$reserves.sailor.sailorId',   "no_of_reserves" : {$sum : 1} }} ,
...   {$group : {_id : null  ,    avg_reserves: {$avg:"$no_of_reserves"} }} ,
...  {$sort : {"no_of_reserves" : -1}} ,
... {$project:{_id:0 , avg_reserves :1}}
...  ]).map( function(u) { return u.avg_reserves } );
>
>
> db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
...  {$group : {_id : '$reserves.sailor.sailorId', "no_of_reserves" : {$sum : 1}  }} ,
... {$match : { no_of_reserves: {$gt: parseFloat(av)} }} ,
... {$sort : {"no_of_reserves" : -1}}
... ]);
{ "_id" : 818, "no_of_reserves" : 6 }
{ "_id" : 111, "no_of_reserves" : 3 }
{ "_id" : 707, "no_of_reserves" : 3 }







6.

a)

arthur: [A4] % sha-mongo init 2 ; sha-mongo test ;  sha-mongo start ;  sha-mongo connect  ;
mkdir: created directory '/vol/x1/swen432/wusong3/data/shadb-cfg0'
Starting mongod --configsvr
about to fork child process, waiting until server is ready for connections.
forked process: 22173
child process started successfully, parent exiting
Starting mongos
2017-05-19T15:26:26.298+1200 warning: running with 1 config server should be done only for testing purposes and is not recommended for production
about to fork child process, waiting until server is ready for connections.
forked process: 22185
child process started successfully, parent exiting
Starting mongod --port 27020 shadb0
mkdir: created directory '/vol/x1/swen432/wusong3/data/shadb0'
about to fork child process, waiting until server is ready for connections.
forked process: 22209
child process started successfully, parent exiting
Starting mongod --port 27021 shadb1
mkdir: created directory '/vol/x1/swen432/wusong3/data/shadb1'
about to fork child process, waiting until server is ready for connections.
forked process: 22224
child process started successfully, parent exiting
Waiting 10 seconds for mongod servers to complete initializing
 sh.addShard("127.0.0.1:27020"); sh.addShard("127.0.0.1:27021"); sh.status();
MongoDB shell version: 2.6.7
connecting to: 127.0.0.1:27017/test
printShardingStatus: this db does not have sharding enabled. be sure you are connecting to a mongos from the shell and not to a mongod.
To enable Sharding for a Database
    # Connect to mongos
    mongo --port 27017
    # Enable Sharding on DB
    sh.enableSharding("<database>")

    #Enable Sharding for a Collection
    sh.shardCollection("<database>.<collection>", shard-key-pattern)
    # EG sh.shardCollection("test.user", { "_id": 1 } )

MongoDB shell version: 2.6.7
connecting to: 127.0.0.1:27017/test
mydb








one chunk = 64MB ;
> show dbs ;
BoatHire      0.031GB
BoatHire2     0.031GB
admin         (empty)
config        (empty)
local         0.031GB
mern-starter  0.031GB
mydb          0.125GB


[0.125*1024/2/64 ,0.125*1024/5/64, 0.125*1024/10/64]
[1, 0.4, 0.2]


> db.user.count ();
200000


200000/55555
3.600036000360004



sha-mongo cleanall ; sha-mongo stop ;
sha-mongo init 2 ; sha-mongo test ;  sha-mongo connect ;   sha-mongo start ;
