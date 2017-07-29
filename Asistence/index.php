<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */


require 'vendor/autoload.php';
require_once"clases/usuario.php";
require_once"clases/cursos.php";
require_once"clases/comisiones.php";
require_once"clases/cursocomision.php";
require_once"clases/usuarioscomision.php";
require_once"clases/usuarioscurso.php";
require_once"clases/asistencia.php";
require_once"clases/encuestas.php";
require_once"clases/respuestas.php";


use \Firebase\JWT\JWT;


/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("welcome to slim ");
    return $response;
});


     $app->get('/usuario', function ($request, $response,$args) {
             $response->write("welcome to slim ");
    return $response;
            }); 

$app->post('/verificarMail', function ( $request,  $response) {
               $user= $request->getParsedBody();
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::TraerUsuarioPorEmail($user['email'])
                    )
                ); 
            });
            $app->get('/traerdatosAC', function ( $request,  $response) {
              $datosarray=array();
               $datosCursoComision= CursoComision::Traertodo();
               $datosComisiones=Comisiones::traerComisiones();
               $datosCursos=Cursos::TraerCursos();
               
                    array_push($datosarray,$datosCursos);
                     array_push($datosarray,$datosCursoComision);
                     array_push($datosarray,$datosComisiones);
                    
                $response->write(json_encode($datosarray));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });
        $app->get('/traerUsuarios', function ( $request,  $response) {
                    
                      $ListaUsuarios=Usuario::TraerTodosUsuarios();


                    
                $response->write(json_encode($ListaUsuarios));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            }); 
                         $app->get('/traerRespuestas', function ( $request,  $response) {
              $datosarray=array();
               $respuestas=Respuesta::traerRespuestas();
               array_push($datosarray,$respuestas);
                    
                    
                $response->write(json_encode($respuestas));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });
                               $app->get('/traerEncuestas', function ( $request,  $response) {
              $datosarray=array();
               $encuestas=Encuesta::traerEncuestas();
               array_push($datosarray,$encuestas);
                    
                    
                $response->write(json_encode($encuestas));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });

                  $app->get('/traerdatosCA', function ( $request,  $response) {
              $datosarray=array();
               $datosComisiones=Comisiones::traerComisiones();
               $datosCursos=Cursos::TraerCursos();
               $usuariosAlumnos=Usuario::TraerUsuariosAlumno();
              $usuariosIdUsuariosCurso=UsuariosCurso::TraerIdUsuariosCursos();

                    array_push($datosarray,$datosCursos);
                     array_push($datosarray,$datosComisiones);
                    array_push($datosarray,$usuariosAlumnos);
                    array_push($datosarray,$usuariosIdUsuariosCurso);
                    
                    
                $response->write(json_encode($datosarray));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });
                         $app->post('/BuscarRepetido/{iduser}/{idcurso}', function ( $request,  $response,$args) {
          $idcurso=json_decode($args['idcurso']);
          $iduser=json_decode($args['iduser']);                      
                  $datosarray=array();
                    $respuesta=false;
                  $repetido=UsuariosCurso::BuscarRepetido($iduser,$idcurso);
                     if($repetido!=null){
                          $respuesta=true;
                     }         
                  //  array_push($datosarray,$idComisionesCurso);
                    
                    
                $response->write(json_encode($respuesta));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });
             $app->post('/traeridcomisionesCurso/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
                      
                  $datosarray=array();

                  $idComisionesCurso=CursoComision::TraerIdComisionesCurso($id);
                  //  array_push($datosarray,$idComisionesCurso);
                    
                    
                $response->write(json_encode($idComisionesCurso));
                return $response;
               // ->withHeader('Content-type', 'application/json')
               // ->getBody()
               // ->write(
                //    json_encode(
                //        $response
                 //   )
        
            });
                    $app->post('/traeridUserC/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
                      
                  $datosarray=array();

                  $UserComision=Usuario::TraerIdUsuarioComision($id);
                array_push($datosarray,$UserComision);
                      $response->write(json_encode($UserComision));
                return $response;
                    
               
            });
                      $app->post('/traerEncuestasPorCurso/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
                      
                  $datosarray=array();

                  $EncuestaXcurso=Encuesta::TraerEncuestasPorCurso($id);
                array_push($datosarray,$EncuestaXcurso);
                      $response->write(json_encode($EncuestaXcurso));
                return $response;
                    
               
            });
         $app->post('/traerRespuestasPorCurso/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
                      
                  $datosarray=array();

                  $respuestasXcurso=Respuesta::TraerRespuestasPorCurso($id);
                array_push($datosarray,$respuestasXcurso);
                      $response->write(json_encode($respuestasXcurso));
                return $response;
                    
               
            });


                            $app->post('/traerRespuestasPorUsuario/{idUsuario}', function ( $request,  $response,$args) {
          $id=json_decode($args['idUsuario']);
                      
                  $datosarray=array();

                  $respuestasXusuario=Respuesta::TraerRespuestasPorUsuario($id);
                array_push($datosarray,$respuestasXusuario);
                      $response->write(json_encode($respuestasXusuario));
                return $response;
                    
               
            });
                 $app->post('/traerIdCursoUsuario/{idUser}', function ( $request,  $response,$args) {
          $id=json_decode($args['idUser']);
                      
                  $datosarray=array();

                  $UserCurso=UsuariosCurso::TraerCursoXid($id);
                array_push($datosarray,$UserCurso);
                      $response->write(json_encode($UserCurso));
                return $response;
                    
               
            });
                    
                             $app->post('/traerListaAsistenciaPorCursoComision/{idCurso}/{idComision}', function ( $request,  $response,$args) {
          $idCurso=json_decode($args['idCurso']);
          $idComision=json_decode($args['idComision']);
          
                      
                  $datosarray=array();

                  $UserAsistencia=Asistencia::TraerListaAsistenciaPorCursoComision($idCurso,$idComision);
                array_push($datosarray,$UserAsistencia);
                      $response->write(json_encode($UserAsistencia));
                return $response;
                    
               
            });


                          $app->post('/traerListaPorComision/{idCurso}/{idComision}', function ( $request,  $response,$args) {
          $idCurso=json_decode($args['idCurso']);
          $idComision=json_decode($args['idComision']);
          
                      
                  $datosarray=array();

                  $UserComision=Usuario::TraerListaPorComision($idCurso,$idComision);
                array_push($datosarray,$UserComision);
                      $response->write(json_encode($UserComision));
                return $response;
                    
               
            });
     $app->post('/registrar', function ($request,$res) {
     $user= $request->getParsedBody();
     $newUser = new Usuario($user);
     $respuesta=false;
        if($newUser->AgregarUsuario()){
             $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($respuesta));
        });

     $app->post('/guardarasistencia', function ($request,$res) {
     $alumno= $request->getParsedBody();
     $newAsistencia = new Asistencia($alumno);
     $respuesta=false;
        if($newAsistencia->AgregarAsistencia()){
            $respuesta=true;
               }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($newAsistencia));
        });

     $app->post('/altacurso', function ($request,$res) {
     $curso= $request->getParsedBody();
     $newcurso = new Cursos($curso);
     $respuesta=false;
      if($newcurso->AgregarCurso()){
          $respuesta=true;
              }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($newcurso));
        });

  $app->post('/altacomision', function ($request,$res) {
     $comision= $request->getParsedBody();
     $newcomision = new Comisiones($comision);
     $respuesta=false;
        if($newcomision->AgregarComision()){
             $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($respuesta));
        });
                  $app->post('/guardarencuesta', function ($request,$res) {
     $encuesta= $request->getParsedBody();
     $newencuesta = new Encuesta($encuesta);
     $respuesta=false;
        if($newencuesta->AgregarEncuesta()){
            $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($respuesta));
        });
                          $app->post('/guardarRespuesta', function ($request,$res) {
     $respuesta= $request->getParsedBody();
     $newrespuesta = new Respuesta($respuesta);
     $resp=false;
        if($newrespuesta->AgregarRespuesta()){
            $resp=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($resp));
        });
          $app->post('/relacionCursoCom', function ($request,$res) {
     $relacion= $request->getParsedBody();
     $newrelacion = new CursoComision($relacion);
     $respuesta=false;
        if($newrelacion->AgregarRelacion()){
            $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($newrelacion));
        });
                  $app->post('/ModificarRelacionCursoCom', function ($request,$res) {
     $relacion= $request->getParsedBody();
     $newrelacion = new CursoComision($relacion);
     $respuesta=false;
        if($newrelacion->ModificarRelacion()){
            $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($relacion));
        });
               $app->post('/relacionAlumnoCurso', function ($request,$res) {
     $relacion= $request->getParsedBody();
     $newrelacion = new UsuariosCurso($relacion);
     $respuesta=false;
  if($newrelacion->AgregarRelacionAlumnoCurso()){
            $respuesta=true;
              }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($respuesta));
        });
                     $app->post('/relacionAlumnoComision', function ($request,$res) {
     $relacion= $request->getParsedBody();
     $newrelacion = new UsuariosComision($relacion);
     $respuesta=false;
       if($newrelacion->AgregarRelacion()){
            $respuesta=true;
                }                    
        return $res
        ->withHeader('Content-type', 'application/json')
        ->getBody()
        ->write(json_encode($respuesta));
        });
     $app->post('/logearse', function ($request,$res) {
        $datosForm= $request->getParsedBody();          
        $userObtenido= Usuario::TraerUnUsuarioPorEmail($datosForm);
      
        if ($userObtenido == false){

                $tok['err'] = "¡Usuario o Clave Incorrecta!";        
                }
    

    else
        {
           
	      	$key = "ramos";
		$token = array(
		       "iss" => "httpexample.org",
                "aud" => "httpexample.com",
                "iat" => 1356999524,
                "nbf" => 1357000000,
                "usuario" => $userObtenido
		);
              
        $jwt = JWT::encode($token, $key);
        	$tok['token'] = $jwt;


             // $leeway in seconds

        }
		return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
               $tok
            )
        );
	});

        $app->post('/borrarC/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
               
                    if(Cursos::BorrarCursoId($id)){
                        $respuesta=true;
                    }
                     else{
                         $respuesta=false;
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $id
                    )
                ); 
            });  
                  $app->post('/borrarEncuesta/{idEncuesta}', function ( $request,  $response,$args) {
          $id=json_decode($args['idEncuesta']);
               
                    if(Encuesta::BorrarEncuesta($id)){
                        $respuesta=true;
                    }
                     else{
                         $respuesta=false;
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $id
                    )
                ); 
            });
                   $app->post('/borrarRelacionAC/{idCurso}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCurso']);
               
                    if(UsuariosComision::BorrarRelacionAlumnoComision($id)){
                        $respuesta=true;
                    }
                     else{
                         $respuesta=false;
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $id
                    )
                ); 
            }); 
            
            
            
              $app->post('/borrarCC/{idCursoComision}', function ( $request,  $response,$args) {
          $id=json_decode($args['idCursoComision']);
               
                    if(CursoComision::BorrarCursoComisionId($id)){
                        $respuesta=true;
                    }
                     else{
                         $respuesta=false;
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $id
                    )
                ); 
            });

            $app->post('/borrarUsuarioDeAsistencia/{idUsuario}', function ( $request,  $response,$args) {
          $id=json_decode($args['idUsuario']);
               
                  if(Asistencia::BorrarUsuarioId($id)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            });  


                    $app->post('/borrarU/{idUsuario}', function ( $request,  $response,$args) {
          $id=json_decode($args['idUsuario']);
               
                  if(Usuario::BorrarUsuarioId($id)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            });  
                $app->post('/modificarU/{id}/{nombre}/{apellido}/{mail}', function ( $request,  $response,$args) {
               $id=json_decode($args['id']);
                $nombre=json_decode($args['nombre']);
                 $apellido=json_decode($args['apellido']);
                  $mail=json_decode($args['mail']);
                  if(Usuario::ModificarUsuarioPorId($id,$nombre,$apellido,$mail)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            });  


      $app->post('/CambiarPassword/{clave}/{idUser}', function ( $request,  $response,$args) {
               $clave=json_decode($args['clave']);
                $idUser=json_decode($args['idUser']);
                
                  if(Usuario::CambiarPassword($clave,$idUser)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            }); 

           $app->post('/ModificarTipoRespuesta/{id}/{tipo_respuesta}', function ( $request,  $response,$args) {
               $id=json_decode($args['id']);
                $tipo_respuesta=json_decode($args['tipo_respuesta']);
                
                  if(Encuesta::ModificarTipoRespuesta($id,$tipo_respuesta)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            });  

                 $app->post('/ModificarNombreCurso/{id}/{nombre}', function ( $request,  $response,$args) {
               $id=json_decode($args['id']);
                $nombre=json_decode($args['nombre']);
                
                  if(Cursos::ModificarNombreCurso($id,$nombre)){
                        $respuesta=true;
                 }
                   else{
                         $respuesta=false;
                 
                 
                 
                     }
                     
                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(  $respuesta
                    )
                ); 
            });  
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
