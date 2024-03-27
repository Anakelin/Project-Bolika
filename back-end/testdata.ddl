-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Wed Mar 27 08:53:26 2024 
-- * LUN file: D:\Database\Esercizi\librarby.lun 
-- * Schema: test/1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database test;
use test;


-- Tables Section
-- _____________ 

create table BOOK (
     id char(1) not null,
     name char(1) not null,
     pages char(1) not null,
     constraint IDBOOK primary key (id));

create table USER (
     id char(1) not null,
     username char(1) not null,
     pass char(1) not null,
     constraint IDUSER primary key (id));

create table SHELF (
     id char(1) not null,
     category char(1) not null,
     location char(1) not null,
     constraint IDSHELF primary key (id));


-- Constraints Section
-- ___________________ 


-- Index Section
-- _____________ 

