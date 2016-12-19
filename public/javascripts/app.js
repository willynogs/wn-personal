//angular
var app = angular.module('wnPersonal', [])

.controller('MainCtrl', ['$scope', function($scope){
  $scope.name = '';
  $scope.email = '';
  $scope.msg = '';
}]);

//jquery
$('.burger').click(function(){
  $(this).toggleClass('burger-clicked');
  $('.wrapper--outer-mobile').toggleClass('mobile--menu--show');
});

$('.submit--button').mouseup(function(){
  alert();
});
