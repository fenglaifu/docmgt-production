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
	title VARCHAR(45) CHARACTER SET utf8 DEFAULT NULL,
	content BLOB DEFAULT NULL,
	create_date TIMESTAMP,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

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