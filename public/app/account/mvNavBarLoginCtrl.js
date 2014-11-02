angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http, mvIdentity, mvNotifier,mvAuth, $location){
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password){
        mvAuth.authenticateUser(username,password).then(function(success){
            if(success){
                mvNotifier.notify('Wow! You log in successes!');
            } else {
                mvNotifier.notify('Uh! You log in failed!');
            }
        });
   }
    $scope.signout = function(){
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    }
});