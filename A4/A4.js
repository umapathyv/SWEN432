
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
