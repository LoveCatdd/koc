# King of Chess 数据库

## 创建数据库

```mysql
create database koc;
```

## 创建表

##### 用户表

```mysql
create table user (
	id int,
  	username varchar(255) AUTO_INCREMENT PRIMARY KEY,
  	password varchar(255) NOT NULL,
  	photo varchar(1024) NOT NULL
);
```

