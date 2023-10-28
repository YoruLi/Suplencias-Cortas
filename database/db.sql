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