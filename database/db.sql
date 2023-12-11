-- Active: 1698126803899@@127.0.0.1@3306@ssdsp

-- CREATE TABLE
--     Usuarios(
--         id BINARY PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
--         email VARCHAR(50),
--         password VARCHAR(200),
--         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--     );


CREATE TABLE
    Usuarios(
        id VARCHAR(100) PRIMARY KEY ,
        email VARCHAR(50),
        password VARCHAR(200),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE `usuarios` (
  `id` varchar(100) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `bitacora` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) DEFAULT NULL,
  `resolucion` varchar(100) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `candidatos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cargoId` varchar(200) NOT NULL,
  `candidatoId` varchar(200) NOT NULL,
  `emailSent` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cargoId_idx` (`cargoId`),
  KEY `candidatoId_idx` (`candidatoId`),
  CONSTRAINT `candidatoId` FOREIGN KEY (`candidatoId`) REFERENCES `docentes` (`idDocentes`) ON DELETE CASCADE,
  CONSTRAINT `idCargo` FOREIGN KEY (`cargoId`) REFERENCES `cargos` (`idCargos`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `cargos` (
  `idCargos` varchar(100) NOT NULL,
  `docenteId` varchar(100) DEFAULT NULL,
  `codigoMateria` varchar(100) DEFAULT NULL,
  `cursoId` varchar(100) DEFAULT NULL,
  `codigoCupof` varchar(100) DEFAULT NULL,
  `dias` varchar(50) DEFAULT NULL,
  `horario` varchar(50) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'Asignado',
  `suplenteDe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCargos`),
  KEY `idDocente_idx` (`docenteId`),
  KEY `codigoMateria_idx` (`codigoMateria`),
  KEY `cursoId_idx` (`cursoId`),
  CONSTRAINT `codigoMateria` FOREIGN KEY (`codigoMateria`) REFERENCES `materias` (`codigoMateria`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `cursoId` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `docenteId` FOREIGN KEY (`docenteId`) REFERENCES `docentes` (`idDocentes`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci




CREATE TABLE `cargosacubrir` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cargoId` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cargoId_idx` (`cargoId`),
  CONSTRAINT `cargoId` FOREIGN KEY (`cargoId`) REFERENCES `cargos` (`idCargos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=367 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `cursos` (
  `id` varchar(100) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `modalidadId` int DEFAULT NULL,
  `cicloLectivo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modalidadId_idx` (`modalidadId`),
  CONSTRAINT `modalidadId` FOREIGN KEY (`modalidadId`) REFERENCES `modalidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `docentes` (
  `idDocentes` varchar(200) NOT NULL,
  `nombreCompleto` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `dni` varchar(10) NOT NULL,
  `dir` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nac` date DEFAULT NULL,
  `antiguedadEsc` date DEFAULT NULL,
  `antiguedadDoc` date DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDocentes`),
  UNIQUE KEY `idDocentes_UNIQUE` (`idDocentes`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE Docentes (
  idDocentes varchar(200) NOT NULL PRIMARY KEY,
  nombreCompleto varchar(100) NOT NULL,
  email varchar(45) NOT NULL,
  tel varchar(45) DEFAULT NULL,
  dni varchar(10) NOT NULL,
  dir varchar(100) DEFAULT NULL,
  score int DEFAULT NULL,
  createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 
);


CREATE TABLE `materias` (
  `codigoMateria` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `año` varchar(10) NOT NULL,
  `planDeEstudioId` varchar(45) NOT NULL,
  PRIMARY KEY (`codigoMateria`),
  KEY `planDeEstudioId_idx` (`planDeEstudioId`),
  CONSTRAINT `planDeEstudioId` FOREIGN KEY (`planDeEstudioId`) REFERENCES `planesdeestudio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `modalidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `oblea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `docenteId` varchar(200) NOT NULL,
  `materias` varchar(200) NOT NULL,
  `score` varchar(30) DEFAULT NULL,
  `codigoSuna` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `docenteId_UNIQUE` (`docenteId`),
  KEY `docenteId_idx` (`docenteId`),
  CONSTRAINT `docenteIdOblea` FOREIGN KEY (`docenteId`) REFERENCES `docentes` (`idDocentes`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `planesdeestudio` (
  `id` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` mediumtext,
  `resolucion` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci




DELIMITER //
CREATE TRIGGER cargoVacanteTrigger
AFTER UPDATE ON cargos
FOR EACH ROW  
BEGIN
    IF OLD.estado <> NEW.estado THEN
        INSERT INTO cargosacubrir (cargoId) VALUES (OLD.idCargos);
    END IF;
END
//

DELIMITER ;


DELIMITER //
CREATE TRIGGER after_update_cargo
AFTER UPDATE ON cargos
FOR EACH ROW  
BEGIN
    IF OLD.estado <> NEW.estado THEN
        INSERT INTO cargosacubrir (cargoId) VALUES (OLD.idCargos);
    END IF;
END;
//
DELIMITER;




DROP TRIGGER IF EXISTS tr_Bitacora_Insert;
DELIMITER //

CREATE TRIGGER tr_Bitacora_Insert
AFTER INSERT ON docentes
FOR EACH ROW
BEGIN
    DECLARE result VARCHAR(50);

    IF ROW_COUNT() > 0 THEN
        SET result = 'éxito';
    ELSE
        SET result = 'fracaso';
    END IF;

    INSERT INTO Bitacora (descripcion, resolucion)
    VALUES (
        CONCAT('Se realizó una inserción en la tabla docentes. Nuevo docente: ', NEW.nombreCompleto),
        CONCAT('Resolución de la INSERT en docentes - ', result)
    );
END;

//

CREATE TRIGGER tr_Bitacora_Delete
AFTER DELETE ON docentes
FOR EACH ROW
BEGIN
    DECLARE result VARCHAR(50);

    IF ROW_COUNT() > 0 THEN
        SET result = 'éxito';
    ELSE
        SET result = 'fracaso';
    END IF;

    INSERT INTO Bitacora (descripcion, resolucion)
    VALUES (
        CONCAT('Se eliminó con éxito al docente. Docente eliminado: ', OLD.nombreCompleto),
        CONCAT('Resolución en eliminar docente - ', result)
    );
END;

//
DELIMITER ;



CREATE DEFINER=`root`@`localhost` TRIGGER `tr_Bitacora_Insert_Curso` AFTER INSERT ON `cursos` FOR EACH ROW BEGIN
   
    DECLARE result VARCHAR(50);
     SET @user_name = 'Admin123';

   SELECT COUNT(*) INTO result FROM cursos WHERE id = NEW.id;

    IF result > 0 THEN
        SET result = 'fracaso';
    ELSE
        SET result = 'éxito';
    END IF;


    INSERT INTO Bitacora (descripcion, resolucion, userId)
    VALUES (
        CONCAT('Se realizó una inserción en la tabla curso. Nuevo curso: ', NEW.nombre),
        CONCAT(result),
        @user_name
    );
END




CREATE DEFINER=`root`@`localhost` TRIGGER `tr_Bitacora_Delete_Curso` AFTER DELETE ON `cursos` FOR EACH ROW BEGIN

    DECLARE result VARCHAR(50);
	SET @user_name = 'Admin123';

  
    SELECT COUNT(*) INTO result FROM cursos WHERE id = OLD.id;

    IF result > 0 THEN
        SET result = 'fracaso';
    ELSE
        SET result = 'éxito';
    END IF;

    INSERT INTO Bitacora (descripcion, resolucion, userId)
    VALUES (
        CONCAT('Se eliminó con éxito el curso. curso eliminado: ', OLD.nombre),
        CONCAT(result),
        @user_name
    );
END




CREATE DEFINER=`root`@`localhost` TRIGGER `tr_Bitacora_Insert_Materia` AFTER INSERT ON `materias` FOR EACH ROW BEGIN
   
    DECLARE result VARCHAR(50);
     SET @user_name = 'Admin123';

   SELECT COUNT(*) INTO result FROM materias WHERE codigoMateria = NEW.codigoMateria;

    IF result > 0 THEN
        SET result = 'fracaso';
    ELSE
        SET result = 'éxito';
    END IF;


    INSERT INTO Bitacora (descripcion, resolucion, userId)
    VALUES (
        CONCAT('Se realizó una inserción en la tabla materias. Nueva materia: ', NEW.nombre),
        CONCAT(result),
        @user_name
    );
END



CREATE DEFINER=`root`@`localhost` TRIGGER `tr_Bitacora_Delete_Materia` AFTER DELETE ON `materias` FOR EACH ROW BEGIN

    DECLARE result VARCHAR(50);
	SET @user_name = 'Admin123';

  
    SELECT COUNT(*) INTO result FROM materias WHERE codigoMateria = OLD.codigoMateria;

    IF result > 0 THEN
        SET result = 'fracaso';
    ELSE
        SET result = 'éxito';
    END IF;

    INSERT INTO Bitacora (descripcion, resolucion, userId)
    VALUES (
        CONCAT('Se eliminó con éxito la materia. Materia eliminada: ', OLD.nombre),
        CONCAT(result),
        @user_name
    );
END

DROP TRIGGER IF EXISTS after_update_cargos;
DELIMITER //
CREATE DEFINER=`root`@`localhost` TRIGGER `after_update_cargos` AFTER UPDATE ON `cargos` FOR EACH ROW BEGIN
    IF NEW.estado = 'Sin asignar' THEN
        INSERT INTO candidatos (cargoId, candidatoId)
        SELECT
            NEW.idCargos,
            docentes.idDocentes
        FROM
            docentes
        WHERE
            docentes.idDocentes NOT IN (
                SELECT c.candidatoId
                FROM candidatos AS c
                WHERE c.cargoId = NEW.idCargos
            )
              AND docentes.idDocentes NOT IN (
                SELECT DISTINCT suplenteDe
                FROM cargos
                WHERE suplenteDe IS NOT NULL
            )
            AND (
                NEW.dias IS NULL
                OR NEW.horario IS NULL
                OR NOT EXISTS (
                    SELECT 1
                    FROM cargos AS c2
                    WHERE c2.docenteId = docentes.idDocentes
                        AND (
                            FIND_IN_SET(c2.horario, NEW.horario) > 0
                            OR FIND_IN_SET(NEW.horario, c2.horario) > 0
                        )
                        AND (
                            c2.dias IS NULL
                            OR FIND_IN_SET(c2.dias, NEW.dias) > 0
                            OR FIND_IN_SET(NEW.dias, c2.dias) > 0
                        )
                )
            )
AND EXISTS (
    SELECT 1
    FROM oblea
    WHERE oblea.docenteId = docentes.idDocentes
    AND oblea.docenteId != NEW.docenteId 
    AND EXISTS (
        SELECT 1
        FROM materias
        WHERE FIND_IN_SET(materias.codigoMateria, oblea.materias) > 0
        AND materias.codigoMateria = NEW.codigoMateria
    )
);
    END IF;
END

//

DELIMITER ;




SELECT 
    DATE_FORMAT(createdAt, '%Y-%m') as mes,
    COUNT(*) as cantidad
FROM 
    docentes
WHERE 
    createdAt >= CURDATE() - INTERVAL 12 MONTH
GROUP BY 
    mes
ORDER BY 
    mes;



    SELECT 
  MONTH(createdAt) as month, 
  COUNT(*) as total
FROM Docentes 
GROUP BY MONTH(createdAt);