
-- Módulo Clientes
CREATE TABLE clientes (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(300),
    telefono VARCHAR(15),
    correo_electronico VARCHAR(100),
    ciudad VARCHAR(100),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Módulo Artículos
CREATE TABLE articulos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(300) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad_almacen INT(11) NOT NULL,
    fecha_caducidad DATE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Módulo Ventas
CREATE TABLE ventas (
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_articulo INT(11) NOT NULL,
    id_cliente INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_venta DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_articulo) REFERENCES articulos(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Módulo Personal
CREATE TABLE personal (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(300),
    telefono VARCHAR(15),
    estatus VARCHAR(1),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Módulo Compras
CREATE TABLE compras (
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_articulo INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_compra DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_articulo) REFERENCES articulos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Módulo Registro
CREATE TABLE registro (
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_personal INT(11) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    movimiento ENUM('entrada', 'salida') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_personal) REFERENCES personal(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
