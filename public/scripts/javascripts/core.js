var academy = angular.module('academy', [ 'ngRoute','ngAnimate']).directive("splashSize", function( $window){
  return {
    'scope': false,
    'link': function(scope, element, attrs) {
      var setSize = function(elem,data)
      {
        if(elem=='HR'){   return 'width:' + data+'px';
      }else if(elem=='IMG'){
        data=data*.55;
        return 'height:' + data+'px';

      }else{
        return 'height:' + data+'px';
      }
    }

     height = $window.innerHeight;
    // console.log(    scope.height );
    // console.log(element.context.nodeName);
    var elem = element.context.nodeName;

    attrs.$set('style',  setSize(elem, height));

 angular.element($window).bind("scroll", function() {

  var offset = height / 3;

             if (this.pageYOffset >= offset) {
                 scope.boolChangeClass = true;

                 scope.scrollHide= true;
                 console.log(      scope.scrollHide);
             } else {
                 scope.boolChangeClass = false;
                 // console.log('Header is in view.');
             }
            scope.$apply();
        });
  }
};
});


academy.factory('moduleService', function($http) {



  url = 'moduledata.html';

 return $http.get(url);



});

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



academy.controller('mediaController', function($scope,$routeParams, $window, $location, moduleService) {
$scope.linkTitle = "";
$scope.linkText = "";
$scope.mediaContentObject = {};
$scope.params = $routeParams;
$scope.mediaId = $scope.params.mediaId-1;
$scope.moduleId = $scope.params.moduleId;

//the following checks if the moudule is defined, if not look up which one based on routeparams



 moduleService.success(function(data) {

//looks up module
for(i = 0; i <9; i++){
  // look for the entry with a matching `code` value
  if (data.modules[i].name_short == $scope.moduleId){
      console.log('it was found')
     $scope.panelTitle = data.modules[i].name;
    $scope.moduleOverview = data.modules[i].overview;
    $scope.moduleSyllabusObject = data.modules[i].syllabus;

    $scope.moduleSyllabusIntroText =  $scope.moduleSyllabusObject.syllabus_intro_text;
    $scope.moduleSyllabusMediaItems = $scope.moduleSyllabusObject.media;
    console.log(  'items' + $scope.moduleSyllabusMediaItems[$scope.mediaId].link_title)


$scope.currentLink = $scope.moduleSyllabusMediaItems[$scope.mediaId];
  $scope.moduleList = data;
$scope.moduleSyllabusObject.medias = $scope.moduleSyllabusObject.media;

  }
}


// looks up specific media

for(i=0;i<=$scope.moduleSyllabusObject.media.length;i++){
// console.log(i+"i = +"+$scope.mediaId)

if(i == $scope.mediaId){
$scope.mediaContentObject = $scope.moduleSyllabusObject.media[i];
// console.log($scope.mediaContentObject);
$scope.linkTitle = $scope.mediaContentObject.link_title;
$scope.linkText = $scope.mediaContentObject.link_text;
break;
}
}

 });





// $scope.vid = $sce.trustAsHtml($scope.currentLink.video_url);

    $scope.go = function (page) {
page =page.replace('/#/','');

        $location.path(page);
    };



 moduleService.success(function(data) {


  // console.log( 'new'+  $scope.moduleSyllabusObject.media[0].link_title )

for(i = 0; i <9; i++){
  // look for the entry with a matching `code` value


  if ($scope.moduleList.modules[i].name_short == $scope.moduleId){

$scope.mediaList = 2;
    // $scope.panelTitle = data.modules[i].name;
    // $scope.moduleOverview = data.modules[i].overview;
    //     $scope.moduleSyllabusObject = data.modules[i].syllabus;

    // $scope.moduleSyllabusIntroText =  $scope.moduleSyllabusObject.syllabus_intro_text;
    // $scope.moduleSyllabusMediaItems = $scope.moduleSyllabusObject.media;
  }
}
});

// console.log($scope.mediaId);



});
academy.controller('mainController', function($scope, $http, $timeout, $window, $route,moduleService) {
  $scope.scrollHide = false;
  $scope.panelClicked = false;
  $scope.chalk =false;
  console.log($scope.scrollHide);
  $scope.showChalk = function(){
$scope.chalk = !$scope.chalk;
console.log('chalklklklklk');
  }
$scope.reload = function(e){
  if(e == 'tru'){

    $scope.panelClicked = true;
    // console.log( 'pane'+$scope.panelClicked);
  }
$window.location.reload();
// console.log(
//   'reload');
}
$scope.fog = false;
$scope.blueBoy= false;
$scope.hyde = true;
$scope.sho = false;
$scope.data= { hyde:false };
$scope.data= { isHidden:false };
$scope.preventClick = function($event){ $event.preventDefault();
  // console.log('prevent defaul');
 }

          $scope.togglePanel = function(){
    // console.log('the prevent click function ran Panel');
$scope.panelClicked = !$scope.panelClicked;

  }


$scope.shrinkIcons =function(){
windowHeight = $window.innerHeight;
// console.log(windowHeight);

}


// $scope.panelClicked = false;

$scope.selected = 0;
$scope.name = 's';


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
if(!$scope.panelClicked){
  //run the shrinkicons deal
  $scope.shrinkIcons();
  $scope.panelClicked = true;

}
    this.isHidden = false;


  $scope.selected = tag;
  // console.log($scope.selected);
  $scope.tag = tag;

  url = 'moduledata.html';

 moduleService.success(function(data) {


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
