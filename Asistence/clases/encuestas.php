<?php
require_once"AccesoDatos.php";

	class Encuesta
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_cuestionario;
		 	public $pregunta;
			public $tipo_respuesta;
			public $id_curso;
			public $nombre_profesor;
			
			
		
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
			public function __construct($encuesta)
			{
	
					$this->pregunta=$encuesta['pregunta'];
					$this->id_curso=$encuesta['idcurso'];
					$this->tipo_respuesta=$encuesta['opcional'];
					$this->nombre_profesor=$encuesta['nombreProfesor'];
				
				
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
				public static function BorrarEncuesta($id){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM cuestionarios WHERE id_cuestionario=:id_cuestionario");				
		$consulta->bindValue(':id_cuestionario',$id, PDO::PARAM_INT);
		$retorno=$consulta->execute();		
		
		return $retorno;
			}
		   public static  function TraerUnUsuarioPorEmail($user){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email=:e");
		$consulta->bindValue(':e',$user['email'], PDO::PARAM_STR);
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}
				   public static  function TraerEncuestas(){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM cuestionarios");
	
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
			}

				public static function ModificarTipoRespuesta($id,$tipo_respuesta){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE cuestionarios SET tipo_respuesta=:tipo_respuesta  WHERE id_cuestionario=:id_cuestionario");				
		$consulta->bindValue(':id_cuestionario',$id, PDO::PARAM_INT);
		$consulta->bindValue(':tipo_respuesta',$tipo_respuesta, PDO::PARAM_STR);
	
		$retorno=$consulta->execute();		
		
		return $retorno;
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
	public function AgregarEncuesta()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO cuestionarios (pregunta,tipo_respuesta,id_curso,nombre_profesor) VALUES(:pregunta,:tipo_respuesta,:id_curso,:nombre_profesor)");
		$consulta->bindValue(':pregunta', $this->pregunta, PDO::PARAM_STR);
		$consulta->bindValue(':tipo_respuesta', $this->tipo_respuesta, PDO::PARAM_STR);
		$consulta->bindValue(':id_curso', $this->id_curso, PDO::PARAM_STR);
		$consulta->bindValue(':nombre_profesor', $this->nombre_profesor, PDO::PARAM_STR);
		
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