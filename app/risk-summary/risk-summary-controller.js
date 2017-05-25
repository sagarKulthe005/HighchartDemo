angular.module('app').controller('riskSummaryController',
    ['$scope', '$location', '$state', 'dataFactory',
        function ($scope, $location, $state, dataFactory) {
            $scope.records = [];
            $scope.headers = [];


            dataFactory.getSummaryData().then(
                /**Success function */
                function (response) {
                    console.log(response);
                    var data = response;
                    for (var key in data) {
                        if (key == 0) {
                            for (var obj in data[key]) {
                                $scope.headers.push(obj);
                            }
                        }

                    }
                    $scope.records = data;
                    console.log($scope.records);
                },
                /**Error function */
                function (error) {

                }
            )


        }]);