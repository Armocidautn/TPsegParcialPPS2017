<?php
require_once"AccesoDatos.php";

	class Cursos
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_curso;
		 	public $descripcion_curso;
			public $dias;
			public $horarios;
		
		//--------------------------------------------------------------------------------//

		//--------------------------------------------------------------------------------//
		//--GETTERS Y SETTERS
			public function GetId()
			{
				return $this->id_curso;
			}
		
			public function SetId($valor)
			{
				$this->id_curso = $valor;
			}
			
			public function GetDescripcion()
			{
				return $this->descripcion_curso;
			}
		
			public function SetDescripcion($valor)
			{
				$this->descripcion_curso = $valor;
			}


		//--------------------------------------------------------------------------------//
		//--CONSTRUCTOR
			public function __construct($curso)
			{
	
					$this->descripcion_curso = $curso['nombre'];
					$this->dias=$curso['dias'];
					$this->horarios=$curso['horario'];
				
				
			}
			
		//--------------------------------------------------------------------------------//

		//--TOSTRING	
		  	public function ToString()
			{
			  	return $this->id_user." - ".$this->descripcion_curso." - ".$this->dias." - ".$this->horarios." \r\n";
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
				   public static  function TraerCursos(){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM cursos");
	
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
			
			public static function TraerTodosLosUsuarios(){
				$conexion = self::CrearConexion();
				$sql = "SELECT U.id, U.nombre, U.apellido, U.email, U.perfil, U.sexo
						FROM usuarios U";
	    		$consulta = $conexion->prepare($sql);
				$consulta->execute();
				$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Usuario');
				return $usuarios;
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
	public function AgregarCurso()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO cursos (descripcion_curso,dias,horarios) VALUES(:descripcion_curso,:dias,:horarios)");
		$consulta->bindValue(':descripcion_curso', $this->descripcion_curso, PDO::PARAM_STR);
		$consulta->bindValue(':dias', $this->dias, PDO::PARAM_STR);
		$consulta->bindValue(':horarios', $this->horarios, PDO::PARAM_STR);
		
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}
		public static function ModificarNombreCurso($id,$nombre){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE cursos SET descripcion_curso=:descripcion_curso  WHERE id_curso=:id_curso");				
		$consulta->bindValue(':id_curso',$id, PDO::PARAM_INT);
		$consulta->bindValue(':descripcion_curso',$nombre, PDO::PARAM_STR);
	
		$retorno=$consulta->execute();		
		
		return $retorno;
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
			public static function BorrarCursoId($id){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM cursos WHERE id_curso=:id_curso");				
		$consulta->bindValue(':id_curso',$id, PDO::PARAM_INT);
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