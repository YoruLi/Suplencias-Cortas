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