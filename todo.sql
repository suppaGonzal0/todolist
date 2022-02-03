use todolist;

drop table list;
drop table task;

create table list(
	listid int not null auto_increment,
    listname varchar(255) unique,
    primary key(listid)
);

create table task(
	taskid int not null auto_increment,
    taskname varchar(255) not null,
    listid int,
    primary key(taskid),
    foreign key(listid) references list(listid)
    on delete cascade
);

select * from task;
select * from list order by listid;

