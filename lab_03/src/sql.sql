drop table if exists "Rooms";
drop table if exists "Things";
drop table if exists "Students";
drop table if exists "Users";
create table "Rooms" (
	"Id_room" int,
	"Number" integer,
	"Roomtype" integer
);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (1, 101, 2);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (2, 301, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (3, 302, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (4, 303, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (5, 304, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (6, 305, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (7, 401, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (8, 402, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (9, 403, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (10, 404, 1);
insert into "Rooms"("Id_room", "Number", "Roomtype") values (11, 405, 1);

create table "Things"
(
	"Id_thing" int,
	"Code" varchar,
	"Type" varchar,
	"Id_room" integer,
	"Id_student" integer
);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (1, '1233321', 'Table', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (2, '1234321', 'Table', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (3, '1235321', 'Table', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (4, '2233321', 'Chair', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (5, '2234321', 'Chair', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (6, '2235321', 'Chair', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (7, '3233321', 'Bed', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (8, '3234321', 'Bed', 1, -1);
insert into "Things"("Id_thing", "Code", "Type", "Id_room", "Id_student") values (9, '3235321', 'Bed', 1, -1);

create table "Students"
(
	"Id_student" int,
	"Name" varchar,
	"GroupStudent" varchar,
	"StudentCode" varchar,
	"Id_room" integer,
	"Date" varchar,
	"Id_user" integer
);
insert into "Students"("Id_student", "Name", "GroupStudent", "StudentCode", "Id_room", "Date", "Id_user")
values (1, 'Alex', 'IU7-64', '1234321', 2, 'Jan 01 2023', 1), 
(2, 'Bob', 'IU7-63', '1233321', 3, 'Dec 01 2022', 4);

create table "Users"
(
	"ID" int,
	"Login" varchar,
	"Password" varchar,
	"Level" int
);
insert into "Users"("ID", "Login", "Password", "Level")
values (1, 'alex', 'alex', 1), 
(2, 'manager', 'manager', 3),
(3, 'kamedan', 'kamedan', 2),
(4, 'bob', 'bob', 1);