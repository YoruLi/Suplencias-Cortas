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


