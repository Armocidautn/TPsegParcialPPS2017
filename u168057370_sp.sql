
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 28-02-2019 a las 13:18:43
-- Versión del servidor: 10.1.22-MariaDB
-- Versión de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `u168057370_sp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE IF NOT EXISTS `asistencia` (
  `fecha` varchar(50) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `presente_ausente` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_comision` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`fecha`, `id_alumno`, `presente_ausente`, `id_curso`, `id_comision`) VALUES
('2017-07-29', 42, 'A', 208, 1),
('2017-07-29', 40, 'P', 208, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE IF NOT EXISTS `comisiones` (
  `id_comision` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_comision`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

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

CREATE TABLE IF NOT EXISTS `cuestionarios` (
  `id_cuestionario` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(150) NOT NULL,
  `tipo_respuesta` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `nombre_profesor` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cuestionario`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `cuestionarios`
--

INSERT INTO `cuestionarios` (`id_cuestionario`, `pregunta`, `tipo_respuesta`, `id_curso`, `nombre_profesor`) VALUES
(1, 'QUE LE PARECEN LOS CONTENIDOS DEL CURSO DE PROGRAMACION1?', 'opcional', 208, 'Octavio'),
(2, 'COMO CALIFICARIA LA CALIDAD DEL CURSO DE PROGRAMACION2?', 'opcional', 209, 'Octavio'),
(3, 'Fjdjdb', 'opcional', 210, 'Octavio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_curso` varchar(50) NOT NULL,
  `dias` varchar(100) NOT NULL,
  `horarios` varchar(100) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=212 ;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `descripcion_curso`, `dias`, `horarios`) VALUES
(208, 'PROGRAMACION1', 'LUNES-MIERCOLES', '18:30/22:30'),
(209, 'PROGRAMACION2', 'LUNES-VIERNES', '18:30/22:30'),
(210, 'PROGRAMACION3', 'MARTES-JUEVES', '18:30/22:30'),
(211, 'PROGRAMACION4', 'JUEVES-VIERNES', '18:30/22:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_comision`
--

CREATE TABLE IF NOT EXISTS `curso_comision` (
  `id_curso1` int(11) NOT NULL,
  `id_comision1` int(11) NOT NULL,
  KEY `id_curso` (`id_curso1`),
  KEY `id_comision` (`id_comision1`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso_comision`
--

INSERT INTO `curso_comision` (`id_curso1`, `id_comision1`) VALUES
(208, 2),
(208, 1),
(209, 4),
(209, 3),
(210, 5),
(210, 6),
(211, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE IF NOT EXISTS `respuestas` (
  `id_respuesta` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(50) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `id_cuestionario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  PRIMARY KEY (`id_respuesta`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id_respuesta`, `pregunta`, `respuesta`, `id_cuestionario`, `id_usuario`, `id_curso`) VALUES
(37, 'COMO CALIFICARIA LA CALIDAD DEL CURSO DE PROGRAMAC', 'bueno', 2, 40, 209),
(36, 'QUE LE PARECEN LOS CONTENIDOS DEL CURSO DE PROGRAM', 'bueno', 1, 40, 208);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `perfil` varchar(50) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombre`, `apellido`, `email`, `password`, `perfil`) VALUES
(4, 'pedro', 'perez', 'pedro@mail.com', 'pedro123', 'Administrador'),
(5, 'Jose', 'Ramirez', 'jose@mail.com', 'shhshs', 'Administrativo'),
(18, 'Octavio', 'Villegas', 'octavio@mail.com', 'octaviomail', 'Profesor'),
(42, 'Ignacio', 'Fernandez', 'ignacio@mail.com', '1234', 'Alumno'),
(43, 'Emiliano', 'Jiroa', 'emiliano@mail.com', 'dddf', 'Alumno'),
(36, 'Alejandro', 'Isaias', 'alejandro@mail.com', 'nazamail', 'Alumno'),
(40, 'Manuel', 'Ramos', 'manu@mail.com', '12345', 'Alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_comision`
--

CREATE TABLE IF NOT EXISTS `usuarios_comision` (
  `id_usuarios1` int(11) NOT NULL,
  `id_comision2` int(11) NOT NULL,
  KEY `id_comision2` (`id_comision2`),
  KEY `id_usuarios1` (`id_usuarios1`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_comision`
--

INSERT INTO `usuarios_comision` (`id_usuarios1`, `id_comision2`) VALUES
(40, 3),
(42, 3),
(42, 1),
(41, 3),
(40, 1),
(43, 5),
(43, 9),
(40, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_curso`
--

CREATE TABLE IF NOT EXISTS `usuarios_curso` (
  `id_usuarios2` int(11) NOT NULL,
  `id_curso2` int(11) NOT NULL,
  KEY `id_usuarios2` (`id_usuarios2`),
  KEY `id_curso2` (`id_curso2`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_curso`
--

INSERT INTO `usuarios_curso` (`id_usuarios2`, `id_curso2`) VALUES
(41, 209),
(40, 208),
(42, 208),
(42, 209),
(40, 209),
(43, 210),
(43, 211),
(40, 210);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
