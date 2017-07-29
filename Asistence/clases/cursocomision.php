<?php
require_once"AccesoDatos.php";

	class CursoComision
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_curso1;
		 	public $id_comision1;
		
		//--------------------------------------------------------------------------------//

		//--------------------------------------------------------------------------------//
		//--GETTERS Y SETTERS
			public function GetId()
			{
				return $this->id_curso1;
			}
		
			public function SetId($valor)
			{
				$this->id_curso1 = $valor;
			}
			public function GetDescripcion()
			{
				return $this->id_comision1;
			}
		
			public function SetDescripcion($valor)
			{
				$this->id_comision1 = $valor;
			}


		//--------------------------------------------------------------------------------//
		//--CONSTRUCTOR
			public function __construct($relacion)
			{
	
					$this->id_curso1 = $relacion['id_curso'];
					$this->id_comision1 = $relacion['id_comision'];
					
				
				
			}
		//--------------------------------------------------------------------------------//

		//--TOSTRING	
		  	public function ToString()
			{
			  	return $this->id_curso1." - ".$this->id_comision1." \r\n";
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
	
			public static function TraerTodo(){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_curso1 FROM curso_comision ");
		$consulta->execute();
		$cursocomision= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $cursocomision;
			}
						public static function TraerIdComisionesCurso($id){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `comisiones` INNER JOIN curso_comision on comisiones.id_comision=curso_comision.id_comision1 WHERE curso_comision.id_curso1=:id
");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$cursocomision= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $cursocomision;
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
	public function AgregarRelacion()
	{
       


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
	    
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `curso_comision`(`id_curso1`, `id_comision1`) VALUES (:id_curso1,:id_comision1)");
		$consulta->bindValue(':id_curso1', $this->id_curso1, PDO::PARAM_INT);
		$consulta->bindValue(':id_comision1', $this->id_comision1, PDO::PARAM_INT);
		$consulta->execute();		
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}
		public function ModificarRelacion()
	{
       


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
	    
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE  `curso_comision`SET id_comision1=:id_comision1 WHERE id_curso1=:id_curso1 ");
		$consulta->bindValue(':id_curso1', $this->id_curso1, PDO::PARAM_INT);
		$consulta->bindValue(':id_comision1', $this->id_comision1, PDO::PARAM_INT);
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
				public static function BorrarCursoComisionId($id){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM curso_comision WHERE id_curso1=:id_curso1");				
		$consulta->bindValue(':id_curso1',$id, PDO::PARAM_INT);
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