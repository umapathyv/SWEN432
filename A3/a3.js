arthur: [A3] % mongoimport --db BoatHire --collection reserves --file reserves_17.json ;
connected to: 127.0.0.1
2017-05-08T11:00:37.610+1200 check 9 14
2017-05-08T11:00:37.610+1200 imported 14 objects
arthur: [A3] % mongo;
MongoDB shell version: 2.6.7
connecting to: test
> show dbs;
BoatHire  0.031GB
admin     (empty)
local     0.031GB
> use BoatHire ;
switched to db BoatHire

1.a)

> db.reserves.find ({'marina.name':{$regex:/^Port/}});
{ "_id" : ObjectId("54f10525f60cb24112233f18"), "marina" : { "name" : "Port NIckolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Mermaid", "number" : 919, "color" : "white", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "Milan", "sailorId" : 818, "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }, "date" : "2017-03-16" } }
{ "_id" : ObjectId("54f1058af60cb24112233f1a"), "marina" : { "name" : "Port NIckolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Mermaid", "number" : 919, "color" : "white", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "James", "sailorId" : 707, "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }, "date" : "2017-03-17" } }
{ "_id" : ObjectId("54f10654f60cb24112233f1b"), "marina" : { "name" : "Port NIckolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Red Cod", "number" : 616, "color" : "yellow", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "James", "sailorId" : 707, "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }, "date" : "2017-03-21" } }
{ "_id" : ObjectId("54f10d18f60cb24112233f1c"), "marina" : { "name" : "Port Nickolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Pretty Lady", "number" : 515, "color" : "pink", "driven_by" : [ "sail" ] }, "sailor" : { "name" : "Peter", "sailorId" : 111, "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }, "date" : "2017-03-17" } }
{ "_id" : ObjectId("54f10e7bf60cb24112233f1f"), "marina" : { "name" : "Port Nickolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Charmain", "sailorId" : 999, "skills" : [ "row" ], "address" : "Upper Hutt" }, "date" : "2017-03-20" } }
{ "_id" : ObjectId("54f10ebbf60cb24112233f20"), "marina" : { "name" : "Port Nickolson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Charmain", "sailorId" : 999, "skills" : [ "row" ], "address" : "Upper Hutt" }, "date" : "2017-03-21" } }
{ "_id" : ObjectId("57161c16b6169855c3bd18cd"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Gwendolynn", "sailorId" : 777, "skills" : [ "row", "sail", "motor", "dance" ], "address" : "Masterton" }, "date" : "2017-03-28" } }



> db.reserves.update ({'marina.name':{$regex:/^Port/}}, {$set:{'marina.name':"Port Nicholson"},$currentDate: {lastModified: true}},{multi: true});
WriteResult({ "nMatched" : 7, "nUpserted" : 0, "nModified" : 7 })
> db.reserves.find ({'marina.name':{$regex:/^Port/}});
{ "_id" : ObjectId("54f10525f60cb24112233f18"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Mermaid", "number" : 919, "color" : "white", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "Milan", "sailorId" : 818, "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }, "date" : "2017-03-16" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("54f1058af60cb24112233f1a"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Mermaid", "number" : 919, "color" : "white", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "James", "sailorId" : 707, "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }, "date" : "2017-03-17" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("54f10654f60cb24112233f1b"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Red Cod", "number" : 616, "color" : "yellow", "driven_by" : [ "sail", "motor" ] }, "sailor" : { "name" : "James", "sailorId" : 707, "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }, "date" : "2017-03-21" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("54f10d18f60cb24112233f1c"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Pretty Lady", "number" : 515, "color" : "pink", "driven_by" : [ "sail" ] }, "sailor" : { "name" : "Peter", "sailorId" : 111, "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }, "date" : "2017-03-17" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("54f10e7bf60cb24112233f1f"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Charmain", "sailorId" : 999, "skills" : [ "row" ], "address" : "Upper Hutt" }, "date" : "2017-03-20" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("54f10ebbf60cb24112233f20"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Charmain", "sailorId" : 999, "skills" : [ "row" ], "address" : "Upper Hutt" }, "date" : "2017-03-21" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }
{ "_id" : ObjectId("57161c16b6169855c3bd18cd"), "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, "reserves" : { "boat" : { "name" : "Night Breeze", "number" : 818, "color" : "black", "driven_by" : [ "row" ] }, "sailor" : { "name" : "Gwendolynn", "sailorId" : 777, "skills" : [ "row", "sail", "motor", "dance" ], "address" : "Masterton" }, "date" : "2017-03-28" }, "lastModified" : ISODate("2017-05-07T23:43:47.587Z") }

b)

> db.reserves.find({_id:ObjectId("54f102de0b54b61a031776ed")});
{ "_id" : ObjectId("54f102de0b54b61a031776ed"), "marina" : { "name" : "Sea View", "location" : "Petone" }, "reserves" : { "boat" : { "name" : "Flying Dutch", "numbver" : 313, "color" : "blue", "driven_by" : [ "sail" ] }, "sailor" : { "name" : "James", "sailorId" : 707, "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }, "date" : "2017-03-15" } }


db.myclasses.update({_id:ObjectId("54f102de0b54b61a031776ed")},{$rename: {'reserves.boat.numbver':'reserves.boat.number'}})  ;
