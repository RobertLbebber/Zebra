angular.module('SignupModule').controller('SignupController',['$scope', '$http',function($scope){
    $scope.signupForm={
        loading:false
    }

    $scope.loginForm={
        loading:false
    }

    $scope.submitLoginForm=function(){
        $scope.loginForm.loading=true;
        console.log("Login In!");
    }

    $scope.submitSignupForm=function(){
        $scope.signupForm.loading=true;
        console.log("Sign in!");
    }
}]);