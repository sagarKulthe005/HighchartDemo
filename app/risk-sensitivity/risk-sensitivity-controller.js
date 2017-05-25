angular.module('app').controller('riskSensitivityController',
    ['$scope', '$location', '$state', '$stateParams', 'dataFactory', '$sessionStorage',
        function ($scope, $location, $state, $stateParams, dataFactory, $sessionStorage) {

            $sessionStorage.value = ($stateParams.id == null) ? $sessionStorage.value : $stateParams.id;
            $scope.value = $sessionStorage.value;
            $scope.metricId = 0;
            var seriesUCL = [];
            var seriesLCL = [];
            var seriesMericValue = [];

            dataFactory.getSensitivityData($scope.value).then(
                //Success function 
                function (response) {
                    console.log(response);

                    for (var key in response) {
                        //get metric id
                        if (key == 0) {
                            $scope.metricId = response[key].Metric_ID;

                        }
                        seriesLCL.push([Date.parse(response[key].Date), response[key].LCL]);
                        seriesUCL.push([Date.parse(response[key].Date), response[key].UCL]);
                        seriesMericValue.push([Date.parse(response[key].Date), response[key].Metric_Value]);
                    }
                    console.log(seriesLCL);
                    console.log(seriesUCL);
                    console.log(seriesMericValue);

                    // Line series chart config
                    $scope.chartConfig = {
                        chart: {
                            type: 'spline'
                        },
                        title: {
                            text: 'Metric ID: ' + $scope.metricId
                        },
                        subtitle: {
                            text: 'Risk data as per date'
                        },
                        xAxis: {
                            type: 'datetime',
                            startOnTick: true,
                            endOnTick: true,
                            dateTimeLabelFormats: {
                                day: '%d %b %Y' //ex- 01 Jan 2016
                            },
                            labels: {
                                rotation: -45
                            },
                            title: {
                                text: 'Date'
                            }
                        },
                        yAxis: {
                            title: {
                                text: 'Metric Value'
                            },
                            min: 0
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x: %d %b %Y}: {point.y}'
                        },
                        plotOptions: {
                            spline: {
                                marker: {
                                    enabled: true
                                }
                            }
                        },
                        series: [{
                            name: 'UCL',
                            color: '#50B432',
                            data: seriesUCL
                        },
                        {
                            name: 'LCL',
                            color: 'Red',
                            data: seriesLCL
                        },
                        {
                            name: 'Metric',
                            color: '#4169E1',
                            data: seriesMericValue
                        }]
                    };

                },
                //Error function
                function (error) {

                }

            );

        }]);

app.directive('highChart', function ($parse) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch('chartConfig', function (newVal) {
                if (newVal) {

                    var props = $parse(attrs.highChart)(scope);
                    props.chart.renderTo = element[0];
                    new Highcharts.Chart(props);
                }
            });
        }
    };
});

