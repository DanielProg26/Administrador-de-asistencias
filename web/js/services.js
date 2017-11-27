angular.module('GATE')

  // Para probarlo desde el movil http://192.168.1.{tu-puerto}/api/public  
  // Desde windows http://localhost:3454

  .constant("ruta", "http://localhost:3454")

  .constant("trimestresConstante", [{
    id_trimestre: 1
  }, {
    id_trimestre: 2
  }, {
    id_trimestre: 3
  }, {
    id_trimestre: 4
  }, {
    id_trimestre: 5
  }, {
    id_trimestre: 6
  }, {
    id_trimestre: 7
  }, {
    id_trimestre: 8
  }, {
    id_trimestre: 9
  }, {
    id_trimestre: 10
  }, {
    id_trimestre: 11
  }, {
    id_trimestre: 12
  }])

  .factory('LS', ['$window', '$rootScope', function ($window, $rootScope) {
    return {
      definir: function (llave, valor) {
        $window.localStorage.setItem(llave, JSON.stringify(valor));
        return this;
      },
      obtener: function (llave) {
        return $window.localStorage.getItem(llave);
      }
    };

  }])

  /* INGRESAR */

  .service("servicioGeneral", ["$http", "$q", "ruta", "$rootScope", "$window", function ($http, $q, ruta, $rootScope, $window) {

    // Espera por parametro {usuario | correo, contrasena}
    this.ingresar = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/login', datos).then(function (res) {

        $window.localStorage.setItem('token', JSON.stringify(res.data));
        $rootScope.objectoCliente = res.data;
        defered.resolve(res);

      }).catch(function (res) {
        $window.localStorage.removeItem('token');
        defered.reject(res);
      })

      return promise;
    }

    this.salir = function () {
      $rootScope.objectoCliente = false;
      $window.localStorage.removeItem('token');
    }

    // Espera por parametro {usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla}
    this.registrar = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/singup', datos).then(function (res) {

        $window.localStorage.setItem('token', JSON.stringify(res.data));
        $rootScope.objectoCliente = res.data;
        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);
      });
      return promise;
    };

    this.autorizado = function () {

      if ($rootScope.objectoCliente) {

        return $rootScope.objectoCliente;

      } else {

        if ($window.localStorage.getItem('token')) {

          $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('token'));

          return $rootScope.objectoCliente;

        } else {

          return false;

        }

      }

    }

    // Devuelve la informacion de la aplicacion
    this.app = function () {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/app').then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;
    };

    // Espera como parametro {id_usuario, offset}

    this.timeline = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/posts/timeline', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);

      });
      return promise;
    };

    this.forgotPass = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/forgotPass', datos).then(function (res) {
        defered.resolve(res);
      }).catch(function (res) {
        defered.reject(res);
      });
      return promise;
    };

    this.sendMail = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/sendMail', datos).then(function (res) {
        defered.resolve(res);
      }).catch(function (res) {
        defered.reject(res);
      });
      return promise;
    };

  }])

  /* USUARIOS */

  .service("servicioUsuario", ["$http", "$q", "ruta", "Upload", function ($http, $q, ruta, Upload) {

    // Colocamos la imagen de perfil
    this.setPicture = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/user/picture',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_usuario, contrasena, nombre_completo, telefono, cedula}
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/user/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}
    this.updatePreferences = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/user/setPrefencias', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });

      return promise;
    };

    /* Espera como parametro {tipo de ususario, por defecto es ESTUDIANTE} */

    /* OBTENER TODOS LOS ESTUDIANTES */

    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/user/all' + datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /*OBTENER TODOS LOS PROFESORES*/


    this.getAllTeacher = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/user/all/Profesor' + datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };



    /* Espera como parametro {id del usuario} */

    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/user/' + datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

  }])

  /* ASIGNATURAS */

  .service("servicioAsignatura", ["$http", "$q", "ruta", function ($http, $q, ruta) {

    this.getMalla = function (id) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/pnf/get/' + id).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Esperan el id de todas las asignaturas */

    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/asignatura/all/' + datos.id_malla + '/' + datos.id_trimestre).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Esperan el id, trimestre y opcionalmente el pnf */

    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/asignatura/' + datos.id_malla + '/' + datos.id_trimestre).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Se añadiran nombre, trimestre, id_malla */

    this.add = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/asignatura/add', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    /* Se actualizaran nombre dentro de una id_malla y trimestre */
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/asignatura/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };
  }])

  /* SECCIONES */

  .service("servicioSecciones", ["$http", "$q", "ruta", "Upload", function ($http, $q, ruta, Upload) {

    // Espera como parametro {id_seccion, fecha}

    this.getInfo = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/getInfo', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_asignatura}
    this.getAll = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/all', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_seccion, id_profesor}
    this.get = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/' + datos.id + '/' + datos.idProfesor).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_seccion, id_profesor}
    this.add = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/add', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });

      return promise;
    };

    // Espera como parametro {nombre, id_seccion}
    this.update = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Miembros

    // Espera como parametro {id_seccion}

    this.getMembers = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/members', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}

    this.getMember = function (id) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/seccion/member/' + id).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario}

    this.deleteMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/status', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, codigo}

    this.addMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/add', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, id_seccion, accion}

    this.statusMember = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/member/status', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    //POSTS

    // Espera como parametro {id_seccion, offset}

    this.getPosts = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/posts', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.getPost = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/get', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {titulo, descripcion, id_seccion, id_usuario, nombre_archivo}

    this.addPost = function (datos) {
      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/seccion/post/add',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;

    };

    // Espera como parametro {titulo, descripcion, nombre_archivo, id_publicacion, id_seccion, id_usuario}

    this.updatePost = function (datos) {
      var defered = $q.defer();
      var promise = defered.promise;

      /* Ver si se envia el archivo 
      console.log(datos)
      */

      Upload.upload({
        url: ruta + '/seccion/post/update',
        method: 'POST',
        file: {
          archivo: datos.archivo
        },
        data: datos
      }).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // Espera como parametro {id_publicacion, id_seccion, id_usuario}

    this.deletePost = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/post/delete', datos).then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      });
      return promise;
    };

    // ASISTENCIAS

    // Espera como parametro {id_seccion, id_usuario, fecha, asistio}

    this.setAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_seccion, fecha}

    this.getAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/get', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_usuario, fecha, aistio}

    this.updateAsistence = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/asistencia/update', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

    // Espera como parametro {id_seccion, desde, hasta}

    this.report = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/seccion/reporte', datos).then(function (res) {


        defered.resolve(res);

      }).catch(function (res) {


        defered.reject(res);
      });
      return promise;
    };

  }])

  .factory('AuthInterceptor', function ($window, $q, $rootScope) {
    function salir() {
      $rootScope.objectoCliente = false;
      $window.localStorage.removeItem('bzToken');
    }

    function autorizado() {
      if ($rootScope.objectoCliente) {
        return $rootScope.objectoCliente;
      } else {
        if ($window.localStorage.getItem('token')) {
          $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('token'));
          return $rootScope.objectoCliente;
        } else {
          return false;
        }
      }
    }
    return {
      request: function (config) {

        config.headers = config.headers || {};
        if (autorizado()) {
          config.headers.auth = autorizado().token;
        }

        return config || $q.when(config);

      },
      response: function (response) {
        if (response.status === 401 || response.status === 403) {
          salir();
        }
        return response || $q.when(response);
      }
    };
  })

  .service("servicioDB", ["$http", "$q", "ruta", "$rootScope", "$window", function ($http, $q, ruta, $rootScope, $window) {

    // Devuelve la informacion de la aplicacion
    this.backup = function () {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/bd/backup').then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;
    };


    this.backups = function () {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.get(ruta + '/bd/backups').then(function (res) {

        defered.resolve(res);

      }).catch(function (res) {

        defered.reject(res);

      })
      return promise;
    };




    this.restore = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(ruta + '/bd/restore', datos).then(function (res) {
        defered.resolve(res);
      }).catch(function (res) {
        defered.reject(res);
      });
      return promise;
    };


    this.delete = function (datos) {

      var defered = $q.defer();
      var promise = defered.promise;
      console.log(datos)
      $http.post(ruta + '/bd/delete', datos).then(function (res) {
        defered.resolve(res);
      }).catch(function (res) {
        defered.reject(res);
      });
      return promise;
    };


  }])