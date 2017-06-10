#!/bin/bash

echo Dropping wusong3 db
dropdb wusong3
echo Creating wusong3 db
createdb wusong3

echo Adding Base schema to wusong3 db
psql -d wusong3 -f BookOrdersDatabaseDump_17.sql
psql wusong3 
