-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for rekenopdracht
CREATE DATABASE IF NOT EXISTS `rekenopdracht` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `rekenopdracht`;

-- Dumping structure for table rekenopdracht.semdata
CREATE TABLE IF NOT EXISTS `semdata` (
  `datatoegevoegd` varchar(255) DEFAULT NULL,
  `datum` varchar(255) DEFAULT NULL,
  `titel` varchar(255) DEFAULT NULL,
  `inhoud` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekenopdracht.semdata: ~3 rows (approximately)
INSERT INTO `semdata` (`datatoegevoegd`, `datum`, `titel`, `inhoud`) VALUES
	('28 mei', '28 mei', 'School', 'er is les');

-- Dumping structure for table rekenopdracht.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permission` varchar(50) NOT NULL DEFAULT 'leerling',
  `klas` varchar(2000) NOT NULL DEFAULT '{"leerlingen":[],"docenten":[]}',
  `geld` int(255) NOT NULL,
  `achternaam` varchar(255) NOT NULL,
  `woonplaats` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table rekenopdracht.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `permission`, `klas`, `geld`, `achternaam`, `woonplaats`) VALUES
	(1, 'admin', 'admin@student.gildeopleidingen.nl', 'lovely', 'leerling', '{"leerlingen":[],"docenten":[]}', 0, 'admin', 'Fortnite'),
	(2, 'sam', 'sam@sam.nl', '12345', 'leerling', '{"leerlingen":[],"docenten":[]}', 0, 'droste', 'Venlo'),
	(3, 'sem', 'sem@sem.nl', '123456', 'leerling', '{"leerlingen":[],"docenten":[]}', 0, 'peeters', 'reuver'),
	(4, 'Admin', 'admin@admin.nl', 'admin', 'god', '{"leerlingen":[],"docenten":[]}', 0, 'god', 'adminland');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
