<?php
require_once"AccesoDatos.php";

	class Comisiones
	{
		//--------------------------------------------------------------------------------//
		//--ATRIBUTOS
			public $id_comisiones;
		 	public $descripcion;
		
		//--------------------------------------------------------------------------------//

		//--------------------------------------------------------------------------------//
		//--GETTERS Y SETTERS
			public function GetId()
			{
				return $this->id_comisiones;
			}
		
			public function SetId($valor)
			{
				$this->id_comisiones = $valor;
			}
			public function GetDescripcion()
			{
				return $this->descripcion;
			}
		
			public function SetDescripcion($valor)
			{
				$this->descripcion = $valor;
			}


		//--------------------------------------------------------------------------------//
		//--CONSTRUCTOR
			public function __construct($comision)
			{
	
					$this->descripcion = $comision['nombre'];
				
				
			}
		//--------------------------------------------------------------------------------//

		//--TOSTRING	
		  	public function ToString()
			{
			  	return $this->id_comisiones." - ".$this->descripcion." \r\n";
			}
		//--------------------------------------------------------------------------------//
		//--------------------------------------------------------------------------------//


		//--METODO DE CLASE
				   public static  function TraerComisiones(){
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM comisiones");
		
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
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
	public function AgregarComision()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO comisiones (descripcion) VALUES(:descripcion)");
		$consulta->bindValue(':descripcion', $this->descripcion, PDO::PARAM_STR);
		
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