CREATE DATABASE TiendaPW2;
use TiendaPW2;
-- drop database pw2tienda;

CREATE TABLE Usuario(
	id_usuario INT PRIMARY KEY not null,
    nombre		varchar(100) not null,
    apellidos 	varchar(150) not null,
    email		varchar(100) not null,
    contrasena	varchar(100) not null
);

CREATE TABLE Productos(
	nombre		varchar(100) not null,
    categoria	varchar(100) not null,
    precio		int
);

CREATE TABLE tarjetas(
	usuarioTarjeta varchar(100) not null,
    numeroTarjeta int,
    cvv			  int
);

