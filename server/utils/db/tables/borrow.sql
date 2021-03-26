CREATE TABLE `borrow` (
	`o_id` INT(9) NOT NULL,
	`b_id` INT(9) NOT NULL,
	`u_id` VARCHAR(128) NOT NULL,
	`r_id` INT(9),
	PRIMARY KEY (`o_id`)
) ENGINE=InnoDB;