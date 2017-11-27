angular.module('GATE')

  .controller('reportesController', function ($scope, $rootScope, servicioSecciones, ionicDatePicker, $stateParams, $ionicLoading, ionicToast) {
    var bz = this;
    bz.tema = $rootScope.objectoCliente.preferencias.color_ui;

    bz.datos = {
      reporte: {
        id_seccion: $stateParams.datos[0].id_seccion,
        micorreo: true,
        id_usuario: $stateParams.datos[0].id_usuario,
        app: true
      }
    }

    bz.enviarReporte = function () {

      $ionicLoading.show({
        template: 'Enviando Reporte...',
      });
      servicioSecciones.reporte(bz.datos.reporte).then(function (res) {

        $ionicLoading.hide().then(function () {
          ionicToast.show(res.data.msg, 'top', false, 2500);
        });
      }).catch(function (res) {
        console.log(res)
      });
    }

    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Colocar',
      todayLabel: 'Hoy',
      closeLabel: 'Cerrar',
      mondayFirst: true,
      weeksList: ["D", "L", "Ma", "Mi", "J", "V", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2017, 1, 1),
      to: new Date(2030, 1, 1),
      showTodayButton: true
    };

    bz.openDatePicker2 = function () {

      datePickerObj.callback = function (val) {
        date = new Date(val);
        bz.datos.reporte.hasta = formatDate(date);
      }

      ionicDatePicker.openDatePicker(datePickerObj);
    };

    bz.openDatePicker1 = function () {

      datePickerObj.callback = function (val) {
        date = new Date(val);
        bz.datos.reporte.desde = formatDate(date);
      }

      ionicDatePicker.openDatePicker(datePickerObj);
    };


    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
  })
