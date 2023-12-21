
CREATE TABLE
    Usuarios(
        id VARCHAR(100) PRIMARY KEY ,
        email VARCHAR(50),
        password VARCHAR(200),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );



CREATE TABLE Bitacora (
    id INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(200),
    resolucion VARCHAR(100),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId VARCHAR(200),
    PRIMARY KEY (id)
);


CREATE TABLE Candidatos (
    id INT NOT NULL AUTO_INCREMENT,
    cargoId VARCHAR(200) NOT NULL,
    candidatoId VARCHAR(200) NOT NULL,
    emailSent TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id),
    KEY cargoId_idx (cargoId),
    KEY candidatoId_idx (candidatoId),
    CONSTRAINT candidatoId FOREIGN KEY (candidatoId) REFERENCES docentes (idDocentes) ON DELETE CASCADE,
    CONSTRAINT idCargo FOREIGN KEY (cargoId) REFERENCES cargos (idCargos) ON DELETE CASCADE
);


CREATE TABLE Cargos (
    idCargos VARCHAR(100) NOT NULL,
    docenteId VARCHAR(100) DEFAULT NULL,
    codigoMateria VARCHAR(100) DEFAULT NULL,
    cursoId VARCHAR(100) DEFAULT NULL,
    codigoCupof VARCHAR(100) DEFAULT NULL,
    dias VARCHAR(50) DEFAULT NULL,
    horario VARCHAR(50) DEFAULT NULL,
    estado VARCHAR(45) DEFAULT 'Asignado',
    suplenteDe VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idCargos),
    KEY idDocente_idx (docenteId),
    KEY codigoMateria_idx (codigoMateria),
    KEY cursoId_idx (cursoId),
    CONSTRAINT codigoMateria FOREIGN KEY (codigoMateria) REFERENCES materias (codigoMateria) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT cursoId FOREIGN KEY (cursoId) REFERENCES cursos (id) ON DELETE CASCADE,
    CONSTRAINT docenteId FOREIGN KEY (docenteId) REFERENCES docentes (idDocentes) ON DELETE CASCADE ON UPDATE RESTRICT
);

CREATE TABLE CargosACubrir (
    id INT NOT NULL AUTO_INCREMENT,
    cargoId VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    KEY cargoId_idx (cargoId),
    CONSTRAINT cargoId FOREIGN KEY (cargoId) REFERENCES cargos (idCargos) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Cursos (
    id VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) DEFAULT NULL,
    modalidadId INT DEFAULT NULL,
    cicloLectivo VARCHAR(10) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY modalidadId_idx (modalidadId),
    CONSTRAINT modalidadId FOREIGN KEY (modalidadId) REFERENCES modalidades (id)
);


CREATE TABLE Docentes (
    idDocentes VARCHAR(200) NOT NULL PRIMARY KEY,
    nombreCompleto VARCHAR(100) NOT NULL,
    email VARCHAR(45) NOT NULL,
    tel VARCHAR(45) DEFAULT NULL,
    dni VARCHAR(10) NOT NULL,
    dir VARCHAR(100) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nac DATE DEFAULT NULL,
    antiguedadEsc DATE DEFAULT NULL,
    antiguedadDoc DATE DEFAULT NULL,
    localidad VARCHAR(45) DEFAULT NULL
);


CREATE TABLE Materias (
    codigoMateria VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    año VARCHAR(10) NOT NULL,
    planDeEstudioId VARCHAR(45) NOT NULL,
    PRIMARY KEY (codigoMateria),
    KEY planDeEstudioId_idx (planDeEstudioId),
    CONSTRAINT planDeEstudioId FOREIGN KEY (planDeEstudioId) REFERENCES planesdeestudio (id)
);

CREATE TABLE Modalidades (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Oblea (
    id INT NOT NULL AUTO_INCREMENT,
    docenteId VARCHAR(200) NOT NULL,
    materias VARCHAR(200) NOT NULL,
    score VARCHAR(30) DEFAULT NULL,
    codigoSuna VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY docenteId_UNIQUE (docenteId),
    KEY docenteId_idx (docenteId),
    CONSTRAINT docenteIdOblea FOREIGN KEY (docenteId) REFERENCES docentes (idDocentes)
);


CREATE TABLE PlanesDeEstudio (
    id VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion MEDIUMTEXT,
    resolucion MEDIUMTEXT,
    PRIMARY KEY (id)
);

















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







CREATE DEFINER=`root`@`localhost` TRIGGER `cargoVacanteTrigger` AFTER UPDATE ON `cargos` FOR EACH ROW BEGIN
      IF NEW.estado = 'Sin asignar' AND NOT EXISTS (SELECT 1 FROM cargosacubrir WHERE cargoId = NEW.idCargos) THEN
        INSERT INTO cargosacubrir (cargoId) VALUES (NEW.idCargos);
    END IF;
END






CREATE DEFINER=`root`@`localhost` TRIGGER `deleteCargoVacante` AFTER UPDATE ON `cargos` FOR EACH ROW BEGIN
    IF NEW.estado = 'Asignado' THEN
        DELETE FROM cargosacubrir WHERE cargoId = OLD.idCargos;
    END IF;
END







CREATE DEFINER=`root`@`localhost` TRIGGER `deleteCandidato` AFTER UPDATE ON `cargos` FOR EACH ROW BEGIN
    IF NEW.estado = 'Asignado' THEN
        DELETE FROM candidatos WHERE cargoId = OLD.idCargos;
    END IF;
END




