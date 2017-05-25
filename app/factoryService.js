
angular.module("app").service('dataFactory',
    ["$http", "$q", "$log",
        function ($http, $q, $log, localStorageService) {
            /**Factory object */
            var dataFactoryObject = {};

            /**Method to get data from API */
            var _getSummaryData = function () {

                /**Promise to be returned */
                var def = $q.defer();

                //{provide your service url here}
                var getUrl = 'data/summaryJson.json';

                /**Config to call node api */
                var config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic Y2xpZW50MTpzZWNyZXQ="
                    }
                };

                /**Node api call */
                $http.get(getUrl, config)
                    .success(function (data) {/**Success function */
                        if (data != undefined && data != null && data != []) {/**Check validity of data */
                            def.resolve(data);
                        }
                        else {
                            def.resolve('Null response from server');
                        }
                    })
                    .error(function (error) {/**Error function */
                        def.reject("failed");
                    });
                return def.promise;/**Return promise */
            };

            /**Method to get data from API */
            var _getSensitivityData = function (id) {

                /**Promise to be returned */
                var def = $q.defer();

                //{provide your service url here and use parameter id which is actually issue_id}
                var getUrl = 'data/sensitivityData-'+id+'.json';

                /**Config to call node api */
                var config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic Y2xpZW50MTpzZWNyZXQ="
                    }
                };

                /**Node api call */
                $http.get(getUrl, config)
                    .success(function (data) {/**Success function */
                        if (data != undefined && data != null && data != []) {/**Check validity of data */
                            def.resolve(data);
                        }
                        else {
                            def.resolve('Null response from server');
                        }
                    })
                    .error(function (error) {/**Error function */
                        def.reject("failed");
                    });
                return def.promise;/**Return promise */
            };


            /**Create intance of factory methods  */
            dataFactoryObject.getSummaryData = _getSummaryData;
            dataFactoryObject.getSensitivityData = _getSensitivityData;



            return dataFactoryObject;

        }


    ])

