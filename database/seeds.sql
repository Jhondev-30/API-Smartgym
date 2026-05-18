-- ============================================================
--  DATOS SEMILLA: SMARTGYM
--  Motor: PostgreSQL
-- ============================================================

-- ============================================================
-- 1. ROLES
-- ============================================================
INSERT INTO Role (id_rol, Nombre, Descripcion) VALUES
(1, 'Administrador', 'Acceso total al sistema'),
(2, 'Finanzas',      'Gestión de pagos y membresías'),
(3, 'Entrenador',    'Gestión de sesiones y clientes'),
(4, 'Cliente',       'Acceso a reservas y membresías');
-- ============================================================
-- 2. USUARIOS
-- ============================================================
INSERT INTO Usuario (password_hash, email, id_rol, activo) VALUES
('$2b$10$hash_admin_001',       'admin@gimnasio.com',      1, TRUE),
('$2b$10$hash_finance_001',     'finanzas@gimnasio.com',   2, TRUE),
('$2b$10$hash_entrenador_001',  'carlos.ruiz@gimnasio.com',3, TRUE),
('$2b$10$hash_entrenador_002',  'laura.vega@gimnasio.com', 3, TRUE),
('$2b$10$hash_cliente_001',     'juan.perez@gmail.com',    4, TRUE),
('$2b$10$hash_cliente_002',     'maria.lopez@gmail.com',   4, TRUE),
('$2b$10$hash_cliente_003',     'pedro.gomez@gmail.com',   4, TRUE),
('$2b$10$hash_cliente_004',     'ana.torres@gmail.com',    4, TRUE);

-- ============================================================
-- 3. ENTRENADORES
-- ============================================================
INSERT INTO Entrenadores (ID_user, Nombre, Apellido, Disciplina, Salario, Horario) VALUES
(3, 'Carlos',  'Ruiz',  'Crossfit',     1800.00, 'Lunes a Sábado 06:00-14:00'),
(4, 'Laura',   'Vega',  'Yoga',         1600.00, 'Lunes a Sábado 08:00-16:00');

-- ============================================================
-- 4. CLIENTES
-- ============================================================
INSERT INTO Clientes (ID_user, Nombre, Apellido, Telefono) VALUES
(5, 'Juan',  'Pérez',  '555-1001'),
(6, 'María', 'López',  '555-1002'),
(7, 'Pedro', 'Gómez',  '555-1003'),
(8, 'Ana',   'Torres', '555-1004');

-- ============================================================
-- 5. EVALUACIONES BIOMÉTRICAS
-- ============================================================
INSERT INTO EvaBiometricas (ID_client, ID_entrenador, Estatura, Fecha, Porcentaje_grasa, Observaciones) VALUES
(1, 1, 1.75, '2024-01-10', 18.5, 'Buena condición general, continuar rutina de fuerza'),
(2, 2, 1.62, '2024-01-12', 22.0, 'Se recomienda aumentar cardio semanal'),
(3, 1, 1.80, '2024-01-15', 15.2, 'Excelente masa muscular, mantener dieta actual'),
(4, 2, 1.68, '2024-01-18', 25.1, 'Iniciar plan de pérdida de peso gradual');

-- ============================================================
-- 6. CATEGORÍAS DE MÁQUINAS
-- ============================================================
INSERT INTO CategoriaMaquinas (Nombre) VALUES
('Cardio'),
('Fuerza'),
('Funcional'),
('Estiramiento');

-- ============================================================
-- 7. MÁQUINAS
-- ============================================================
INSERT INTO Maquinas (ID_categoria, Nombre, Descripcion, Estado) VALUES
(1, 'Cinta de correr A1',    'Cinta profesional con inclinación automática', 'Activa'),
(1, 'Bicicleta estática B2', 'Bicicleta con resistencia magnética',          'Activa'),
(1, 'Elíptica C3',           'Máquina elíptica de bajo impacto',             'Mantenimiento'),
(2, 'Prensa de piernas',     'Prensa horizontal 45 grados',                  'Activa'),
(2, 'Jalón al pecho',        'Polea alta para dorsal',                       'Activa'),
(2, 'Press de banca',        'Banco plano con soportes',                     'Activa'),
(3, 'TRX',                   'Sistema de suspensión funcional',              'Activa'),
(4, 'Camilla de estiramiento','Camilla acolchada para flexibilidad',         'Activa');

-- ============================================================
-- 8. TICKETS DE MANTENIMIENTO
-- ============================================================
INSERT INTO TicketsMantenimiento (ID_maquina, Fecha_falla, Descripcion, Estado, Fecha_resolucion, Costo_reparacion) VALUES
(3, '2024-02-05', 'Motor hace ruido excesivo al aumentar velocidad', 'Resuelto',  '2024-02-10', 150.00),
(1, '2024-03-12', 'Pantalla táctil no responde',                     'Resuelto',  '2024-03-15',  80.00),
(4, '2024-04-20', 'Fuga de aceite en sistema hidráulico',            'Pendiente', NULL,           NULL);

-- ============================================================
-- 9. DISCIPLINAS
-- ============================================================
INSERT INTO Disciplina (Nombre, Descripcion) VALUES
('Musculación',    'Entrenamiento de fuerza con pesas y máquinas'),
('Yoga',           'Disciplina de flexibilidad, respiración y meditación'),
('CrossFit',       'Entrenamiento funcional de alta intensidad'),
('Spinning',       'Ciclismo indoor en grupo con música'),
('Pilates',        'Ejercicios de control postural y core');

-- ============================================================
-- 10. SESIONES
-- ============================================================
INSERT INTO Sesiones (ID_disciplina, ID_entrenador, Hora_inicio, Hora_fin, Cupos) VALUES
(1, 1, '07:00', '08:00', 10),
(1, 1, '09:00', '10:00', 10),
(2, 2, '08:00', '09:00', 15),
(2, 2, '10:00', '11:00', 15),
(3, 1, '11:00', '12:00',  8),
(4, 2, '07:00', '08:00', 20),
(5, 2, '15:00', '16:00', 12);

-- ============================================================
-- 11. SUSCRIPCIONES
-- ============================================================
INSERT INTO suscripcion (Nombre, Costo, Duracion) VALUES
('Mensual Básico',    30.00,  30),
('Mensual Completo',  50.00,  30),
('Trimestral',       130.00,  90),
('Semestral',        240.00, 180),
('Anual',            420.00, 365);

-- ============================================================
-- 12. MEMBRESÍAS
-- ============================================================
INSERT INTO Membresias (ID_client, ID_suscripcion, Fecha_inicio, Fecha_fin, Estado) VALUES
(1, 2, '2024-01-01', '2024-01-31', 'Vencida'),
(1, 3, '2024-02-01', '2024-04-30', 'Activa'),
(2, 1, '2024-01-15', '2024-02-14', 'Vencida'),
(2, 2, '2024-02-15', '2024-03-15', 'Activa'),
(3, 4, '2024-01-01', '2024-06-30', 'Activa'),
(4, 1, '2024-03-01', '2024-03-31', 'Activa');

-- ============================================================
-- 13. PAGOS
-- ============================================================
INSERT INTO Pagos (ID_membresia, Monto, Fecha, Metodo_pago) VALUES
(1,  50.00, '2024-01-01', 'Tarjeta'),
(2, 130.00, '2024-02-01', 'Efectivo'),
(3,  30.00, '2024-01-15', 'Tarjeta'),
(4,  50.00, '2024-02-15', 'Transferencia'),
(5, 240.00, '2024-01-01', 'Tarjeta'),
(6,  30.00, '2024-03-01', 'Efectivo');

-- ============================================================
-- 14. RESERVAS
-- ============================================================
INSERT INTO Reservas (ID_Client, ID_sesion, Fecha) VALUES
(1, 1, '2024-03-04'),
(1, 3, '2024-03-05'),
(2, 3, '2024-03-04'),
(2, 6, '2024-03-06'),
(3, 2, '2024-03-04'),
(3, 5, '2024-03-07'),
(4, 4, '2024-03-05'),
(4, 7, '2024-03-06');

-- ============================================================
-- 15. CONTROL BITÁCORA
-- ============================================================
INSERT INTO ControlBitacora (ID_client, Hora_entrada, Fecha, Acceso, Motivo_rechazo) VALUES
(1, '07:05', '2024-03-04', TRUE,  NULL),
(2, '08:10', '2024-03-04', TRUE,  NULL),
(3, '09:00', '2024-03-04', TRUE,  NULL),
(4, '10:30', '2024-03-04', FALSE, 'Membresía vencida'),
(1, '07:02', '2024-03-05', TRUE,  NULL),
(2, '07:55', '2024-03-06', TRUE,  NULL);

-- ============================================================
-- 16. PRODUCTOS TIENDA
-- ============================================================
INSERT INTO ProductosTienda (Nombre, Descripcion, Precio, Stock) VALUES
('Proteína Whey 1kg',     'Proteína de suero sabor chocolate',        35.00, 50),
('Creatina 300g',         'Monohidrato de creatina pura',             20.00, 40),
('Guantes de gimnasio',   'Guantes con protección de muñeca',         12.00, 30),
('Botella térmica 750ml', 'Botella de acero inoxidable',               8.00, 60),
('Toalla deportiva',      'Toalla microfibra de secado rápido',        6.00, 45),
('Barra energética',      'Snack proteico sabor frutos rojos',         2.50, 100),
('Cuerda para saltar',    'Cuerda de velocidad ajustable',            10.00, 25);

-- ============================================================
-- 17. VENTAS TIENDA
-- ============================================================
INSERT INTO VentasTienda (ID_client, Fecha, Total) VALUES
(1, '2024-03-04', 43.00),
(2, '2024-03-04',  8.00),
(3, '2024-03-05', 22.50),
(1, '2024-03-06',  6.00);

-- ============================================================
-- 18. DETALLE VENTAS
-- ============================================================
INSERT INTO DetalleVenta (ID_venta, ID_producto, Cantidad, Precio_unidad) VALUES
(1, 1, 1, 35.00),   -- Juan compra proteína
(1, 6, 2,  2.50),   -- Juan compra 2 barras energéticas (+ la proteína = 40, pero redondea a 43 por ej.)
(1, 5, 1,  6.00),   -- Juan compra toalla  → total: 35+5+6 = 43 (ajustado)
(2, 4, 1,  8.00),   -- María compra botella
(3, 2, 1, 20.00),   -- Pedro compra creatina
(3, 6, 1,  2.50),   -- Pedro compra barra  → 22.50
(4, 5, 1,  6.00);   -- Juan compra toalla