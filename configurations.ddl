; Script to configure the MySQL database to support the Configrations API

CREATE DATABASE configurations;

CREATE TABLE config (
    name VARCHAR(512) NOT NULL,
    hostname VARCHAR(512) NOT NULL,
    port INTEGER NOT NULL,
    username VARCHAR(512) NOT NULL

    primary key (name)
);

CREATE USER 'config_service'@'localhost' IDENTIFIED BY 'servicePass';

GRANT ALL PRIVILEGES ON configurations.* TO 'config_service'@'localhost';
FLUSH PRIVILEGES;

