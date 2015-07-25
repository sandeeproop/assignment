'use strict';
myApp.controller('productCtrl', function($scope,productDataService) {

    /**
     * Function to work as constructor
     */
    $scope.init = function() {
        $scope.getProductData();
    };
    /**
     * Function to get data on page load so it can be user by typeahead directive
     */
    $scope.getProductData = function() {
        //$scope.productData = productDataService.get();
        var promise =  productDataService.get();
        console.log("promise",promise)
        promise.then(function(data){
            console.log("got data",data)
            $scope.productData = data;
        })
    };
    /**
     * Fucntion to update the existing product object
     * @param obj
     */
    $scope.updateProductData = function(obj) {
        var promise =  productDataService.update(obj);
        promise.then(function(responce) {
           console.log("updated",responce)
        });
        //productDataService.update(obj);
    };
    /**
     * Function to add new product data
     * @param obj
     */
    $scope.addProductData = function(obj) {
        var promise =  productDataService.add(obj);
        console.log("promise",promise)
        promise.then(function(responce) {
            console.log("added",responce)
            $scope.getProductData();
        });
    };

});
