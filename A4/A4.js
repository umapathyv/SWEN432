
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


var av  =  db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
 {$group : {_id : '$reserves.sailor.sailorId',   "no_of_reserves" : {$sum : 1} }} ,
  {$group : {_id : null  ,    avg_reserves: {$avg:"$no_of_reserves"} }} ,
 {$sort : {"no_of_reserves" : -1}} ,
{$project:{_id:0 , avg_reserves :1}}
 ]).map( function(u) { return u.avg_reserves } );


db.reserves.aggregate ([  {$match: {'reserves.sailor.sailorId':  {$exists:true}}} ,
 {$group : {_id : '$reserves.sailor.sailorId', "no_of_reserves" : {$sum : 1}  }} ,
{$match : { no_of_reserves: {$gt: parseFloat(av)} }} ,
{$sort : {"no_of_reserves" : -1}}
]);




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
