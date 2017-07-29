<?php
require_once"AccesoDatos.php";

	class Usuario
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_user;
		 	public $nombre;
		  	public $apellido;
		  	public $email;
		  	public $perfil;
		  	public $password;
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
	
					$this->nombre = $user['nombre'];
					$this->password =  $user['password'];
					$this->apellido =  $user['apellido'];
					$this->email =  $user['email'];
					$this->perfil =  $user['perfil'];
				
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
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios INNER JOIN usuarios_curso ON usuarios.id_user=usuarios_curso.id_usuarios2 INNER JOIN usuarios_comision on usuarios.id_user=usuarios_comision.id_usuarios1 INNER JOIN cursos on cursos.id_curso=usuarios_curso.id_curso2 WHERE cursos.id_curso={$idCurso} AND usuarios_comision.id_comision2={$idComision} AND usuarios.perfil='Alumno'
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
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios where usuarios.perfil='Profesor'or usuarios.perfil='Alumno'  ");
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
	public function AgregarUsuario()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (nombre,apellido,email,password,perfil) VALUES(:nombre,:apellido,:email,:password,:perfil)");
		$consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $this->apellido, PDO::PARAM_STR);
				$consulta->bindValue(':email', $this->email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $this->password, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
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
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM usuarios WHERE id_user=:id_user");				
		$consulta->bindValue(':id_user',$id, PDO::PARAM_INT);
		$retorno=$consulta->execute();		
		
		return $retorno;
			}

   			public static function CambiarPassword($clave,$idUser){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET password=:password  WHERE id_user=:id_user");				
		$consulta->bindValue(':id_user',$idUser, PDO::PARAM_INT);	
		$consulta->bindValue(':password',$clave, PDO::PARAM_STR);	
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