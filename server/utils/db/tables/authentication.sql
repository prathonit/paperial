CREATE TABLE `authentication` (
	`l_id` VARCHAR(128) NOT NULL,
	`l_pwd` VARCHAR(512) NOT NULL,
	PRIMARY KEY (`l_id`)
) ENGINE=InnoDB;