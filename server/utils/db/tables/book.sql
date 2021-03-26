CREATE TABLE `book` (
	`b_id` INT(9) NOT NULL AUTO_INCREMENT,
	`b_name` VARCHAR(128) NOT NULL,
	`b_author` VARCHAR(128),
	`b_genre` VARCHAR(128) NOT NULL,
	`b_desc` VARCHAR(512),
	PRIMARY KEY (`b_id`)
) ENGINE=InnoDB;