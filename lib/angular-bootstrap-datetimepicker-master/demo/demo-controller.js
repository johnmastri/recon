/*globals angular, moment, $, console*/

angular.module('demo.demoController', [])
  .controller('demoController', [
    '$scope',
    function ($scope) {
      'use strict';
      $scope.controllerName = 'demoController';

      moment.locale("en");

      $scope.data = {
        guardians: [
          {
            name: 'Peter Quill',
            dob: null
          },
          {
            name: 'Groot',
            dob: null
          }
        ]
      };

      $scope.checkboxOnTimeSet = function () {
        $scope.data.checked = false;
      };

      $scope.inputOnTimeSet = function (newDate, oldDate) {
        // If you are not using jQuery or bootstrap.js,
        // this will throw an error.
        // However, can write this function to take any
        // action necessary once the user has selected a
        // date/time using the picker
        console.log(newDate);
        $('#dropdown3').dropdown('toggle');
      };

      $scope.getLocale = function () {
        return moment.locale();
      };

      $scope.setLocale = function (newLocale) {
        moment.locale(newLocale);
      };


      $scope.guardianOnTimeSet = function ($index) {
        console.log($index);
        $('#guardian' + $index).dropdown('toggle');
      };

    }
  ]);