CREATE TABLE track(
	`a_id` VARCHAR(128) NOT NULL,
	`o_id` INT(9) NOT NULL,
	`b_id` INT(9) NOT NULL,
	`u_id` VARCHAR(128) NOT NULL,
	PRIMARY KEY (`o_id`)
) ENGINE=InnoDB;