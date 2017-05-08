--6.Find the driver in 'Upper Hutt' with the skill 'Matangi'.
consistency  quorum ;
select * from drivers where cur_pos='Upper Hutt' and skill CONTAINS  'Matangi' ALLOW FILTERING;
