data modelling

embeding

referencing

data partitioning by sharding
no data versioning


database > collection > document  a set of kv

document are BSON

field id :  objectid,  natural uniquer , auto increated


key decision in data modeli;ing is how to represent relaitonshi between data objects



embedding> denormaltion

embedding  1 one to one
one to many

manual referencing > DB refer  by saving the _id     lead to normalized

atomicity

write at atomic at document level

to avoid relocation, referencing instead of emmbedding shou

expensive for wriate/ read ratio high . write need to update index


more read, use index ,

db.collection.findings

selection object


$ return the first element

all write are atomic on the level of signle docuemtn



slice keeps the first n element

'course.code'

(

{a:1},
{$unset : {a:g}}

)



accumlutors compuate the values by combing document that share the same gooup key


\field path in $ group and $ project



shard is replica set


replicas is donee at level of a shard


the replicas set can not accept any write request if there is no primary

db.reserves.update(
  {'marina.name': {$regex: /^Port N/}},
{$set: {'marina.name': "Port Nicholson"}},
 {multi: true}
)


db.reserves.update(
  {'reserves.boat.numbver': {$exists: true}},
{$rename: {"reserves.boat.numbver": "reserves.boat.number"}}

)

db.reserves.count({'marina.name': "Port Nicholson", 'reserves.res_date': {$exists: true}})

db.reserves.distinct('reserves.sailor.name', {'reserves.sailor.skills': "swim"})







db.reserves.distinct(
  'reserves.sailor.name',
{"reserves.sailor.skills": {$all: ["row", "motor", "sail"], $size: 3 } }

)





db.res_ref.find({'reserves.res_date': "2017-03-16"},

{_id: 0, marina: 1, 'reserves.boat': 1, 'reserves.sailor': 1}

)









var cur = db.re.find ()

while (curs.hasNext())
{
     res = cur.next ();
     boat =  db.boat.findone ( boatid  : res.boat)

     result = {boat: boat.name }



}








db.reserves.aggregate([
{$match: {'reserves.sailor': {$exists: true, $ne: null}}},
{
  $group: {_id: "$reserves.sailor.sailorId", name: {$first:"$reserves.sailor.name"}, skills: {$first: "$reserves.sailor.skills"}, address:{$first: "$reserves.sailor.address"}}
}

])











db.reserves.aggregate([
{$match: {'reserves.date': {$exists: true, $ne: null}}},
{$group:
  {_id: {sailorId: "$reserves.sailor.sailorId", name: "$reserves.sailor.name", address:  "$reserves.sailor.address"},
   no_of_reserves: {$sum: 1} }
},
{$sort: {no_of_reserves: -1}},
{$limit: 1}
])


db.reserves.aggregate([
  {$match: {'reserves.date': {$exists: true, $ne: null}}},
{$group: {_id: {sailorId: "$reserves.sailor.sailorId",name: "$reserves.sailor.name", address:"$reserves.sailor.address"},no_of_reserves: {$sum: 1} }},

{$sort: {no_of_reserves: -1}}, {$limit: 1}])



db.reserves.aggregate(
  [{$match: {'reserves.res_date': {$exists: true}}},

  {$group: {_id: 0, total_reserves: {$sum:1} }},
  {$project: {_id: 0, total_reserves: 1}}]

)



db.reserves.aggregate([
  {$match: {'reserves.res_date': {$exists: true}}},
{$group: {_id: "$reserves.sailor.sailorId", no_of_reserves: {$sum: 1} }},
{$group: {_id: 0, avg_reserves: {$avg: "$no_of_reserves"}}}

])
