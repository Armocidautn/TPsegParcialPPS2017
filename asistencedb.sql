-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2017 a las 21:49:37
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistencedb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `fecha` varchar(50) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `presente_ausente` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_comision` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`fecha`, `id_alumno`, `presente_ausente`, `id_curso`, `id_comision`) VALUES
('Thu Jul 27 2017', 34, 'A', 207, 6),
('Thu Jul 27 2017', 36, 'P', 205, 5),
('Thu Jul 27 2017', 39, 'A', 206, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE `comisiones` (
  `id_comision` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comisiones`
--

INSERT INTO `comisiones` (`id_comision`, `descripcion`) VALUES
(1, '1-A'),
(2, '1-B'),
(3, '2-A'),
(4, '2-B'),
(5, '3-A'),
(6, '3-B'),
(9, '4-A'),
(10, '5-B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionarios`
--

CREATE TABLE `cuestionarios` (
  `id_cuestionario` int(11) NOT NULL,
  `pregunta` varchar(150) NOT NULL,
  `tipo_respuesta` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `nombre_profesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cuestionarios`
--

INSERT INTO `cuestionarios` (`id_cuestionario`, `pregunta`, `tipo_respuesta`, `id_curso`, `nombre_profesor`) VALUES
(6, '¿QUE LE PARECE EL CONTENIDO DEL CURSO ARQU?', 'opcional', 206, 'Octavio'),
(7, '¿QUE LE PARECE EL CONTENIDO DEL CURSO DE PROG?', 'opcional', 205, 'Octavio'),
(8, '¿QUE OPINA DE LA CAPACIDAD DEL PROFESOR A CARGO DE CURSO DE PROGRAMAICON?', 'texto', 205, 'Octavio'),
(9, '¿QUE LE PARECEN LOS CONTENIDOS DEL CURSO DE PROGRAMACION 3?', 'opcional', 207, 'Octavio'),
(10, '¿QUE OPINA SOBRE LOS CONTENIDOS DEL CURSO DE AEQUITECTURA?', 'texto', 206, 'Octavio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `descripcion_curso` varchar(50) NOT NULL,
  `dias` varchar(100) NOT NULL,
  `horarios` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `descripcion_curso`, `dias`, `horarios`) VALUES
(205, 'PROGRAMACION4', 'LUNES-MIERCOLES-VIERNES', '18/22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_comision`
--

CREATE TABLE `curso_comision` (
  `id_curso1` int(11) NOT NULL,
  `id_comision1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso_comision`
--

INSERT INTO `curso_comision` (`id_curso1`, `id_comision1`) VALUES
(205, 5),
(205, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id_respuesta` int(11) NOT NULL,
  `pregunta` varchar(50) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `id_cuestionario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id_respuesta`, `pregunta`, `respuesta`, `id_cuestionario`, `id_usuario`, `id_curso`) VALUES
(30, '¿QUE LE PARECE EL CONTENIDO DEL CURSO ARQU?', 'bueno', 6, 7, 206),
(31, '¿QUE LE PARECE EL CONTENIDO DEL CURSO DE PROG?', 'malo', 7, 7, 205),
(33, '¿QUE LE PARECE EL CONTENIDO DEL CURSO ARQU?', 'malo', 6, 9, 206),
(34, '¿QUE LE PARECE EL CONTENIDO DEL CURSO DE PROG?', 'bueno', 7, 9, 205),
(35, '¿QUE LE PARECEN LOS CONTENIDOS DEL CURSO DE PROGRA', 'bueno', 9, 7, 207);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `perfil` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombre`, `apellido`, `email`, `password`, `perfil`) VALUES
(4, 'pedro', 'perez', 'pedro@mail.com', 'pedro123', 'Administrador'),
(5, 'Jose', 'Ramirez', 'jose@mail.com', 'jose123', 'Administrativo'),
(18, 'Octavio', 'Villegas', 'octavio@mail.com', 'octaviomail', 'Profesor'),
(19, 'Maximiliano ', 'Juarez', 'maxi@mail.com', 'maximail', 'Profesor'),
(23, 'Maximiliano', 'Neiner', 'maxineiner@mail.com', 'maxineiner', 'Profesor'),
(24, 'akshdb', 'asjd', 'asd@mail.com', 'asd', 'Profesor'),
(34, 'Nazareno', 'Echauri', 'naza@mail.com', 'nazamail', 'Alumno'),
(35, 'Adrian', 'Armocida', 'adrian@mail.com', 'nazamail', 'Alumno'),
(36, 'Jorge', 'Isaias', 'jorge@mail.com', 'nazamail', 'Alumno'),
(37, 'Miguel', 'Carpinacci', 'miguel@mail.com', 'nazamail', 'Alumno'),
(38, 'Maria', 'Espindola', 'maria@mail.com', 'nazamail', 'Alumno'),
(39, 'nazareno', 'echauri', 'naza@mail.com', 'asd', 'Alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_comision`
--

CREATE TABLE `usuarios_comision` (
  `id_usuarios1` int(11) NOT NULL,
  `id_comision2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_comision`
--

INSERT INTO `usuarios_comision` (`id_usuarios1`, `id_comision2`) VALUES
(18, 5),
(18, 6),
(23, 6),
(34, 6),
(36, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_curso`
--

CREATE TABLE `usuarios_curso` (
  `id_usuarios2` int(11) NOT NULL,
  `id_curso2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_curso`
--

INSERT INTO `usuarios_curso` (`id_usuarios2`, `id_curso2`) VALUES
(18, 205),
(36, 205);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  ADD PRIMARY KEY (`id_comision`);

--
-- Indices de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  ADD PRIMARY KEY (`id_cuestionario`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `curso_comision`
--
ALTER TABLE `curso_comision`
  ADD KEY `id_curso` (`id_curso1`),
  ADD KEY `id_comision` (`id_comision1`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id_respuesta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `usuarios_comision`
--
ALTER TABLE `usuarios_comision`
  ADD KEY `id_comision2` (`id_comision2`),
  ADD KEY `id_usuarios1` (`id_usuarios1`);

--
-- Indices de la tabla `usuarios_curso`
--
ALTER TABLE `usuarios_curso`
  ADD KEY `id_usuarios2` (`id_usuarios2`),
  ADD KEY `id_curso2` (`id_curso2`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  MODIFY `id_comision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  MODIFY `id_cuestionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;
--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso_comision`
--
ALTER TABLE `curso_comision`
  ADD CONSTRAINT `curso_comision_ibfk_1` FOREIGN KEY (`id_curso1`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `curso_comision_ibfk_2` FOREIGN KEY (`id_comision1`) REFERENCES `comisiones` (`id_comision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_comision`
--
ALTER TABLE `usuarios_comision`
  ADD CONSTRAINT `usuarios_comision_ibfk_1` FOREIGN KEY (`id_usuarios1`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_comision_ibfk_2` FOREIGN KEY (`id_comision2`) REFERENCES `comisiones` (`id_comision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_curso`
--
ALTER TABLE `usuarios_curso`
  ADD CONSTRAINT `usuarios_curso_ibfk_1` FOREIGN KEY (`id_usuarios2`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_curso_ibfk_2` FOREIGN KEY (`id_curso2`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
