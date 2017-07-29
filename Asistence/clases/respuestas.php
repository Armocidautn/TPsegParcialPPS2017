<?php
require_once"AccesoDatos.php";

	class Respuesta
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			
			public $id_cuestionario;
		 	public $pregunta;
			public $respuesta;
			public $id_usuario;
			public $id_curso;
			
			
			
		
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
			public function __construct($respuesta)
			{
	
					$this->pregunta=$respuesta['pregunta'];
					$this->respuesta=$respuesta['respuesta'];
					$this->id_usuario=$respuesta['id_usuario'];
					$this->id_cuestionario=$respuesta['id_cuestionario'];
					$this->id_curso=$respuesta['id_curso'];
				
				
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
				   public static  function TraerRespuestas(){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM respuestas");
	
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
						public static function TraerEncuestasPorCurso($id){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM cuestionarios where id_curso={$id}");
		$consulta->execute();
		$cursocomision= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $cursocomision;
			}

				public static function TraerRespuestasPorUsuario($id){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM respuestas where id_usuario={$id}");
		$consulta->execute();
		$cursocomision= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $cursocomision;
			}

		public static function TraerRespuestasPorCurso($id){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM respuestas where id_curso={$id}");
		$consulta->execute();
		$cursocomision= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $cursocomision;
			}


	public function AgregarRespuesta()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO respuestas (pregunta,respuesta,id_usuario,id_cuestionario,id_curso) VALUES(:pregunta,:respuesta,:id_usuario,:id_cuestionario,:id_curso)");
		$consulta->bindValue(':pregunta', $this->pregunta, PDO::PARAM_STR);
		$consulta->bindValue(':respuesta', $this->respuesta, PDO::PARAM_STR);
		$consulta->bindValue(':id_usuario', $this->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':id_cuestionario', $this->id_cuestionario, PDO::PARAM_INT);
		$consulta->bindValue(':id_curso', $this->id_curso, PDO::PARAM_INT);
		
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