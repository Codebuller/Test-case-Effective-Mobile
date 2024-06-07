create database second_case;
\c second_case;
create type sex as enum ('male', 'female');
create table users (
    id serial primary key,
    first_name varchar(255),
    last_name varchar(255),
    age int,
    sex sex,
    problems boolean
);