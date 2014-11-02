angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCashedCourses, $routeParams){
    mvCashedCourses.query().$promise.then(function(collection){
            collection.forEach(function(course){
                if(course._id === $routeParams.id){
                    $scope.course = course;
                }
            });
    });
});