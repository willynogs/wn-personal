//angular
var app = angular.module('wnPersonal', [])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.name = '';
  $scope.email = '';
  $scope.msg = '';

  $scope.submit = function(){
    //$scope.message = 'sending your message...';
    $http.get(`/submit-contact/${$scope.name}/${$scope.email}/${$scope.msg}`)
      .then(function(r){
        //r.status == '200' ? $scope.message = 'message sent!' : $scope.message = 'error! please retry!';
        console.log(r.status);
      });
  }
}]);

//jquery
$('.burger').click(function(){
  $(this).toggleClass('burger-clicked');
  $('.wrapper--outer-mobile').toggleClass('mobile--menu--show');
});
