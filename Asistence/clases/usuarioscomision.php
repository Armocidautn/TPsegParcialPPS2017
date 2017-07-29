<?php
require_once"AccesoDatos.php";

	class UsuariosComision
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_usuarios1;
		 	public $id_comision2;
		
		//--------------------------------------------------------------------------------//

		//--------------------------------------------------------------------------------//
		//--GETTERS Y SETTERS
			public function GetId()
			{
				return $this->id_usuarios1;
			}
		
			public function SetId($valor)
			{
				$this->id_usuarios1 = $valor;
			}
			public function GetDescripcion()
			{
				return $this->id_comision2;
			}
		
			public function SetDescripcion($valor)
			{
				$this->id_comision2 = $valor;
			}


		//--------------------------------------------------------------------------------//
		//--CONSTRUCTOR
			public function __construct($relacion)
			{
	
					$this->id_usuarios1 = $relacion['id_usuarios1'];
					$this->id_comision2 = $relacion['id_comision2'];
					
				
				
			}
		//--------------------------------------------------------------------------------//

		//--TOSTRING	
		  	public function ToString()
			{
			  	return $this->id_usuarios1." - ".$this->id_comision2." \r\n";
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
	
			public static function TraerIdUsuariosComision(){
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_usuarios1 FROM usuarios_comision ");
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
	    
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `usuarios_comision`(`id_usuarios1`, `id_comision2`) VALUES (:id_usuarios1,:id_comision2)");
		$consulta->bindValue(':id_usuarios1', $this->id_usuarios1, PDO::PARAM_INT);
		$consulta->bindValue(':id_comision2', $this->id_comision2, PDO::PARAM_INT);
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
			
			public static function BorrarRelacionAlumnoComision($id){

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM `usuarios_comision` WHERE usuarios_comision.id_usuarios1=$id");
		$retorno=$consulta->execute();		

		return $retorno;
			}
			
			public static function Eliminar($id){
				$conexion = self::CrearConexion();
				$sql = "DELETE FROM usuarios
						WHERE id = :id";
				$consulta = $conexion->prepare($sql);
				$consulta->bindValue(":id", $id, PDO::PARAM_INT);
				$consulta->execute();
				$cantidad = $consulta->rowCount();
				return $cantidad;
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