-- MySQL Script generated by MySQL Workbench
-- 12/01/17 13:50:12
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Iuteb_asignaturas
-- -----------------------------------------------------
-- Base de datos para aplicacion de asistencias del IUTEB
-- 
-- Luis Torres
-- Michel Novellino
-- Adrian Flores

-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`malla_curricular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`malla_curricular` (
  `id_malla` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  PRIMARY KEY (`id_malla`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NULL,
  `contrasena` VARCHAR(50) NULL,
  `nombre_completo` VARCHAR(45) NULL,
  `cedula` INT(50) NULL,
  `correo` VARCHAR(45) NULL,
  `fecha_ingreso` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `telefono` VARCHAR(450) NULL,
  `id_malla` INT NULL,
  `estado` ENUM('0', '1') NULL DEFAULT '1',
  `tipo` ENUM('Estudiante', 'Administrador', 'Profesor') NULL DEFAULT 'Estudiante',
  `color_ui` VARCHAR(40) NULL DEFAULT 'positive',
  `gravatar` VARCHAR(450) NULL DEFAULT 'hombre',
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC),
  INDEX `user_id_malla_idx` (`id_malla` ASC),
  CONSTRAINT `user_id_malla`
    FOREIGN KEY (`id_malla`)
    REFERENCES `Iuteb_asignaturas`.`malla_curricular` (`id_malla`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`basededatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`basededatos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(100) NULL,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `filename_UNIQUE` (`filename` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`asignaturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`asignaturas` (
  `id_asignatura` INT NOT NULL AUTO_INCREMENT,
  `nombre_asig` VARCHAR(45) NULL,
  `trimestre` INT NULL,
  `id_malla` INT NULL,
  PRIMARY KEY (`id_asignatura`),
  INDEX `m_id_malla_idx` (`id_malla` ASC),
  CONSTRAINT `m_id_malla`
    FOREIGN KEY (`id_malla`)
    REFERENCES `Iuteb_asignaturas`.`malla_curricular` (`id_malla`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`secciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`secciones` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `id_asignatura` INT NULL,
  `codigo` VARCHAR(45) NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id_seccion`),
  INDEX `s_id_materia_idx` (`id_asignatura` ASC),
  INDEX `s_id_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `s_id_asignatura`
    FOREIGN KEY (`id_asignatura`)
    REFERENCES `Iuteb_asignaturas`.`asignaturas` (`id_asignatura`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `s_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Iuteb_asignaturas`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`publicaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`publicaciones` (
  `id_publicacion` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `id_seccion` INT NULL,
  `id_usuario` INT NULL,
  `fecha_publicacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre_archivo` VARCHAR(100) NULL DEFAULT 'grabatar.jpg',
  PRIMARY KEY (`id_publicacion`),
  INDEX `p_id_usuario_idx` (`id_usuario` ASC),
  INDEX `p_id_seccion_idx` (`id_seccion` ASC),
  CONSTRAINT `p_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Iuteb_asignaturas`.`usuarios` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `p_id_seccion`
    FOREIGN KEY (`id_seccion`)
    REFERENCES `Iuteb_asignaturas`.`secciones` (`id_seccion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`app_config`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`app_config` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `versionApp` VARCHAR(45) NULL,
  `fecha_creaccion` DATE NULL,
  `descripcion` VARCHAR(900) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`alumnos_has_asistencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`alumnos_has_asistencias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_seccion` INT NULL,
  `id_usuario` INT NULL,
  `fecha` DATE NULL,
  `asistio` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `a_has_id_usuarios_idx` (`id_usuario` ASC),
  INDEX `a_has_id_seccion_idx` (`id_seccion` ASC),
  CONSTRAINT `a_has_id_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Iuteb_asignaturas`.`usuarios` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `a_has_id_seccion`
    FOREIGN KEY (`id_seccion`)
    REFERENCES `Iuteb_asignaturas`.`secciones` (`id_seccion`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`alumnos_has_secciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`alumnos_has_secciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(20) NULL,
  `id_seccion` INT(20) NULL,
  `estado` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `al_has_id_usuario_idx` (`id_usuario` ASC),
  INDEX `al_has_s_id_seccion_idx` (`id_seccion` ASC),
  CONSTRAINT `al_has_s_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Iuteb_asignaturas`.`usuarios` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `al_has_s_id_seccion`
    FOREIGN KEY (`id_seccion`)
    REFERENCES `Iuteb_asignaturas`.`secciones` (`id_seccion`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Iuteb_asignaturas`.`reportes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Iuteb_asignaturas`.`reportes` (
  `id_reporte` INT NOT NULL AUTO_INCREMENT,
  `nombre_reporte` VARCHAR(450) NULL,
  `desde` DATE NULL,
  `hasta` DATE NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id_reporte`),
  INDEX `re_id_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `re_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Iuteb_asignaturas`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Iuteb_asignaturas`.`malla_curricular`
-- -----------------------------------------------------
START TRANSACTION;
USE `Iuteb_asignaturas`;
INSERT INTO `Iuteb_asignaturas`.`malla_curricular` (`id_malla`, `nombre`) VALUES (1, 'Informatica');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Iuteb_asignaturas`.`usuarios`
-- -----------------------------------------------------
START TRANSACTION;
USE `Iuteb_asignaturas`;
INSERT INTO `Iuteb_asignaturas`.`usuarios` (`id_usuario`, `usuario`, `contrasena`, `nombre_completo`, `cedula`, `correo`, `fecha_ingreso`, `telefono`, `id_malla`, `estado`, `tipo`, `color_ui`, `gravatar`) VALUES (1, 'Administrador', 'SoporteGATE', 'Administrador', 000000000, 'iutebgate@gmail.com', '19-11-2017', '04128594981', 1, '1', 'Administrador', 'positive', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Iuteb_asignaturas`.`asignaturas`
-- -----------------------------------------------------
START TRANSACTION;
USE `Iuteb_asignaturas`;
INSERT INTO `Iuteb_asignaturas`.`asignaturas` (`id_asignatura`, `nombre_asig`, `trimestre`, `id_malla`) VALUES (1, 'Programacion', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Iuteb_asignaturas`.`app_config`
-- -----------------------------------------------------
START TRANSACTION;
USE `Iuteb_asignaturas`;
INSERT INTO `Iuteb_asignaturas`.`app_config` (`id`, `nombre`, `versionApp`, `fecha_creaccion`, `descripcion`) VALUES (1, 'IUTEB GATE', 'v0.1', '2017-11-21', 'Administrador de Asistencias');

COMMIT;

