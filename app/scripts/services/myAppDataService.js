myApp.factory('productDataService', [ '$q','$rootScope', function($q,$rootScope) {
    var products = [{
        "id":1,
        "name":"Dell",
        "quantity":"10",
        "cost":"100",
        "sellingPrice":"200"
    },{
        "id":2,
        "name":"Lenovo",
        "quantity":"20",
        "cost":"110",
        "sellingPrice":"210"
    },{
        "id":3,
        "name":"Sony",
        "quantity":"30",
        "cost":"200",
        "sellingPrice":"300"
    },{
        "id":4,
        "name":"Apple",
        "quantity":"5",
        "cost":"400",
        "sellingPrice":"500"
    },{
        "id":5,
        "name":"HP",
        "quantity":"45",
        "cost":"100",
        "sellingPrice":"200"
    },{
        "id":6,
        "name":"Della",
        "quantity":"10",
        "cost":"100",
        "sellingPrice":"200"
    }];
    var db = new PouchDB('my_database');
    return {
        get : function() {
            var deferred = $q.defer();
            db.get('mydoc', function(err, doc) {
                $rootScope.$apply(function() {
                    if (err) {
                        db.put({
                            _id: 'mydoc',
                            product: products
                        }, function (err, response) {
                            if (err) {
                                return console.log("put", err);
                            }
                            // handle response
                        });
                        return console.log(err);
                    }
                    console.log("doc", doc.product)
                    deferred.resolve(doc.product);
                });
            });
            return deferred.promise;
        },
        update : function(obj) {
            var deferred = $q.defer();
            for (i in products) {
                if(products[i].id == obj.id) {
                    products[i] = obj;
                }
            }
            db.get('mydoc', function(err, doc) {
                $rootScope.$apply(function() {
                    if (err) { return console.log(err); }
                    db.put({
                        _id: 'mydoc',
                        _rev: doc._rev,
                        product: products
                    }, function(err, response) {
                        if (err) { return console.log(err); }
                        deferred.resolve(response);
                    });
                });

            });
            return deferred.promise;
        },
        add : function (obj) {
            var deferred = $q.defer();
            products.push(obj);
            console.log("add products",products)
            db.get('mydoc', function(err, doc) {
                $rootScope.$apply(function () {
                    if (err) {
                        return console.log(err);
                    }
                    db.put({
                        _id: 'mydoc',
                        _rev: doc._rev,
                        product: products
                    }, function (err, response) {
                        if (err) {
                            return console.log(err);
                        }
                        deferred.resolve(response);
                    });
                });
            });
            return deferred.promise;
        },
        delete: function() {
            var deferred = $q.defer();
            db.destroy(function (error) {
                $rootScope.$apply(function () {
                    if (error) {
                        return console.log(error);
                    } else {
                        deferred.resolve("success")
                    }
                });
            });
            return deferred.promise;
        }
    };
} ]);