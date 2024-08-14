show databases;

use codingon;

drop table if exists todo;

create table Todo(
id int not null primary key auto_increment,
title varchar(100) not null,
done boolean not null default false
);

desc todo;

select*from todo;

insert into todo values(null,'my todo1',0);
insert into todo values(null,'my todo2',0);
insert into todo values(null,'my todo3',0);
insert into todo values(null,'my todo4',0);
insert into todo values(null,'my todo5',0);

update todo set title = 'LIST 4번' where id =4;

delete from todo where id=3;

select *from mysql.user;

create user 'user'@'%' identified by '1234';

create user 'user'@'%' identified with mysql_native_password by '1234';
grant all privileges on *.* to 'user'@'%' with grant option;


flush privileges;







