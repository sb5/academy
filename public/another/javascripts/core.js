var academy = angular.module('academy', [ 'ngRoute','ngAnimate']);




academy.config(function($routeProvider) {

    $routeProvider
   // route for the results page

        .when('/', {
         templateUrl : 'views/index.html'
           })
       .when('/media/:moduleId/:mediaId', {

          templateUrl : 'views/media.html',
          controller: 'mediaController'
          })
         .when('/nav', {
          templateUrl : 'views/nav.html',

          });


        });


academy.controller('mediaController', function($scope,$routeParams) {


$scope.params = $routeParams;
$scope.mediaId = $scope.params.mediaId-1;
$scope.moduleId = $scope.params.moduleId;
$scope.mediaContentObject = {};
$scope.linkTitle = "";
$scope.linkText = "";


console.log($scope.mediaId);

for(i=0;i<=$scope.moduleSyllabusObject.media.length;i++){
console.log(i+"i = +"+$scope.mediaId)

if(i == $scope.mediaId){
$scope.mediaContentObject = $scope.moduleSyllabusObject.media[i];
console.log($scope.mediaContentObject);
$scope.linkTitle = $scope.mediaContentObject.link_title;
$scope.linkText = $scope.mediaContentObject.link_text;
break;
}
}

});
academy.controller('mainController', function($scope, $http, $timeout) {

$scope.fog = false;
$scope.blueBoy= false;
$scope.hyde = true;
$scope.sho = false;
$scope.data= { hyde:false };
$scope.data= { isHidden:false };
$scope.preventClick = function($event){ $event.preventDefault();console.log('prevent defaul'); }

          $scope.togglePanel = function(){
    console.log('togglePanel');
$scope.panelClicked = !$scope.panelClicked;

  }

$scope.toggleFog = function(){
console.log('fog');

  $scope.fog= !$scope.fog;
  $scope.blueBoy= false;
}
$scope.toggleBlueBoy = function(){
console.log('blueBoy');

  $scope.blueBoy= !$scope.blueBoy;
  $scope.fog = false;
}


$scope.topText = "Intro text goes here... lorem ipsum";
$scope.panelColor = false;
$scope.panelClicked = false;
$scope.panelTitle = "Welcome to the LTAP/TTAP Academy";
$scope.selected = 0;



$scope.isHidden = false;

$scope.getModule = function(tag){
$scope.sho= false;
$scope.hyde= true;

      $timeout(function() {
    //$scope.hyde= false;
  $scope.sho= true;

}, 1000);
 $scope.data.hyde = !$scope.data.hyde;
 $scope.data.isHidden = !$scope.data.isHidden;

  $scope.panelClicked = true;


    this.isHidden = false;


  $scope.selected = tag;
  console.log($scope.selected);
  $scope.tag = tag;

  url = 'moduledata.html';

  $http.get(url).success(function(data) {


for(i = 0; i <9; i++){
  // look for the entry with a matching `code` value
  if (data.modules[i].name_short == tag){

    $scope.panelTitle = data.modules[i].name;
    $scope.moduleOverview = data.modules[i].overview;
        $scope.moduleSyllabusObject = data.modules[i].syllabus;

    $scope.moduleSyllabusIntroText =  $scope.moduleSyllabusObject.syllabus_intro_text;
    $scope.moduleSyllabusMediaItems = $scope.moduleSyllabusObject.media;
  }
}


 });


}



});



