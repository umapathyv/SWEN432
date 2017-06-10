#!/bin/bash

echo Dropping wusong34 db
dropdb wusong34
echo Creating wusong34 db
createdb wusong34

echo Adding Base schema to wusong34 db
psql -d wusong34 -f BookOrdersDatabaseDump_17.sql
psql wusong34
