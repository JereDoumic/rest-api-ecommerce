Tables to MySQL:

create table product(
	  id_product int auto_increment,
    id_category int,
	  title varchar(50),
    description varchar(50),
    price double,
    image varchar(150),
    constraint pk_id_product primary key (id_product),
    constraint fk_id_category foreign key (id_category) references category(id_category)
);

create table category(
	  id_category int auto_increment,
    category varchar(50) unique,
    constraint pk_id_category primary key (id_category)
);

create table user(
	  id_user int auto_increment,
    email varchar(50),
    password varchar(50),
    userName varchar(50) unique,
    constraint pk_id_user primary key (id_user)
);
