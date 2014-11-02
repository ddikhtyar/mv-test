angular.module('app').controller('mvCourseListCtrl', function($scope,mvCourse){
    $scope.courses = mvCourse.query();

    $scope.sortOptions = [{value:"title", text:"Sort by title"},
       {value:"published", text:"Sort by publish date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;

});