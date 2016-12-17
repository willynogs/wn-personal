//angular
var app = angular.module('wnPersonal', [])

.controller('MainCtrl', ['$scope', function($scope){

}]);

//jquery
$('.burger').click(function(){
  $(this).toggleClass('burger-clicked');
  $('.wrapper--outer-mobile').toggleClass('mobile--menu--show');
});
