
USE master
GO

CREATE DATABASE DB_A2CC24_CIVY
GO

USE DB_A2CC24_CIVY
GO

CREATE TABLE [dbo].[Cli_Juridico](
	[id_juridico] [int] IDENTITY(1,1) NOT NULL,
	[razonSocial] [varchar](45) NULL,
	[nComercial] [varchar](45) NULL,
	[ruc] [char](11) NULL,
	[email] [varchar](100) NULL,
	[direccion] [varchar](100) NULL,
	[referencia] [varchar](100) NULL,
	[telefono1] [varchar](10) NULL,
	[telefono2] [varchar](10) NULL,
	[id_tipo_cliente] [int] NOT NULL,
	[id_estado] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_juridico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Cli_Natural]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Cli_Natural](
	[id_natural] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[apepat] [varchar](45) NULL,
	[apemat] [varchar](45) NULL,
	[dni] [char](8) NULL,
	[sexo] [char](1) NULL,
	[email] [varchar](100) NULL,
	[direccion] [varchar](100) NULL,
	[referencia] [varchar](100) NULL,
	[telefono] [varchar](10) NULL,
	[celular] [varchar](10) NULL,
	[id_estado] [int] NOT NULL,
	[id_tipo_cliente] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_natural] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Empleado](
	[id_empleado] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](45) NOT NULL,
	[ape_paterno] [varchar](45) NOT NULL,
	[ape_materno] [varchar](45) NOT NULL,
	[dni] [varchar](8) NOT NULL,
	[sexo] [char](1) NOT NULL,
	[departamento] [varchar](45) NOT NULL,
	[provincia] [varchar](45) NOT NULL,
	[distrito] [varchar](45) NOT NULL,
	[direccion] [varchar](45) NOT NULL,
	[email] [varchar](45) NOT NULL,
	[estado_civil] [varchar](45) NOT NULL,
	[telefono] [varchar](10) NOT NULL,
	[celular] [varchar](10) NOT NULL,
	[fecha_nacimiento] [datetime] NOT NULL,
	[foto] [varbinary](8000) NULL,
	[id_estado] [int] NOT NULL,
	[id_tipo_empleado] [int] NOT NULL,
 CONSTRAINT [PK__Empleado__88B513940DB39657] PRIMARY KEY CLUSTERED 
(
	[id_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Estados]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Estados](
	[id_estado] [int] IDENTITY(1,1) NOT NULL,
	[estado] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Productos](
	[id_productos] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](100) NULL,
	[marca] [varchar](45) NULL,
	[modelo] [varchar](45) NULL,
	[stock] [varchar](45) NULL,
	[unidad_medida] [varchar](45) NULL,
	[foto] [varbinary](8000) NULL,
	[id_tipo_producto] [int] NOT NULL,
	[id_estado] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_productos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Rol](
	[id_rol] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Servicios]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Servicios](
	[ID_Servicios] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](100) NULL,
	[foto] [varbinary](8000) NULL,
	[id_tipo_producto] [int] NOT NULL,
	[id_estado] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID_Servicios] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Cliente]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Cliente](
	[id_tipo_cliente] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Empleado]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Empleado](
	[id_tipo_empleado] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Producto]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Producto](
	[id_tipo_producto] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](20) NULL,
	[contrasena] [varchar](20) NULL,
	[numero_intentos] [int] NULL,
	[bloqueo] [bit] NULL,
	[id_rol] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Vehiculo]    Script Date: 4/11/2017 09:04:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Vehiculo](
	[placa] [varchar](20) NOT NULL,
	[marca] [varchar](20) NOT NULL,
	[capa_maxima] [int] NOT NULL,
	[Venc_SOAT] [varchar](12) NOT NULL,
	[modelo] [varchar](20) NOT NULL,
	[id_estado] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[placa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Cli_Natural] ON 

INSERT [dbo].[Cli_Natural] ([id_natural], [nombre], [apepat], [apemat], [dni], [sexo], [email], [direccion], [referencia], [telefono], [celular], [id_estado], [id_tipo_cliente]) VALUES (2, N'JORGE', N'CURIOSO', N'CURIOSA', N'12345678', N'm', N'JCuriosito@gmail.com', N'AV.LOSCURIOSOS', N'NOSE', N'1547823457', N'1234567812', 1, 1)
INSERT [dbo].[Cli_Natural] ([id_natural], [nombre], [apepat], [apemat], [dni], [sexo], [email], [direccion], [referencia], [telefono], [celular], [id_estado], [id_tipo_cliente]) VALUES (3, N'QWE', N'WQEWQ', N'WQEWQ', N'4897465 ', N'M', N'SADSA@HOTMAIL.COM', N'WQEWQ', N'ASDASDSADSAD', N'3277898', N'12345678', 1, 1)
INSERT [dbo].[Cli_Natural] ([id_natural], [nombre], [apepat], [apemat], [dni], [sexo], [email], [direccion], [referencia], [telefono], [celular], [id_estado], [id_tipo_cliente]) VALUES (4, N'MARCOS', N'GUERRERO', N'LOPEZ', N'51144288', N'M', N'MARQUITOS@GMAIL.COM', N'AV BRASIL 15451', N'A LADO DE PLAZA VEA', N'5774554', N'970805045', 1, 1)
SET IDENTITY_INSERT [dbo].[Cli_Natural] OFF
SET IDENTITY_INSERT [dbo].[Empleado] ON 

INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (1, N'CARLOS CRISTOFER', N'ROJAS', N'PAREDES', N'73097417', N'M', N'LIMA', N'LIMA', N'INDEPENDENCIA', N'AV BRASIL 15154', N'COLDHEADSKILLET360@GMAIL.COM', N'SOLANO', N'522633', N'980706923', CAST(N'1995-12-26 00:00:00.000' AS DateTime), NULL, 1, 1)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (2, N'NICOL', N'MIRANDA', N'CUYA', N'98745869', N'F', N'LIMA', N'LIMA', N'INDEPENDENCIA CITY', N'AV KETI 1544', N'LANICOL@GMAIL.COM', N'SOLTERITA ', N'7224578', N'950471842', CAST(N'1996-01-01 00:00:00.000' AS DateTime), NULL, 1, 1)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (5, N'MARIA', N'TETES', N'TICONA', N'75412457', N'F', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'CALLE LOS S 1515', N'MARIA@GMAIL.COM', N'SOLTERO', N'52214445', N'980705587', CAST(N'2014-10-10 00:00:00.000' AS DateTime), NULL, 1, 8)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (6, N'SERGIO', N'MALDONADO', N'TORRES', N'73014774', N'M', N'LIMA', N'LIMA', N'JESUS MARIA', N'AV BRASIL 15451', N'SERGIO@GMAIL.COM', N'CASADO', N'52214445', N'980705587', CAST(N'1994-11-25 00:00:00.000' AS DateTime), NULL, 1, 3)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (7, N'SERGIO', N'SIFUENTES', N'MARTINEZ', N'15515454', N'M', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'AV ALFON4515', N'MARIA@GMAIL.COM', N'SOLTERO', N'52214445', N'980705587', CAST(N'2017-10-01 00:00:00.000' AS DateTime), NULL, 1, 4)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (8, N'MARCELO', N'KETI', N'MPORTA', N'74144578', N'M', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'CALLE LOS', N'MARCE@GMAIL.COM', N'CASADO', N'52214445', N'980705587', CAST(N'1995-12-25 00:00:00.000' AS DateTime), NULL, 1, 1)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (9, N'CA', N'DDS', N'DSDSD', N'48484545', N'M', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'CALLE LOS S 1515', N'SERGIO@GMAIL.COM', N'SOLTERO', N'52214445', N'980705587', CAST(N'2017-10-02 00:00:00.000' AS DateTime), NULL, 1, 2)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (10, N'MAURICIO', N'RIVERA', N'ALARCON', N'15154154', N'M', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'CALLE LOS S 1515', N'MAURICIO@GMAIL.COM', N'SOLTERO', N'52214445', N'980705587', CAST(N'2017-10-02 00:00:00.000' AS DateTime), NULL, 1, 3)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (11, N'RICARDO', N'ARJONA', N'JA', N'15544554', N'M', N'LIMA', N'LIMA', N'LOS OLIVOCS', N'CALLE LOS', N'R.ARJONA@GMAIL.COM', N'CASADO', N'52214445', N'980705587', CAST(N'2017-10-02 00:00:00.000' AS DateTime), NULL, 1, 3)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (12, N'MANUEL', N'HINOSTROZA', N'PERALTA', N'14477484', N'M', N'LIMA', N'LIMA', N'LOS OLIVOS', N'AV BRASIL 15451', N'HINO@GMAIL.COM', N'SOLTERO', N'52214445', N'980705587', CAST(N'1995-10-10 00:00:00.000' AS DateTime), NULL, 1, 1)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (13, N'ENZO', N'MEJIA', N'HUAMANÍ', N'57784955', N'M', N'LIMA', N'LIMA', N'CERCADO DE LIMA', N'AV ESPAÑA 15545', N'ENZO@GMAIL.COM', N'CASADO', N'8874551545', N'987745884', CAST(N'1980-05-10 00:00:00.000' AS DateTime), NULL, 1, 1)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (14, N'HENRY', N'OPORTO', N'JIMENEZ', N'87774455', N'M', N'LIMA', N'LIMA', N'INDEPENDENCIA', N'AV LOS PINOS 1551', N'HENRY.OPORTO@GMAIL.COM', N'SOLTERO', N'0800457851', N'974877458', CAST(N'1995-05-05 00:00:00.000' AS DateTime), NULL, 1, 3)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (15, N'DSAD', N'SADSA', N'SADSA', N'12346578', N'M', N'SADSA', N'SADSAD', N'DASDSAD', N'SADSAD', N'DSADSA@HOTMAIL.COM', N'SOLTERO', N'3277898', N'985632147', CAST(N'2017-10-03 00:00:00.000' AS DateTime), NULL, 1, 8)
INSERT [dbo].[Empleado] ([id_empleado], [nombres], [ape_paterno], [ape_materno], [dni], [sexo], [departamento], [provincia], [distrito], [direccion], [email], [estado_civil], [telefono], [celular], [fecha_nacimiento], [foto], [id_estado], [id_tipo_empleado]) VALUES (16, N'SDSD', N'DSD', N'DSDSDSD', N'2121', N'M', N'SDSD', N'SDSDS', N'SDSDS', N'DS', N'DSDSD@GMAIL.COM', N'SOLTERO', N'121212', N'121212121', CAST(N'2017-10-04 00:00:00.000' AS DateTime), NULL, 1, 8)
SET IDENTITY_INSERT [dbo].[Empleado] OFF
SET IDENTITY_INSERT [dbo].[Estados] ON 

INSERT [dbo].[Estados] ([id_estado], [estado]) VALUES (1, N'ACTIVO')
INSERT [dbo].[Estados] ([id_estado], [estado]) VALUES (2, N'INACTIVO')
SET IDENTITY_INSERT [dbo].[Estados] OFF
SET IDENTITY_INSERT [dbo].[Rol] ON 

INSERT [dbo].[Rol] ([id_rol], [descripcion]) VALUES (1, N'Administrador')
INSERT [dbo].[Rol] ([id_rol], [descripcion]) VALUES (2, N'Encargado de Inventario')
INSERT [dbo].[Rol] ([id_rol], [descripcion]) VALUES (3, N'Encargado de Ventas')
INSERT [dbo].[Rol] ([id_rol], [descripcion]) VALUES (4, N'Consignador')
SET IDENTITY_INSERT [dbo].[Rol] OFF
SET IDENTITY_INSERT [dbo].[Tipo_Cliente] ON 

INSERT [dbo].[Tipo_Cliente] ([id_tipo_cliente], [descripcion]) VALUES (1, N'Natural')
INSERT [dbo].[Tipo_Cliente] ([id_tipo_cliente], [descripcion]) VALUES (2, N'Jurídico')
SET IDENTITY_INSERT [dbo].[Tipo_Cliente] OFF
SET IDENTITY_INSERT [dbo].[Tipo_Empleado] ON 

INSERT [dbo].[Tipo_Empleado] ([id_tipo_empleado], [descripcion]) VALUES (1, N'GERENTE')
INSERT [dbo].[Tipo_Empleado] ([id_tipo_empleado], [descripcion]) VALUES (2, N'DESPACHO')
INSERT [dbo].[Tipo_Empleado] ([id_tipo_empleado], [descripcion]) VALUES (3, N'TRANSPORTISTA')
INSERT [dbo].[Tipo_Empleado] ([id_tipo_empleado], [descripcion]) VALUES (4, N'PROGRAMADOR')
INSERT [dbo].[Tipo_Empleado] ([id_tipo_empleado], [descripcion]) VALUES (8, N'LEÑADOR XD')
SET IDENTITY_INSERT [dbo].[Tipo_Empleado] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([id_usuario], [usuario], [contrasena], [numero_intentos], [bloqueo], [id_rol]) VALUES (1, N'admin', N'admin', 3, 0, 1)
INSERT [dbo].[Usuario] ([id_usuario], [usuario], [contrasena], [numero_intentos], [bloqueo], [id_rol]) VALUES (2, N'ipinco', N'456', 3, 0, 2)
INSERT [dbo].[Usuario] ([id_usuario], [usuario], [contrasena], [numero_intentos], [bloqueo], [id_rol]) VALUES (3, N'crojas', N'123', 3, 0, 3)
INSERT [dbo].[Usuario] ([id_usuario], [usuario], [contrasena], [numero_intentos], [bloqueo], [id_rol]) VALUES (4, N'nanampa', N'789', 3, 0, 4)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
INSERT [dbo].[Vehiculo] ([placa], [marca], [capa_maxima], [Venc_SOAT], [modelo], [id_estado]) VALUES (N'ABCDEF123', N'Toyota', 10, N'12/10/2018', N'Yaris', 1)
/****** Object:  Index [fk_Cli_Juridico_Estados1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Cli_Juridico_Estados1_idx] ON [dbo].[Cli_Juridico]
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Cli_Juridico_Tipo_Cliente1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Cli_Juridico_Tipo_Cliente1_idx] ON [dbo].[Cli_Juridico]
(
	[id_tipo_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Cli_Natural_Estados1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Cli_Natural_Estados1_idx] ON [dbo].[Cli_Natural]
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Cli_Natural_Tipo_Cliente1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Cli_Natural_Tipo_Cliente1_idx] ON [dbo].[Cli_Natural]
(
	[id_tipo_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_empleado_Estados1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_empleado_Estados1_idx] ON [dbo].[Empleado]
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_empleado_Tipo_Empleado1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_empleado_Tipo_Empleado1_idx] ON [dbo].[Empleado]
(
	[id_tipo_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Productos_Estados1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Productos_Estados1_idx] ON [dbo].[Productos]
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Productos_Tipo_Producto1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Productos_Tipo_Producto1_idx] ON [dbo].[Productos]
(
	[id_tipo_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Servicios_Estados1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Servicios_Estados1_idx] ON [dbo].[Servicios]
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_Servicios_Tipo_Producto1_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_Servicios_Tipo_Producto1_idx] ON [dbo].[Servicios]
(
	[id_tipo_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_usuario_rol_idx]    Script Date: 4/11/2017 09:04:52 ******/
CREATE NONCLUSTERED INDEX [fk_usuario_rol_idx] ON [dbo].[Usuario]
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cli_Juridico]  WITH CHECK ADD  CONSTRAINT [fk_Cli_Juridico_Estados1] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
ALTER TABLE [dbo].[Cli_Juridico] CHECK CONSTRAINT [fk_Cli_Juridico_Estados1]
GO
ALTER TABLE [dbo].[Cli_Juridico]  WITH CHECK ADD  CONSTRAINT [fk_Cli_Juridico_Tipo_Cliente1] FOREIGN KEY([id_tipo_cliente])
REFERENCES [dbo].[Tipo_Cliente] ([id_tipo_cliente])
GO
ALTER TABLE [dbo].[Cli_Juridico] CHECK CONSTRAINT [fk_Cli_Juridico_Tipo_Cliente1]
GO
ALTER TABLE [dbo].[Cli_Natural]  WITH CHECK ADD  CONSTRAINT [fk_Cli_Natural_Estados1] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
ALTER TABLE [dbo].[Cli_Natural] CHECK CONSTRAINT [fk_Cli_Natural_Estados1]
GO
ALTER TABLE [dbo].[Cli_Natural]  WITH CHECK ADD  CONSTRAINT [fk_Cli_Natural_Tipo_Cliente1] FOREIGN KEY([id_tipo_cliente])
REFERENCES [dbo].[Tipo_Cliente] ([id_tipo_cliente])
GO
ALTER TABLE [dbo].[Cli_Natural] CHECK CONSTRAINT [fk_Cli_Natural_Tipo_Cliente1]
GO
ALTER TABLE [dbo].[Empleado]  WITH CHECK ADD  CONSTRAINT [fk_empleado_Estados1] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
ALTER TABLE [dbo].[Empleado] CHECK CONSTRAINT [fk_empleado_Estados1]
GO
ALTER TABLE [dbo].[Empleado]  WITH CHECK ADD  CONSTRAINT [fk_empleado_Tipo_Empleado1] FOREIGN KEY([id_tipo_empleado])
REFERENCES [dbo].[Tipo_Empleado] ([id_tipo_empleado])
GO
ALTER TABLE [dbo].[Empleado] CHECK CONSTRAINT [fk_empleado_Tipo_Empleado1]
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [fk_Productos_Estados1] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [fk_Productos_Estados1]
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [fk_Productos_Tipo_Producto1] FOREIGN KEY([id_tipo_producto])
REFERENCES [dbo].[Tipo_Producto] ([id_tipo_producto])
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [fk_Productos_Tipo_Producto1]
GO
ALTER TABLE [dbo].[Servicios]  WITH CHECK ADD  CONSTRAINT [fk_Servicios_Estados1] FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
ALTER TABLE [dbo].[Servicios] CHECK CONSTRAINT [fk_Servicios_Estados1]
GO
ALTER TABLE [dbo].[Servicios]  WITH CHECK ADD  CONSTRAINT [fk_Servicios_Tipo_Producto1] FOREIGN KEY([id_tipo_producto])
REFERENCES [dbo].[Tipo_Producto] ([id_tipo_producto])
GO
ALTER TABLE [dbo].[Servicios] CHECK CONSTRAINT [fk_Servicios_Tipo_Producto1]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [fk_usuario_rol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Rol] ([id_rol])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [fk_usuario_rol]
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD FOREIGN KEY([id_estado])
REFERENCES [dbo].[Estados] ([id_estado])
GO
/****** Object:  StoredProcedure [dbo].[Sp_Aumento_Intento_Bloqueo]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Rojas
-- Create date: 25/10/2017
-- Description:	Aumento de intentos para bloquear user
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Aumento_Intento_Bloqueo]
@usuario VARCHAR(20),
@intentos INT OUTPUT
AS
BEGIN
	
	UPDATE Usuario
	SET numero_intentos=numero_intentos-1
	WHERE usuario = @usuario

	SET @intentos = 0;
	SELECT @intentos = numero_intentos
	FROM Usuario
	WHERE usuario = @usuario

	IF(@intentos<=0)
	BEGIN
		UPDATE Usuario
		SET bloqueo=1,@intentos=numero_intentos=0
		WHERE usuario=@usuario
	END

END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Buscar_Cliente]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Sp_Buscar_Cliente]
@descripcion VARCHAR(45),
@id_tipocliente INT
AS
BEGIN
	SET NOCOUNT ON;

	IF (@id_tipocliente = 0)
	BEGIN
		--LISTA TODO LOS DATOS, ESTO SE DÁ CUANDO EL USUARIO INGRESA A LA INTERFACE POR
		--PRIMERA VEZ EN SU SESION.
		SELECT  C.id_natural,TC.descripcion as tipo_cliente,
				C.nombre,C.apepat,C.apemat,C.sexo,C.email,C.direccion,C.referencia,C.telefono,C.celular,C.id_estado,C.id_tipo_cliente,C.dni, ES.estado as estado_descripcion
		FROM Cli_Natural C  JOIN Tipo_Cliente TC 
		ON C.id_tipo_cliente = TC.id_tipo_cliente  JOIN Estados ES
		ON ES.id_estado= C.id_estado
		WHERE ES.estado='ACTIVO'
	END
	ELSE
	BEGIN
		--POR OTRO LADO, AQUI RECORRERÁ CUANDO EL USUARIO INGRESE ALMENOS UN
		--FILTRO DE BUSQUEDA.
		SELECT  C.id_natural,TC.descripcion as tipo_cliente,
				C.nombre,C.apepat,C.apemat,C.sexo,C.email,C.direccion,C.referencia,C.telefono,C.celular,C.id_estado,C.id_tipo_cliente,C.dni, ES.estado as estado_descripcion
		FROM Cli_Natural C  JOIN Tipo_Cliente TC 
		ON C.id_tipo_cliente = TC.id_tipo_cliente  JOIN Estados ES
		ON ES.id_estado= C.id_estado
		WHERE((  C.nombre LIKE '%' + @descripcion + '%'
				OR C.direccion LIKE '%' + @descripcion + '%'
				OR TC.descripcion LIKE '%' + @descripcion + '%'
				OR C.dni LIKE '%' + @descripcion + '%'
				OR @descripcion IS NULL
			 )
		AND TC.id_tipo_cliente= @id_tipocliente)
		AND  ES.estado='ACTIVO'
	END

END
GO
/****** Object:  StoredProcedure [dbo].[Sp_Buscar_Empleado]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Rojas
-- Create date: 27/10/2017
-- Description:	Buscar Empleados Grilla
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Buscar_Empleado]
@descripcion VARCHAR(45),
@id_tipoempleado INT
AS
BEGIN
	SET NOCOUNT ON;

	IF (@id_tipoempleado = 0)
	BEGIN
		--LISTA TODO LOS DATOS, ESTO SE DÁ CUANDO EL USUARIO INGRESA A LA INTERFACE POR
		--PRIMERA VEZ EN SU SESION.
		SELECT  E.id_empleado, E.nombres, E.ape_paterno, E.ape_materno,
				E.dni,E.sexo, E.departamento,E.provincia,E.distrito,E.direccion,
				E.email, E.estado_civil,E.telefono,E.celular,CONVERT(VARCHAR,E.fecha_nacimiento,103) fecha_nacimiento,
				E.id_estado,E.id_tipo_empleado,
				TE.descripcion as tipo_empleado,ES.estado as estado_descripcion
		FROM Empleado E INNER JOIN Tipo_Empleado TE 
		ON E.id_tipo_empleado = TE.id_tipo_empleado INNER JOIN Estados ES
		ON ES.id_estado= E.id_estado
		WHERE ES.estado='ACTIVO'
	END
	ELSE
	BEGIN
		--POR OTRO LADO, AQUI RECORRERÁ CUANDO EL USUARIO INGRESE ALMENOS UN
		--FILTRO DE BUSQUEDA.
		SELECT  E.id_empleado, E.nombres, E.ape_paterno, E.ape_materno,
				E.dni,E.sexo, E.departamento,E.provincia,E.distrito,E.direccion,
				E.email, E.estado_civil,E.telefono,E.celular,CONVERT(VARCHAR,E.fecha_nacimiento,103) fecha_nacimiento,
				E.id_estado,E.id_tipo_empleado,
				TE.descripcion as tipo_empleado,ES.estado as estado_descripcion
		FROM Empleado E INNER JOIN Tipo_Empleado TE 
		ON E.id_tipo_empleado = TE.id_tipo_empleado INNER JOIN Estados ES
		ON ES.id_estado= E.id_estado
		WHERE((  E.dni LIKE '%' + @descripcion + '%'
				OR E.provincia LIKE '%' + @descripcion + '%'
				OR E.distrito LIKE '%' + @descripcion + '%'
				OR E.direccion LIKE '%' + @descripcion + '%'
				OR TE.descripcion LIKE '%' + @descripcion + '%'
				OR (E.nombres+' '+E.ape_paterno+' '+E.ape_materno) LIKE '%' + @descripcion + '%'
				OR @descripcion IS NULL
			 )
		AND TE.id_tipo_empleado= @id_tipoempleado)
		AND  ES.estado='ACTIVO'
	END

END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Lista_Usuario]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Rojas
-- Create date: 24/10/2017
-- Description:	Lista Usuario Prueba
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Lista_Usuario]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT usuario,bloqueo,numero_intentos FROM Usuario

END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Listar_Cliente]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[Sp_Listar_Cliente]
as
select * from dbo.Cli_Natural

GO
/****** Object:  StoredProcedure [dbo].[Sp_Registrar_Cliente_Juridico]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Rojas
-- Create date: 04/11/2017
-- Description:	Registra clientes de tipo juridico, tambien valida
--				si es el el nro ruc repite o ya se encuentra registrada.
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Registrar_Cliente_Juridico]
@razonSocial VARCHAR(45),
@nComercial VARCHAR(45),
@ruc CHAR(11),
@email VARCHAR(100),
@direccion VARCHAR(100),
@referencia VARCHAR(100),
@telefono1 VARCHAR(10),
@telefono2 VARCHAR(10),
@id_tipo_cliente INT
AS
BEGIN
	
	DECLARE @ruc_validar VARCHAR(8)
	SET @ruc_validar = (SELECT 1 FROM Cli_Juridico WHERE ruc = @ruc)

	IF(@ruc_validar IS NULL)
	BEGIN
		DECLARE @id_estado INT
		SET @id_estado = (SELECT id_estado FROM Estados WHERE estado = 'ACTIVO')

		INSERT INTO Cli_Juridico(
			razonSocial,
            nComercial,
            ruc,
            email,
            direccion,
            referencia,
            telefono1,
            telefono2,
            id_tipo_cliente,
            id_estado)
		VALUES(
			@razonSocial,
			@nComercial,
			@ruc,
			@email,
			@direccion,
			@referencia,
			@telefono1,
			@telefono2,
			@id_tipo_cliente,
			@id_estado)
	END
END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Registrar_Cliente_Natural]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sp_Registrar_Cliente_Natural]
@nombre	VARCHAR(45),
@ape_paterno	VARCHAR(45),
@ape_materno	VARCHAR(45),
@dni	VARCHAR(8),
@sexo	CHAR(1),
@email	VARCHAR(100),
@direccion	VARCHAR(100),
@referencia	VARCHAR(100),
@telefono	VARCHAR(10),
@celular	VARCHAR(10),
@id_tipo_cliente INT
AS
BEGIN
	
	DECLARE @dni_validar VARCHAR(8)
	SET @dni_validar = (SELECT 1 FROM Cli_Natural WHERE dni = @dni)

	IF(@dni_validar IS NULL)
	BEGIN
		DECLARE @id_estado INT
		SET @id_estado = (SELECT id_estado FROM Estados WHERE estado = 'ACTIVO')

		INSERT INTO Cli_Natural(
				nombre,
				apepat,
				apemat,
				dni,sexo,
				email,
				direccion,
				referencia,
				telefono,
				celular,
				id_estado,
				id_tipo_cliente)
		 VALUES( 
				UPPER(@nombre),
				UPPER(@ape_paterno) ,
				UPPER(@ape_materno),
				@dni,
				UPPER(@sexo),
				UPPER(@email),
				UPPER(@direccion),
				UPPER(@referencia),
				UPPER(@telefono),
				UPPER(@celular),
				@id_estado,
				@id_tipo_cliente
				)
		END
END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Registrar_Empleado]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Rojas
-- Create date: 01/11/2017
-- Description:	Registra Empleados 
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Registrar_Empleado]
@nombres	VARCHAR(45),
@ape_paterno	VARCHAR(45),
@ape_materno	VARCHAR(45),
@dni	VARCHAR(8),
@sexo	CHAR(1),
@departamento	VARCHAR(45),
@provincia	VARCHAR(45),
@distrito	VARCHAR(45),
@direccion	VARCHAR(45),
@email	VARCHAR(45),
@estado_civil	VARCHAR(10),
@telefono	VARCHAR(10),
@celular	VARCHAR(10),
@fecha_nacimiento	DATETIME,
--@foto VARBINARY(8000)
@id_tipo_empleado INT
AS
BEGIN
	
	DECLARE @dni_validar VARCHAR(8)
	SET @dni_validar = (SELECT 1 FROM Empleado WHERE dni = @dni)

	IF(@dni_validar IS NULL)
	BEGIN
		DECLARE @id_estado INT
		SET @id_estado = (SELECT id_estado FROM Estados WHERE estado = 'ACTIVO')

		INSERT INTO Empleado(
				nombres,
				ape_paterno,
				ape_materno,
				dni,sexo,
				departamento,
				provincia,
				distrito,
				direccion,
				email,
				estado_civil,
				telefono,
				celular,
				fecha_nacimiento,
				--foto,
				id_estado,id_tipo_empleado)
		 VALUES( 
				UPPER(@nombres),
				UPPER(@ape_paterno) ,
				UPPER(@ape_materno),
				@dni,
				UPPER(@sexo),
				UPPER(@departamento),
				UPPER(@provincia),
				UPPER(@distrito),
				UPPER(@direccion),
				UPPER(@email),
				UPPER(@estado_civil),
				UPPER(@telefono),
				UPPER(@celular),
				@fecha_nacimiento,
				--@foto,
				@id_estado,
				@id_tipo_empleado
				)
		END
END

GO
/****** Object:  StoredProcedure [dbo].[Sp_Validar_Logeo]    Script Date: 4/11/2017 09:04:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Carlos Rojas
-- Create date: 25/10/2017
-- Description:	Valida Logeo si las credenciales estan incorrectas,
--				devolverá algunos datos necesarios del usuario para que en
--				el componente sepa que notificarle al USER desea ingresar al sistema.
-- =============================================
CREATE PROCEDURE [dbo].[Sp_Validar_Logeo]
@usuario VARCHAR(20)
AS
BEGIN
	
	SELECT  U.id_usuario,U.usuario,U.contrasena,U.bloqueo,U.numero_intentos,
			U.id_rol,R.descripcion AS descripcion_rol 
    FROM Usuario U INNER JOIN Rol R
    ON U.id_rol = R.id_rol
    WHERE U.usuario = @usuario

END

GO
USE [master]
GO
ALTER DATABASE [DB_A2CC24_CIVY] SET  READ_WRITE 
GO
