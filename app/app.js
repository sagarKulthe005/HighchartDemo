/** Main JS file for app */
/**
  * Purpose         : Main JS use for views routing code, loading 3rd party modules
  * Created by      : Sagar Kulthe
  * Created on      : 28-Mar-2016
  * Last updated by : Sagar Kulthe
  * Last updated on : 2-Apr-2016
   
*/

var app = angular.module('app',
    [
        //3rd party modules
        'ui.router',
        'ngRoute'
        //App specific modules (if any)
        , 'app'

    ]);


/**
  * Purpose         : app.config
*/
app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$controllerProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $controllerProvider) {
        
        //Routing 
        //If no state available route to default page
        $urlRouterProvider.otherwise('/');

        $stateProvider
            //Default state- data table
            .state('/',
            {
                url: '/',
                templateUrl: 'app/risk-summary/risk-summary.html'

            })

            //chart
            .state('risk-sensitivity',
            {
                url: '/risk-sensitivity',
                templateUrl: 'app/risk-sensitivity/risk-sensitivity.html'

            })

    }]);

//Run this app
app.run(function ($rootScope, $location, $log, $q, $state) {


    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $log.debug('Rout change start...');
    });
});