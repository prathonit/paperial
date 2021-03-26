CREATE TABLE `review` (
	`r_id` INT(9) NOT NULL AUTO_INCREMENT,
	`review` VARCHAR(512),
	`rating` INT(1) NOT NULL,
	`timestamp` VARCHAR(128) NOT NULL,
	PRIMARY KEY (`r_id`)
) ENGINE=InnoDB;