'use strict';
myApp.controller('productCtrl', function($scope,productDataService) {

    /**
     * Function to work as constructor
     */
    $scope.init = function() {
        $scope.newProduct ={};
        $scope.getProductData();
    };
    /**
     * Function to set the product id
     */
    $scope.editTab = function() {
        $scope.newProduct.id = maxVal($scope.productData,"id");
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
    $scope.createChart = function() {

        $scope.barChartLabels = [];
        var productPrice =[];
        var productCost = [];
        $.each($scope.productData, function(idx, item) {
            $scope.barChartLabels.push(item.name);
            productPrice.push(item.sellingPrice);
            productCost.push(item.cost);
        });
        $scope.barChartData = [productPrice,productCost];
        console.log("$scope.barChartData",$scope.barChartData)
        console.log("$scope.barChartLabels",$scope.barChartLabels)
    };
    $scope.destroyDB = function() {
        var promise =  productDataService.delete();
        console.log("promise",promise)
        promise.then(function(responce) {
            console.log("deleted",responce)
            //$scope.getProductData();
        });
    };
});
