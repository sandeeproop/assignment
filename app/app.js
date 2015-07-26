'use strict';
var myApp = angular.module("myApp", ['ngRoute','chart.js','ui.bootstrap']);
myApp.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvide) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home.html'
            })
            .otherwise({
                redirectTo: '/home'
            });      
    }
]);
