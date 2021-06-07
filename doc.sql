create database docmanagement;
set character_set_server=utf8;
use docmanagement;

CREATE TABLE IF NOT EXISTS doc_file_t(
	id INT(11) NOT NULL AUTO_INCREMENT,
	parent_id INT(11) NOT NULL,
	file_name VARCHAR(2000) CHARACTER SET utf8,
	new_file_name VARCHAR(2000) CHARACTER SET utf8,
	file_path VARCHAR(2000) CHARACTER SET utf8,
	create_date TIMESTAMP,
	is_dir INT(1) DEFAULT 0,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS work_notice_t(
	id INT(11) NOT NULL AUTO_INCREMENT,
	title VARCHAR(2000) CHARACTER SET utf8 DEFAULT NULL,
	content BLOB DEFAULT NULL,
	create_date TIMESTAMP,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

delimiter %%% 
create function getChildList(rootId int)
returns varchar(1000) READS SQL DATA

BEGIN
  declare sTemp varchar(1000);
  declare sTempChd varchar(1000);
  SET sTemp = '$';
  SET sTempChd =cast(rootId as CHAR);

  WHILE sTempChd is not null DO
    SET sTemp = concat(sTemp,',',sTempChd);    
    SELECT group_concat(id) INTO sTempChd FROM doc_file_t where FIND_IN_SET(parent_id,sTempChd)>0;
  END WHILE;
  RETURN sTemp;
END %%%
delimiter ;


insert into doc_file_t(
	parent_id,
	file_name,
	file_path,
	create_date,
	is_dir)
values(
	0,
	'dirFile',
	'dirFile',
	now(),
	1
);