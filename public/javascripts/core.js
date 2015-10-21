var academy = angular.module('academy', [ 'ngRoute','ngAnimate']).directive("splashSize", function( $window, $location){
  // console.log( scope.id);
  return {
    'scope': false,
    'link': function(scope, element, attrs) {
      var setSize = function(elem,data)
      {
        if(elem=='HR'){   return 'width:' + data+'px';
      }else if(elem=='IMG'){


margin = data/5.69285714;
        return 'padding-top:'+margin+'px;';

      }else{
        return 'height:' + data+'px';
      }
    }

var height = "innerHeight" in window
               ? window.innerHeight
               : document.documentElement.offsetHeight;
    // console.log(    scope.height );
    // console.log(element.context.nodeName);
    var elem = element.context.nodeName;

    attrs.$set('style',  setSize(elem, height));

 angular.element($window).bind("scroll", function() {

  var offset = height / 1.8;

             if (this.pageYOffset >= offset) {
                 scope.boolChangeClass = true;
                 scope.scrollHide = true;
                 $location.path('/icons');

             } else {
                 scope.boolChangeClass = false;
                 // console.log('Header is in view.');
             }
            scope.$apply();
        });
  }
};
})
academy.directive('ieFix', function ($window) { //rename
    return function (scope, element) {
        var w = angular.element($window);
    getWidth = function(){return w.width();
    }

        scope.$watch(getWidth, function (newValue, oldValue) {



           console.log('panel Clicked is now'+newValue);
           if(newValue <  768){
            scope.vert = true;

           }else{
            scope.vert = false;


           }


        });

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})
.directive('fixVid',function($window){
  var video=document.getElementById("mediaPlayer");
var videoHeight=video.offsetHeight;
var videoWidth=video.offsetWidth;
var videoMargin=videoWidth/2;
console.log(videoWidth);
  return{
     'scope': false,
    'link': function(scope, element, attrs){
 scope.s ='s';
 angular.element($window).bind("scroll", function() {
     height = $window.innerHeight;
  var offset = height / 3;

             if (this.pageYOffset >= offset) {
                 scope.boolChangeClass = true;
                 scope.fixVid = true; console.log(scope.fixVid);
                     var elem = element.context.nodeName;
                     attrs.$set('style',  'width:'+videoWidth+'px; height:'+videoHeight+'px; z-index: 1;');

             } else {
                   scope.fixVid = false;
                 // console.log('Header is in view.');
             }
             scope.$apply();
        });
}
}

}).directive("fixChoose", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.fixChoose = true;
                 console.log('fixChoose'+   scope.fixChoose)
             } else {
                 scope.fixChoose = false;
             }
            scope.$apply();
        });
    };
});;


academy.factory('moduleService', function($http) {


var currentState;
var currentModule;
  url = 'moduledata.html';

 return {
  getModules:  $http.get(url)
  ,
setState: function(panelClicked,scrollHide){
 currentState = {"panelClicked":panelClicked, "scrollHIde":scrollHide};

},
getState: function(){

    return currentState;

},

setModule: function(tag){
 currentModule = tag;


  },
getModule: function()
  {

    return currentModule;
  }

};

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
         .when('/icons', {
          reloadOnSearch: false,
          templateUrl : 'views/index.html',

          });


        });



academy.controller('mediaController', function($scope,$routeParams, $window, $location, moduleService) {

  $scope.panelClicked = true;




   $scope.fixVid = false;
$scope.mediaTest = 'this is the media test';
  $scope.linkTitle = "";
$scope.linkText = "";
$scope.mediaContentObject = {};
$scope.params = $routeParams;
$scope.mediaId = $scope.params.mediaId-1;
$scope.moduleId = $scope.params.moduleId;

//the following checks if the moudule is defined, if not look up which one based on routeparams



 moduleService.getModules.success(function(data) {

//looks up module
for(i = 0; i <20; i++){
  // look for the entry with a matching `code` value
  if (data.modules[i].name_short == $scope.moduleId){
      console.log('it was found');
      //set it
      moduleService.setModule($scope.moduleId);




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



 moduleService.getModules.success(function(data) {


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
academy.controller('mainController', function($scope, $timeout, $location, $window, $route, $routeParams,moduleService) {
$scope.chalk =true;




$scope.whatIsLtapArray = ['wi','fhwa','nltapa','ltap','ttap','partners'];
$scope.tbdArray = ['tbd','mv','ppt'];
$scope.panelTitle = false;
$scope.fade = false;
 moduleService.getState();

  $scope.scrollHide = false;$scope.fixChoose = false;
showChalk = function(){
  $scope.fade = true;
  }



 angular.element(document).ready(function () {
 $timeout(function(){

 $scope.fade = true;

 },500);
    });
  console.log($scope.scrollHide);

$scope.reload = function(x){
  if(x == 'fromMedia'){


tag = moduleService.getModule();
if(tag){
$scope.panelClicked = true;
$scope.getModule(tag);
$location.path('/icons').search('tag',tag);
}else{

$scope.panelClicked = false;
$scope.scrollHide = true;

  $location.path('/icons');}
  }
  else if(x == 'tru'){
if(!$scope.panelTitle){

console.log('getModule'+moduleService.getModule());
$scope.getModule(moduleService.getModule());



}
else{
  console.log('paneltitle was LXICKWEDD');


}
  }


else{
  console.log('es;e');
 $scope.panelClicked = false;
 $scope.scrollHide = true;
    $location.path('/icons').search('tag',null);

}


//store the state
moduleService.setState($scope.panelClicked, $scope.scrollHide);


}

$scope.hyde = true;
$scope.sho = false;
$scope.data = { hyde:false };
$scope.data = { isHidden:false };
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

console.log($scope.mediaTest+ ' sssss')
  console.log(tag);
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

 moduleService.getModules.success(function(data) {

objCount = 0;
var key;
for(key in data.modules) {
  if(data.modules.hasOwnProperty(key)) {
    objCount++;
  }
}
for(i = 0; i <objCount; i++){
  // look for the entry with a matching `code` value
  if (data.modules[i].name_short == tag){
  console.log('found'+ data.modules[i].name_short);
    $scope.panelTitle = data.modules[i].name;
    $scope.moduleOverview = data.modules[i].overview;
    $scope.moduleSyllabusObject = data.modules[i].syllabus;

    $scope.moduleSyllabusIntroText =  $scope.moduleSyllabusObject.syllabus_intro_text;
    $scope.moduleSyllabusMediaItems = $scope.moduleSyllabusObject.media;

    $location.search('tag',tag);
  }


  console.log($scope.panelTitle)
}


 });


}

updateRoute = function(tag){
console.log('tag is ', tag)
  if(!angular.isUndefined(tag) && tag !='showIcons'){  $scope.getModule(tag);

  }else if(tag == 'showIcons'){

$scope.panelClicked = false;
console.log('panel clcikece =  ', $scope.panelClicked)
$scope.scrollHide= true;
  }else{

$scope.panelClicked = false;
$scope.scrollHide= false;

$location.path('/icons').search('tag', null);
  }
}
$scope.$on('$routeUpdate', function(){ //this is if they hit baack
   currPath = $location.path();
   tag = $location.search().tag;
if(($scope.scrollHide || $scope.panelClicked) && angular.isUndefined(tag)){
  $scope.scrollHide  = true;
  $scope.chalk  = false;
tag = 'showIcons';
// hide splash if user already has seen splash
}

 console.log('current path s '+ currPath+ 'chalk is '+ $scope.chalk);



  updateRoute(tag);
  console.log('TAG is '+tag);


});


init = function(){
 currPath = $location.path();
  tag = $location.search().tag;
if(($scope.scrollHide || $scope.panelClicked) && angular.isUndefined(tag)){
  $scope.scrollHide  = true;
  $scope.chalk  = false;
tag = 'showIcons';
// hide splash if user already has seen splash
}

  updateRoute(tag);

 }



init();

});
