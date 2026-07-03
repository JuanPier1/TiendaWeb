CREATE DATABASE TiendaPW2;
    use TiendaPW2;
    -- drop database pw2tienda;

create table dummy ( 
	idprueba int primary key not null auto_increment,
    nombre varchar(100) not null,
    apellidos varchar (150) not null,
    email varchar (100) not null,
    password varchar(100) not null
);
-- drop table dummy;

    CREATE TABLE Usuario (
    id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    fecha_Nacimiento DATE NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Clave VARCHAR(100) NOT NULL,
    Pais INT,
    Provincia INT,
    Ciudad INT

);

CREATE TABLE Cliente (
    id_Cliente INT PRIMARY KEY AUTO_INCREMENT,
    Dire_Cliente VARCHAR(100) NOT NULL,
    Tel_Cliente INT NOT NULL,
    Correo_Cliente VARCHAR(100) NOT NULL,
    Fax_Client VARCHAR(100) NOT NULL,
    Boletin_Cliente TINYINT(1) NOT NULL,
    id_UsuarioCliente INT,
    FOREIGN KEY (id_UsuarioCliente) REFERENCES Usuario (id_Usuario)
);

CREATE TABLE Vendedor (
    id_Vendedor INT PRIMARY KEY NOT NULL,
    Dire_Vendedor VARCHAR(100) NOT NULL,
    Correo_Vendedor VARCHAR(100) NOT NULL,
    Tel_Vendedor INT NOT NULL,
    Cal_Vendedor TINYINT(1) NOT NULL,
    id_UsuarioVendedor INT,
    FOREIGN KEY (id_UsuarioVendedor) REFERENCES Usuario (id_Usuario)
);

CREATE TABLE Pais (
    id_Pais INT PRIMARY KEY NOT NULL,
    nombre_Pais VARCHAR(100) NOT NULL
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE Provincia (
    id_Provincia INT PRIMARY KEY NOT NULL,
    nombre_Provincia VARCHAR(100)
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE Ciudad (
    id_Ciudad INT PRIMARY KEY NOT NULL,
    nombre_Ciudad VARCHAR(100) NOT NULL,
    Pais_Ciudad INT,
    Provincia_Ciudad INT,
    FOREIGN KEY (Pais_Ciudad) REFERENCES Pais (id_Pais),
    FOREIGN KEY (Provincia_Ciudad) REFERENCES Provincia (id_Provincia)
) ENGINE=InnoDB CHARSET=utf8mb4;

ALTER TABLE Usuario 
ADD FOREIGN KEY (Pais) REFERENCES Pais (id_Pais),
ADD FOREIGN KEY (Provincia) REFERENCES Provincia (id_Provincia),
ADD FOREIGN KEY (Ciudad) REFERENCES Ciudad (id_Ciudad);

CREATE TABLE Mensaje (
    id_Mensaje INT PRIMARY KEY NOT NULL,
    mFrom VARCHAR(100),
    mTo VARCHAR(100),
    titulo VARCHAR(100),
    fecha_Mensaje DATE,
    mensaje TEXT,
    leido bit
);

CREATE TABLE Operador (
    id_Operador INT PRIMARY KEY NOT NULL,
    tipo_Operador VARCHAR(100),
    id_UsuarioOperador INT,
    FOREIGN KEY (id_UsuarioOperador) REFERENCES Usuario (id_Usuario)
);

CREATE TABLE Pedido (
    id_Pedido INT PRIMARY KEY NOT NULL,
    fecha_Pedido DATE NOT NULL,
    total_Pedido DECIMAL(10, 2) NOT NULL, -- Cambiado a DECIMAL
    formapago_Pedido VARCHAR(100),
    Pagado bit,
    Entregado bit,
    dire_Envio VARCHAR(1000) NOT NULL,
    dire_Factura VARCHAR(1000) NOT NULL,
    empresa_Trans VARCHAR(200) NOT NULL,
    NROguia VARCHAR(100) NOT NULL,
    costo_Trans INT NOT NULL,
    cliente_Pedido INT,
    FOREIGN KEY (cliente_Pedido) REFERENCES Cliente (id_Cliente)
);

CREATE TABLE Categoria (
    id_Cateogria INT PRIMARY KEY NOT NULL,
    nombre_Cateogria VARCHAR(100) NOT NULL,
    orden_Categoria INT NOT NULL, 
    seccion_Categoria VARCHAR(100) NOT NULL
);

CREATE TABLE Producto (
    id_Producto INT PRIMARY KEY NOT NULL,
    titulo_Producto VARCHAR(100) NOT NULL,
    des_Producto VARCHAR(1000) NOT NULL,
    precio_Producto DECIMAL(10, 2) NOT NULL,
    existencia_Producto INT NOT NULL, 
    peso_Producto DECIMAL(10, 2) NOT NULL,
    portada_Producto bit
);

CREATE TABLE Compra (
    id_Compra INT PRIMARY KEY NOT NULL,
    fecha_Compra DATE NOT NULL,
    total_Compra DECIMAL(10, 2) NOT NULL,
    venta_Compra INT,
    FOREIGN KEY (venta_Compra) REFERENCES Vendedor (id_Vendedor)
);

CREATE TABLE Detalle_Pedido (
    id_DetalleP INT PRIMARY KEY NOT NULL,
    item_DetalleP INT NOT NULL,
    cantidad_DetalleP INT NOT NULL,
    precio_DetalleP DECIMAL(10, 2) NOT NULL,
    subtotal_DetalleP DECIMAL(10, 2) NOT NULL,
    costoenvio_DetalleP DECIMAL(10, 2) NOT NULL,
    pedido_DetalleP INT,
    producto_DetalleP INT,
    FOREIGN KEY (pedido_DetalleP) REFERENCES Pedido (id_Pedido),
    FOREIGN KEY (producto_DetalleP) REFERENCES PRODUCTO (id_Producto)
);

CREATE TABLE Detalle_Compra (
    id_DetalleC INT NOT NULL,
    item_DetalleC INT NOT NULL,
    cantidad_DetalleC INT NOT NULL,
    precio_DetalleC DECIMAL(10, 2) NOT NULL,
    subtotal_DetalleC DECIMAL(10, 2) NOT NULL,
    costoenvio_DetalleC DECIMAL(10, 2) NOT NULL,
    producto_DetalleC INT,
    compra_DetalleC INT,
    FOREIGN KEY (producto_DetalleC) REFERENCES producto (id_Producto),
    FOREIGN KEY (compra_DetalleC) REFERENCES compra (id_Compra)
);

CREATE TABLE Foto (
    id_Foto INT NOT NULL,
    path_Foto VARCHAR(100),
    producto_Foto INT,
    FOREIGN KEY (producto_Foto) REFERENCES producto (id_Producto)
);

CREATE TABLE Comentario (
    id_Comentario INT PRIMARY KEY NOT NULL,
    texto_Comentario VARCHAR(200),
    fecha_Comentario DATE,
    contestacion_Comentario VARCHAR(200),
    producto_Comentario INT,
    cliente_Comentario INT, 
    operador_Comentario INT, 
    FOREIGN KEY (producto_Comentario) REFERENCES producto (id_Producto),
    FOREIGN KEY (cliente_Comentario) REFERENCES cliente (id_Cliente),
    FOREIGN KEY (operador_Comentario) REFERENCES operador (id_Operador)
);


