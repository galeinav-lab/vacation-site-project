-- MySQL dump 10.13  Distrib 8.4.9, for Linux (x86_64)
--
-- Host: localhost    Database: vacation_site_project
-- ------------------------------------------------------
-- Server version	8.4.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Gal','Einav','gal@gmail.com','$2b$10$g75FdEdFmNSODKZQXPw1N..UWIFWYxeR/d9vcj.LUEHD7zmYJyavW',1),(4,'moshe','bar','moshe@gmail.com','$2b$10$PmnlhXBZWDYQHVIajTVHMeSFRXaO6eSLNRE6JxVdTCZkGMR6hLii.',2),(5,'dan','dan','dan@gmail.com','$2b$10$CqQJyjyRoHJZEqa3Lgbw8uWcUt5OuzpMXUE1CSnL..sWx2AKhiyTy',2),(6,'kimi','anto','kimi@gmail.com','$2b$10$ztKnrJKq.UeBgyz/uwTH8u1QPsh2NK4Q44W3JCzQhCJaInFOYGNw.',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userVacation`
--

DROP TABLE IF EXISTS `userVacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userVacation` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  UNIQUE KEY `uq_user_vacation` (`userId`,`vacationId`),
  KEY `userId_idx` (`userId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userVacation`
--

LOCK TABLES `userVacation` WRITE;
/*!40000 ALTER TABLE `userVacation` DISABLE KEYS */;
INSERT INTO `userVacation` VALUES (1,3),(1,4),(1,5),(1,7),(2,3),(2,5),(3,3),(3,7),(3,9),(4,15),(4,24),(4,30),(5,24),(5,30),(6,24),(6,30);
/*!40000 ALTER TABLE `userVacation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` text,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `price` int DEFAULT NULL,
  `imageName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (3,'Israel','this is where i live and learn full stack and do projects','2026-05-27 20:50:00','2026-05-30 20:50:00',481,'app_1779311885478.jpeg'),(4,'Paris, France','The city of light dazzles with the Eiffel Tower, the Louvre, and charming Montmartre cafes. Stroll the Seine and indulge in world-class cuisine. Nearby: Versailles (45min), Loire Valley (2hrs). Hotels: Le Meurice (5*), Hotel Lutetia (5*), CitizenM (budget).','2026-05-30 21:20:00','2026-06-02 21:20:00',1200,'app_1779906037789.jpeg'),(5,'Tokyo, Japan','Ancient shrines meet futuristic skyscrapers in Japans electric capital. Explore Shibuya, Akihabara, and Meiji Shrine. Nearby: Mt. Fuji (2hrs), Kamakura (1hr), Hakone hot springs (1.5hrs). Hotels: Park Hyatt Tokyo (5*), Aman Tokyo (5*), Dormy Inn (budget).','2026-05-27 21:23:00','2026-06-05 21:23:00',2400,'app_1779906215682.jpeg'),(7,'Rome, Italy','An open-air museum of millennia of history. Visit the Colosseum, Vatican, and Trevi Fountain, then unwind with gelato and Chianti. Nearby: Pompeii (2.5hrs), Florence (1.5hrs), Amalfi (3hrs). Hotels: Hotel de Russie (5*), Hotel Artemide (4*), Generator Rome (budget).','2026-06-08 21:27:00','2026-06-13 21:27:00',1350,'app_1779906473811.jpeg'),(8,'Bali, Indonesia','Spiritual paradise of rice terraces, surf beaches, and ancient temples. Do yoga in Ubud and watch sunset at Uluwatu. Nearby: Gili Islands (1.5hrs), Nusa Penida (day trip). Hotels: COMO Uma Ubud (5*), Mulia Bali (5*), Kuta Paradiso (budget).','2026-05-27 21:26:00','2026-05-30 21:26:00',1100,'app_1779906369597.jpeg'),(9,'London, UK','Royal history meets cutting-edge culture. See Buckingham Palace, the British Museum, and West End shows, then feast at Borough Market. Nearby: Stonehenge (2hrs), Bath (1.5hrs), Windsor (45min). Hotels: The Savoy (5*), Claridges (5*), citizenM Tower (budget).','2026-05-28 21:22:00','2026-06-01 21:22:00',1600,'app_1779906150418.jpeg'),(10,'Barcelona, Spain','Gaudis surreal Sagrada Familia and Park Guell define this vibrant Mediterranean city. Party at Barceloneta beach and feast at La Boqueria. Nearby: Montserrat (1hr), Costa Brava (1.5hrs). Hotels: Hotel Arts (5*), Mandarin Oriental (5*), TOC Hostel (budget).','2026-06-03 21:22:00','2026-06-06 21:22:00',1250,'app_1779906179360.jpeg'),(11,'Sydney, Australia','Iconic Opera House, Harbour Bridge, and Bondi Beach make Sydney unmissable. Hike the coastal path and day-trip to the Blue Mountains. Nearby: Hunter Valley wine (2.5hrs), Port Stephens (2.5hrs). Hotels: Park Hyatt Sydney (5*), Shangri-La (5*), Wake Up! (budget).','2026-06-10 21:31:00','2026-06-12 21:31:00',2800,'app_1779906691698.jpeg'),(12,'Santorini, Greece','White-washed villages on volcanic cliffs above the caldera make Santorini the Aegeans crown jewel. Sail to hot springs and sip Assyrtiko wine at sunset. Nearby: Mykonos (40min ferry), Crete (2hrs). Hotels: Canaves Oia (5*), Grace Santorini (5*), Caveland (budget).','2026-05-28 21:27:00','2026-06-01 21:27:00',1700,'app_1779906439455.jpeg'),(13,'Dubai, UAE','Impossible feats of engineering in the desert: tallest building, indoor ski slopes, palm islands. Visit gold souks and conquer the Burj Khalifa deck. Nearby: Abu Dhabi (1.5hrs), Hatta reserve (1hr). Hotels: Burj Al Arab (7*), Atlantis Palm (5*), Rove Downtown (budget).','2026-05-27 21:29:00','2026-05-31 21:29:00',2100,'app_1779906546009.jpeg'),(14,'Machu Picchu, Peru','The Incas legendary lost city perched in the Andean cloud forest. Hike the Inca Trail and explore the Sacred Valley. Nearby: Cusco city (1.5hrs), Rainbow Mountain (5hrs), Lake Titicaca (6hrs). Hotels: Belmond Sanctuary Lodge (5*), Casa Andina Cusco (4*), Loki Hostel (budget).','2026-06-03 21:28:00','2026-06-10 21:28:00',1950,'app_1779906509554.jpeg'),(15,'Amsterdam, Netherlands','A ring of 17th-century canals, cycle-friendly streets, and world-class art. Visit the Anne Frank House, Van Gogh Museum, and the Jordaan. Nearby: Keukenhof tulips (40min), Zaanse Schans windmills (30min). Hotels: W Amsterdam (5*), Pulitzer (5*), StayOkay Vondelpark (budget).','2026-05-27 21:18:00','2026-05-30 21:18:00',1300,'app_1779905931557.jpeg'),(16,'Safari, Kenya','Witness the Great Migration and spot the Big Five on the vast Masai Mara savanna. A Maasai village visit adds cultural depth. Nearby: Amboseli Kilimanjaro views (4hrs), Lake Nakuru flamingos (3hrs). Hotels: andBeyond Bateleur (5*), Governors Camp (5*), Mara Crossings (mid-range).','2026-05-27 21:24:00','2026-05-30 21:24:00',3200,'app_1779906250366.jpeg'),(18,'Prague, Czech Republic','One of Europes best-preserved medieval cities with Gothic spires and baroque domes. Cross the Charles Bridge at dawn and explore the vast castle. Nearby: Cesky Krumlov (3hrs), Kutna Hora bone church (1.5hrs). Hotels: Four Seasons Prague (5*), Hotel Josef (4*), Sir Tobys (budget).','2026-05-29 21:20:00','2026-06-01 21:21:00',1050,'app_1779906067464.jpeg'),(19,'Maldives','The ultimate overwater bungalow experience on crystal-clear Indian Ocean lagoons. Snorkel with manta rays and watch bioluminescent plankton at night. Nearby: Male city (30min), Maafushi local island, seaplane excursions. Hotels: Gili Lankanfushi (5*), Soneva Jani (5*), Cinnamon Hakuraa (3*).','2026-06-04 21:32:00','2026-06-13 21:32:00',3499,'app_1779906761289.jpeg'),(21,'Rio de Janeiro, Brazil','Christ the Redeemer, Sugarloaf, and the legendary beaches of Ipanema and Copacabana. Join a samba school and explore bohemian Santa Teresa. Nearby: Buzios beach (3hrs), Paraty colonial town (4hrs). Hotels: Copacabana Palace (5*), Hotel Fasano (5*), Selina Santa Teresa (budget).','2026-05-30 21:25:00','2026-06-13 21:25:00',1600,'app_1779906326393.jpeg'),(22,'Kyoto, Japan','Japans cultural soul: 1,600 temples, geisha districts, bamboo groves, and refined cuisine. Attend a tea ceremony and walk Arashiyama at sunrise. Nearby: Nara deer park (45min), Osaka (15min), Hiroshima (1.5hrs). Hotels: Aman Kyoto (5*), Ritz-Carlton Kyoto (5*), Piece Hostel (budget).','2026-05-29 21:30:00','2026-06-04 21:30:00',2200,'app_1779906655333.jpeg'),(23,'Cape Town, South Africa','Table Mountain, penguins, and Cape Winelands vineyards in Africas most stunning city. Drive the Cape Peninsula to Cape Point. Nearby: Stellenbosch wine estates (45min), Hermanus whales (1.5hrs), Robben Island (ferry). Hotels: Ellerman House (5*), One&Only (5*), The Backpack (budget).','2026-06-03 21:30:00','2026-06-12 21:30:00',1850,'app_1779906615051.jpeg'),(24,'Vienna, Austria','Imperial palaces, world-class opera, and legendary coffee houses define the grandest of European capitals. Ride a fiaker around the Ringstrasse. Nearby: Salzburg (2.5hrs), Budapest (2.5hrs), Wachau Valley (1.5hrs). Hotels: Hotel Sacher (5*), Hotel Imperial (5*), Wombats Hostel (budget).','2026-05-25 20:48:00','2026-05-29 20:48:00',1400,'app_1779904109554.jpeg'),(25,'Lisbon, Portugal','Europes sunniest capital with fado music, vintage trams, and Atlantic seafood. Ride Tram 28 and explore the Alfama medieval maze. Nearby: Sintra palaces (40min), Cascais beach (40min), Obidos village (1hr). Hotels: Bairro Alto Hotel (5*), Four Seasons Ritz (5*), Home Lisbon Hostel (budget).','2026-05-27 21:21:00','2026-05-30 21:21:00',1100,'app_1779906113265.jpeg'),(26,'Havana, Cuba','Classic cars, crumbling colonial beauty, and samba on every corner. Sip a mojito at La Bodeguita del Medio and dance at Casa de la Musica. Nearby: Vinales tobacco valley (3hrs), Varadero beach (2hrs), Trinidad UNESCO town (4hrs). Hotels: Gran Hotel Kempinski (5*), Hotel Nacional (5*), Casa particular (budget).','2026-06-04 21:24:00','2026-06-12 21:24:00',1300,'app_1779906289664.jpeg'),(27,'Queenstown, New Zealand','The world adventure capital: bungee jumping, skydiving, jet boating, set against Lord of the Rings mountain scenery. Nearby: Milford Sound fjord (4hrs), Wanaka (1hr), Glenorchy (45min). Hotels: Eichardts Private Hotel (5*), The Rees Hotel (5*), Base Backpackers (budget).','2026-06-03 21:33:00','2026-06-10 21:33:00',2700,'app_1779906798507.jpeg'),(30,'Reykjavik, Iceland','Northern Lights, geothermal hot springs, glaciers, and volcanoes all within an hours drive. The city itself is intimate, walkable, and creative. Nearby: Golden Circle (4hrs), Blue Lagoon (45min), South Coast waterfalls (2hrs). Hotels: The Retreat at Blue Lagoon (5*), Hotel Borg (4*), Kex Hostel (budget).','2026-05-27 20:11:00','2026-05-30 20:11:00',2300,'app_1779901922853.jpeg'),(31,'Phuket, Thailand','From lively Patong beach to quiet luxury bays, Phuket suits every traveller. Kayak limestone karsts in Phang Nga Bay and visit the Big Buddha. Nearby: Phi Phi Islands (1.5hrs ferry), Similan Islands diving (2.5hrs), Krabi (2hrs ferry). Hotels: Amanpuri (5*), Trisara (5*), Lub d Patong (budget).','2026-05-27 21:31:00','2026-06-01 21:31:00',1000,'app_1779906719715.jpeg'),(32,'Buenos Aires, Argentina','South Americas most cosmopolitan city blends tango, European boulevards, and world-class steak. Browse Sunday antique fairs in San Telmo. Nearby: Colonia Uruguay (1hr ferry), Iguazu Falls (2hrs flight), Mendoza wine (2hrs flight). Hotels: Four Seasons BA (5*), Faena Hotel (5*), Millhouse Hostel (budget).','2026-06-05 21:29:00','2026-06-12 21:29:00',1550,'app_1779906574370.jpeg'),(35,'New York, USA','The city that never sleeps offers Broadway, Central Park, and world-class museums. Eat through Chinatown, Harlem, and the West Village. Nearby: The Hamptons (2hrs), Philadelphia (1.5hrs). Hotels: The Plaza (5*), Four Seasons NYC (5*), Pod 51 (budget).','2026-05-27 20:49:00','2026-05-30 20:49:00',1800,'app_1779904218130.jpeg');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-28 12:17:33
