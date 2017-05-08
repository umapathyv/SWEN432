USE WellingtonTranzMetro;
--1. Get the current password of driver 'pondy'. ;
consistency  quorum ;
SELECT pwd, drv_name from drivers where drv_name = 'pondy' ;
