

DROP TABLE IF EXISTS `bookType`;
CREATE TABLE `bookType` (
`id`  bigint(11) NOT NULL AUTO_INCREMENT ,
`name`  varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`desc`  varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`status` tinyint(1) NOT NULL DEFAULT '1',
`created_on`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`updated_on`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci
AUTO_INCREMENT=1

;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
`id`  bigint(11) NOT NULL AUTO_INCREMENT ,
`subject` int(10) NOT NULL,
`title`  varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ,
`created_on`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`updated_on`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci
AUTO_INCREMENT=1

;