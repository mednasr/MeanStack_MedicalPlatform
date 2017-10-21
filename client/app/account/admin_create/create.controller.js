'use strict';

angular.module('MeanApp')
  .controller('CreateCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({

          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          role:$scope.user.role,
          phone:$scope.user.phone,
          address : $scope.user.address,
          speciality:$scope.user.speciality,
          capacity:$scope.user.capacity,
          location:$scope.user.location,
        })


          .catch( function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
