-- Insercciones para la tabla Clientes
INSERT INTO clientes (nombre, direccion, telefono, correo_electronico, ciudad) VALUES
('Juan Pérez', 'Av. Revolución 123', '5512345678', 'juan.perez@email.com', 'Ciudad de México'),
('María Rodríguez', 'Calle Hidalgo 456', '3323456789', 'maria.rodriguez@email.com', 'Guadalajara'),
('Carlos Gómez', 'Paseo de la Reforma 789', '8887654321', 'carlos.gomez@email.com', 'Monterrey'),
('Ana Martínez', 'Boulevard Agua Caliente 234', '6644321987', 'ana.martinez@email.com', 'Tijuana');

-- Insercciones para la tabla Artículos
INSERT INTO articulos (descripcion, precio, cantidad_almacen, fecha_caducidad) VALUES
('Laptop Dell Inspiron', 12999.50, 25, '2026-12-31'),
('Smartphone Samsung Galaxy', 8500.00, 50, '2025-06-30'),
('Tablet Apple iPad', 9800.75, 35, '2025-09-15'),
('Monitor LG 24 pulgadas', 3500.25, 40, '2026-03-20');

-- Insercciones para la tabla Personal
INSERT INTO personal (nombre, direccion, telefono, estatus) VALUES
('Roberto Sánchez', 'Privada de los Pinos 45', '5587654321', 'A'),
('Laura García', 'Calle del Roble 89', '3312345678', 'A'),
('Miguel Torres', 'Av. Universidad 567', '8876541234', 'A'),
('Sofía Hernández', 'Pasaje del Bosque 12', '6655443322', 'A');

-- Insercciones para la tabla Compras
INSERT INTO compras (id_articulo, cantidad, precio, iva, subtotal, total, fecha_compra) VALUES
(1, 10, 10000.00, 1600.00, 100000.00, 116000.00, '2024-02-15 10:30:00'),
(2, 20, 6500.00, 2080.00, 130000.00, 152800.00, '2024-02-16 14:45:00'),
(3, 15, 7500.00, 1800.00, 112500.00, 131700.00, '2024-02-17 09:20:00'),
(4, 25, 2800.00, 1120.00, 70000.00, 82400.00, '2024-02-18 11:10:00');

-- Insercciones para la tabla Ventas
INSERT INTO ventas (id_articulo, id_cliente, cantidad, precio, iva, subtotal, total, fecha_venta) VALUES
(1, 1, 2, 12999.50, 4159.84, 25999.00, 30158.84, '2024-02-20 15:30:00'),
(2, 2, 1, 8500.00, 1360.00, 8500.00, 9860.00, '2024-02-21 11:45:00'),
(3, 3, 3, 9800.75, 4704.36, 29402.25, 34106.61, '2024-02-22 16:20:00'),
(4, 4, 5, 3500.25, 2800.20, 17501.25, 20301.45, '2024-02-23 10:15:00');

-- Insercciones para la tabla Registro
INSERT INTO registro (id_personal, fecha, hora, movimiento) VALUES
(1, '2024-02-20', '08:00:00', 'entrada'),
(1, '2024-02-20', '17:30:00', 'salida'),
(2, '2024-02-20', '09:15:00', 'entrada'),
(2, '2024-02-20', '18:00:00', 'salida'),
(3, '2024-02-21', '08:30:00', 'entrada'),
(3, '2024-02-21', '16:45:00', 'salida'),
(4, '2024-02-21', '07:45:00', 'entrada'),
(4, '2024-02-21', '17:15:00', 'salida');