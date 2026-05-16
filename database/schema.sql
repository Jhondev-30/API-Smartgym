-- ============================================================
--  BASE DE DATOS: smartgym
--  Motor: PostgreSQL
-- ============================================================

-- ============================================================
-- 1. ROLES Y USUARIOS
-- ============================================================

CREATE TABLE Role (
    id_rol      int          PRIMARY KEY,
    Nombre      VARCHAR(100)    NOT NULL,
    Descripcion TEXT
);

CREATE TABLE Usuario (
    ID_user         int          PRIMARY KEY,
    password_hash   VARCHAR(255)    NOT NULL,
    email           VARCHAR(150)    NOT NULL UNIQUE,
    id_rol          INT             NOT NULL,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES Role(id_rol)
);

-- ============================================================
-- 2. ENTRENADORES
-- ============================================================

CREATE TABLE Entrenadores (
    ID_entrenador   int          PRIMARY KEY,
    ID_user         INT             NOT NULL UNIQUE,
    Nombre          VARCHAR(100)    NOT NULL,
    Apellido        VARCHAR(100)    NOT NULL,
    Disciplina      VARCHAR(100),
    Salario         NUMERIC(10,2),
    Horario         VARCHAR(200),
    CONSTRAINT fk_entrenador_usuario FOREIGN KEY (ID_user) REFERENCES Usuario(ID_user)
);

-- ============================================================
-- 3. CLIENTES
-- ============================================================

CREATE TABLE Clientes (
    ID_client   int          PRIMARY KEY,
    ID_user     INT             NOT NULL UNIQUE,
    Nombre      VARCHAR(100)    NOT NULL,
    Apellido    VARCHAR(100)    NOT NULL,
    Telefono    VARCHAR(20),
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (ID_user) REFERENCES Usuario(ID_user)
);

-- ============================================================
-- 4. EVALUACIONES BIOMETRICAS
-- ============================================================

CREATE TABLE EvaBiometricas (
    ID_biometrica       int          PRIMARY KEY,
    ID_client           INT             NOT NULL,
    ID_entrenador       INT             NOT NULL,
    Estatura            NUMERIC(5,2),
    Fecha               DATE            NOT NULL,
    Porcentaje_grasa    NUMERIC(5,2),
    Observaciones       TEXT,
    CONSTRAINT fk_bio_cliente    FOREIGN KEY (ID_client)     REFERENCES Clientes(ID_client),
    CONSTRAINT fk_bio_entrenador FOREIGN KEY (ID_entrenador) REFERENCES Entrenadores(ID_entrenador)
);

-- ============================================================
-- 5. MÁQUINAS
-- ============================================================

CREATE TABLE CategoriaMaquinas (
    ID_categoria    int          PRIMARY KEY,
    Nombre          VARCHAR(100)    NOT NULL
);

CREATE TABLE Maquinas (
    ID_maquina      int          PRIMARY KEY,
    ID_categoria    INT             NOT NULL,
    Nombre          VARCHAR(150)    NOT NULL,
    Descripcion     TEXT,
    Estado          VARCHAR(50),
    CONSTRAINT fk_maquina_categoria FOREIGN KEY (ID_categoria) REFERENCES CategoriaMaquinas(ID_categoria)
);

-- ============================================================
-- 6. TICKETS DE MANTENIMIENTO
-- ============================================================

CREATE TABLE TicketsMantenimiento (
    ID_ticket           int          PRIMARY KEY,
    ID_maquina          INT             NOT NULL,
    Fecha_falla         DATE            NOT NULL,
    Descripcion         TEXT,
    Estado              VARCHAR(50),
    Fecha_resolucion    DATE,
    Costo_reparacion    NUMERIC(10,2),
    CONSTRAINT fk_ticket_maquina FOREIGN KEY (ID_maquina) REFERENCES Maquinas(ID_maquina)
);

-- ============================================================
-- 7. SESIONES Y RESERVAS
-- ============================================================

CREATE TABLE Disciplina (
    ID_disciplina   int          PRIMARY KEY,
    Nombre          VARCHAR(100)    NOT NULL,
    Descripcion     TEXT
);

CREATE TABLE Sesiones (
    ID_sesion       int          PRIMARY KEY,
    ID_disciplina   INT             NOT NULL,
    ID_entrenador   INT             NOT NULL,
    Hora_inicio     TIME            NOT NULL,
    Hora_fin        TIME            NOT NULL,
    Cupos           INT             NOT NULL DEFAULT 0,
    CONSTRAINT fk_sesion_disciplina  FOREIGN KEY (ID_disciplina)  REFERENCES Disciplina(ID_disciplina),
    CONSTRAINT fk_sesion_entrenador  FOREIGN KEY (ID_entrenador)  REFERENCES Entrenadores(ID_entrenador)
);

CREATE TABLE Reservas (
    ID_reserva  int  PRIMARY KEY,
    ID_Client   INT     NOT NULL,
    ID_sesion   INT     NOT NULL,
    Fecha       DATE    NOT NULL,
    CONSTRAINT fk_reserva_cliente FOREIGN KEY (ID_Client) REFERENCES Clientes(ID_client),
    CONSTRAINT fk_reserva_sesion  FOREIGN KEY (ID_sesion) REFERENCES Sesiones(ID_sesion)
);

-- ============================================================
-- 8. SUSCRIPCIONES Y MEMBRESÍAS
-- ============================================================

CREATE TABLE suscripcion (
    ID_suscripcion  int          PRIMARY KEY,
    Nombre          VARCHAR(100)    NOT NULL,
    Costo           NUMERIC(10,2)   NOT NULL,
    Duracion        INT             NOT NULL  -- días
);

CREATE TABLE Membresias (
    ID_mebresia     int          PRIMARY KEY,
    ID_client       INT             NOT NULL,
    ID_suscripcion  INT             NOT NULL,
    Fecha_inicio    DATE            NOT NULL,
    Fecha_fin       DATE            NOT NULL,
    Estado          VARCHAR(50),
    CONSTRAINT fk_membresia_cliente     FOREIGN KEY (ID_client)      REFERENCES Clientes(ID_client),
    CONSTRAINT fk_membresia_suscripcion FOREIGN KEY (ID_suscripcion) REFERENCES suscripcion(ID_suscripcion)
);

-- ============================================================
-- 9. PAGOS
-- ============================================================

CREATE TABLE Pagos (
    ID_pago         int          PRIMARY KEY,
    ID_membresia    INT             NOT NULL,
    Monto           NUMERIC(10,2)   NOT NULL,
    Fecha           DATE            NOT NULL,
    Metodo_pago     VARCHAR(50),
    CONSTRAINT fk_pago_membresia FOREIGN KEY (ID_membresia) REFERENCES Membresias(ID_mebresia)
);

-- ============================================================
-- 10. CONTROL BITÁCORA (accesos)
-- ============================================================

CREATE TABLE ControlBitacora (
    ID_control      int          PRIMARY KEY,
    ID_client       INT             NOT NULL,
    Hora_entrada    TIME,
    Fecha           DATE            NOT NULL,
    Acceso          BOOLEAN         NOT NULL DEFAULT TRUE,
    Motivo_rechazo  TEXT,
    CONSTRAINT fk_bitacora_cliente FOREIGN KEY (ID_client) REFERENCES Clientes(ID_client)
);

-- ============================================================
-- 11. TIENDA
-- ============================================================

CREATE TABLE ProductosTienda (
    ID_producto     int          PRIMARY KEY,
    Nombre          VARCHAR(150)    NOT NULL,
    Descripcion     TEXT,
    Precio          NUMERIC(10,2)   NOT NULL,
    Stock           INT             NOT NULL DEFAULT 0
);

CREATE TABLE VentasTienda (
    ID_venta    int          PRIMARY KEY,
    ID_client   INT             NOT NULL,
    Fecha       DATE            NOT NULL,
    Total       NUMERIC(10,2)   NOT NULL,
    CONSTRAINT fk_venta_cliente FOREIGN KEY (ID_client) REFERENCES Clientes(ID_client)
);

CREATE TABLE DetalleVenta (
    ID_detalle      int          PRIMARY KEY,
    ID_venta        INT             NOT NULL,
    ID_producto     INT             NOT NULL,
    Cantidad        INT             NOT NULL,
    Precio_unidad   NUMERIC(10,2)   NOT NULL,
    CONSTRAINT fk_detalle_venta    FOREIGN KEY (ID_venta)    REFERENCES VentasTienda(ID_venta),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (ID_producto) REFERENCES ProductosTienda(ID_producto)
);