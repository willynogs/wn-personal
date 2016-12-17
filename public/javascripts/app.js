var app = angular.module('wnPersonal', [])

.controller('MainCtrl', ['$scope', function($scope){

}]);

$('.burger').click(function(){
  $(this).toggleClass('burger-clicked');
});
