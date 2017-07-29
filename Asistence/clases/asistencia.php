<?php
require_once"AccesoDatos.php";

	class Asistencia
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_alumno;
		  	public $fecha;
			public $presente_ausente;
			public $id_comision;  
			public $id_curso;
		//--------------------------------------------------------------------------------//

		//--------------------------------------------------------------------------------//
		//--GETTERS Y SETTERS
			public function GetId()
			{
				return $this->id_user;
			}
			public function GetNombre()
			{
				return $this->nombre;
			}
			public function GetApellido()
			{
				return $this->apellido;
			}
			public function GetEmail()
			{
				return $this->email;
			}
		
			public function GetPerfil()
			{
				return $this->perfil;
			}
			public function SetId($valor)
			{
				$this->id_user = $valor;
			}
			public function SetNombre($valor)
			{
				$this->nombre = $valor;
			}
			public function SetApellido($valor)
			{
				$this->apellido = $valor;
			}
			public function SetEmail($valor)
			{
				$this->email = $valor;
			}
			
				public function SetPerfil($valor)
			{
				$this->perfil = $valor;
			}


		//--------------------------------------------------------------------------------//
		//--CONSTRUCTOR
			public function __construct($user)
			{
	
					$this->id_alumno = $user['id_alumno'];
					$this->fecha =  $user['fecha'];
					$this->presente_ausente =  $user['presente_ausente'];
					$this->id_comision =  $user['id_comision'];
					$this->id_curso =  $user['id_curso'];
				
				
			}
		//--------------------------------------------------------------------------------//

		//--TOSTRING	
		  	public function ToString()
			{
			  	return $this->id_user." - ".$this->nombre." - ".$this->apellido." - ".$this->email." - ".$this->perfil."\r\n";
			}
		//--------------------------------------------------------------------------------//
		//--------------------------------------------------------------------------------//


		//--METODO DE CLASE
			public static function TraerUnUsuarioPorId($id){
				$conexion = self::CrearConexion();
				$sql = "SELECT U.id, U.nombre, U.apellido, U.email, U.perfil, U.sexo
						FROM usuarios U
						WHERE U.id = :id";
				$consulta = $conexion->prepare($sql);
				$consulta->bindValue(":id", $id, PDO::PARAM_INT);
				$consulta->execute();
				$usuario = $consulta->fetchObject('Usuario');
				return $usuario;
			}
		   public static  function TraerUnUsuarioPorEmail($user){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email=:e");
		$consulta->bindValue(':e',$user['email'], PDO::PARAM_STR);
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			
			}
			   public static  function TraerListaPorComision($idCurso,$idComision){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios INNER JOIN usuarios_curso ON usuarios.id_user=usuarios_curso.id_usuarios2 INNER JOIN usuarios_comision on usuarios.id_user=usuarios_comision.id_usuarios1 INNER JOIN cursos on cursos.id_curso=usuarios_curso.id_curso2 WHERE cursos.id_curso={$idCurso} AND usuarios_comision.id_comision2={$idComision}
 ");
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
					   public static  function TraerListaAsistenciaPorCursoComision($idCurso,$idComision){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM asistencia WHERE id_curso={$idCurso} AND id_comision={$idComision}
 ");
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
			

					   public static  function TraerIdUsuarioComision($id){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_user FROM `usuarios` INNER JOIN usuarios_curso on usuarios.id_user=usuarios_curso.id_usuarios2 INNER JOIN cursos on cursos.id_curso=usuarios_curso.id_curso2 WHERE cursos.id_curso=$id ");
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
			public static function TraerTodosUsuarios(){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios ");
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
				public static function TraerUsuariosAlumno(){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios where usuarios.perfil='Alumno' ");
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
			public static function TraerUsuarioLogueado($usuario){
				$conexion = self::CrearConexion();
				$sql = "SELECT U.id, U.nombre, U.apellido, U.email, U.perfil, U.sexo
						FROM usuarios U
						WHERE U.email = :email AND U.password = :pass";
				$consulta = $conexion->prepare($sql);
				$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
				$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
				$consulta->execute();
				$usuarioLogueado = $consulta->fetchObject('Usuario');
				return $usuarioLogueado;
			}
	public function AgregarAsistencia()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO asistencia (fecha,id_alumno,presente_ausente,id_curso,id_comision) VALUES(:fecha,:id_alumno,:presente_ausente,:id_curso,:id_comision)");
		$consulta->bindValue(':fecha', $this->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':id_alumno', $this->id_alumno, PDO::PARAM_INT);
				$consulta->bindValue(':presente_ausente', $this->presente_ausente, PDO::PARAM_STR);
		$consulta->bindValue(':id_curso', $this->id_curso, PDO::PARAM_INT);
		$consulta->bindValue(':id_comision', $this->id_comision, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}
			public static function Modificar($usuario){
				$conexion = self::CrearConexion();
				$sql = "UPDATE usuarios
						SET nombre = :nombre, apellido = :apellido, email = :email, sexo = :sexo, perfil = :perfil
						WHERE id = :id"; //, password = :pass
				$consulta = $conexion->prepare($sql);
				$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
				$consulta->bindValue(":apellido", $usuario->apellido, PDO::PARAM_STR);
				$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
				$consulta->bindValue(":sexo", $usuario->sexo, PDO::PARAM_STR);
				$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
				//$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
				$consulta->bindValue(":id", $usuario->id, PDO::PARAM_INT);
				$consulta->execute();
				$cantidad = $consulta->rowCount();
				return $cantidad;
			}
			public static function BorrarUsuarioId($id){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM asistencia WHERE id_alumno=:id_alumno");				
		$consulta->bindValue(':id_alumno',$id, PDO::PARAM_INT);
		$retorno=$consulta->execute();		
		
		return $retorno;
			}
					public static function ModificarUsuarioPorId($id,$nombre,$apellido,$mail){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET nombre=:nombre,apellido=:apellido,email=:email  WHERE id_user=:id_user");				
		$consulta->bindValue(':id_user',$id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido',$apellido, PDO::PARAM_STR);
		$consulta->bindValue(':email',$mail, PDO::PARAM_STR);
	
		$retorno=$consulta->execute();		
		
		return $retorno;
			}

			public static function CrearConexion(){
				try
				{
					$conexion = new PDO("mysql:host=localhost;dbname=pizzeria;charset=utf8;",'root','');
					return $conexion;
				}
				catch (Exception $e) {
					print_r("Error: " . $e->GetMessage());
					die();
					return;
				}
			}
		//--------------------------------------------------------------------------------//

	}


?>