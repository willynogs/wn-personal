//angular
var app = angular.module('wnPersonal', [])

.filter('trustUrl', function ($sce) {
  return function(uri) {
    return $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + uri);
}})

.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
  $scope.name = '';
  $scope.email = '';
  $scope.msg = '';

  $scope.submit = function(){
    //$scope.message = 'sending your message...';
    $http.get(`/submit-contact/${$scope.name}/${$scope.email}/${$scope.msg}`)
      .then(function(r){
        //r.status == '200' ? $scope.message = 'message sent!' : $scope.message = 'error! please retry!';
        if(r.status == 200){
          $scope.name = '';
          $scope.email = '';
          $scope.msg = '';
        }
      });
  }
}])

.controller('XMCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce){
  $http.get('/api/xm')
    .then(function(r){
      $scope.channels = r.data;
      console.log(r);
    });
}]);

//jquery
$('.burger').click(function(){
  $(this).toggleClass('burger-clicked');
  $('.wrapper--outer-mobile').toggleClass('mobile--menu--show');
});
