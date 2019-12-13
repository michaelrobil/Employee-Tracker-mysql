DROP DATABASE IF EXISTS cms_managingsystem_DB;
CREATE DATABASE cms_managingsystem_DB;

USE cms_managingsystem_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  salary DECIMAL(10) NOT NULL,
  departmentName VARCHAR(60) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  position  INT NULL,
  manager INT NULL,
  PRIMARY KEY (id)
);
