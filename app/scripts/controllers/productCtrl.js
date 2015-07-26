'use strict';
myApp.controller('productCtrl', function($scope,productDataService) {

    /**
     * Function to work as constructor
     */
    $scope.init = function() {
        $scope.newProduct ={};
        $scope.alerts =[];
        $scope.getProductData();
    };
    /**
     * Function to close alert
     * @param index
     */
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
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
        },function(returnedObj){
            /**
             * This is the case when db is failed to load at first time.
             */
            if(returnedObj.data == "error"){
                console.log(returnedObj.title);
                $scope.getProductData();
            }

        })
    };
    /**
     * Fucntion to update the existing product object
     * @param obj
     */
    $scope.updateProductData = function(obj) {
        var promise =  productDataService.update(obj);
        promise.then(function(responce) {
           $scope.alerts.push({type:"success",msg: 'Product info Updated successfully'});
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
            console.log("added",responce);
            $scope.alerts.push({type:"success",msg: 'Product info added successfully'});
            $scope.getProductData();
        });
    };
    /**
     * FUnction to create chart
     */
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
    };
    $scope.destroyDB = function() {
        var promise =  productDataService.delete();
        console.log("promise",promise)
        promise.then(function(responce) {
            console.log("deleted",responce);
            $scope.alerts.push({type:"success",msg: 'DB destroyed successfully'});
        });
    };
});
