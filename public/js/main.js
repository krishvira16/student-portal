var app = angular.module('portalApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl'
    }).when('/', {
        redirectTo: '/dashboard'
    }).when('/profile', {
        templateUrl: '/templates/profile.html',
        controller: 'ProfileCtrl'
    }).when('/subjects', {
        templateUrl: '/templates/subjects.html',
        controller: 'SubjectsCtrl'
    }).when('/assessments', {
        templateUrl: '/templates/assessments.html',
        controller: 'AssessmentsCtrl'
    }).when('/grades', {
        templateUrl: '/templates/grades.html',
        controller: 'GradesCtrl'
    }).when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl'
    }).when('/logout', {
        templateUrl: '/templates/logout.html',
        controller: 'LogoutCtrl'
    }).when('/error', {
        templateUrl: 'templates/error.html',
        controller: 'ErrorCtrl'
    }).otherwise({
        templateUrl: '/templates/page_not_found.html',
        controller: 'PageNotFoundCtrl'
    });
}]);

app.controller('MainCtrl', ['$scope', '$location', '$http',
    function MainCtrl($scope, $location, $http) {
        $scope.showProfile = false;
        $scope.$location = $location;

        $scope.loadProfile = function (callback) {
            if (typeof $scope.profile === 'undefined') {
                $http.get('/api/secure/profile').then(
                    function successCallback(response) {
                        $scope.profile = response.data;
                        $scope.showProfile = true;
                        callback();
                    },
                    function errorCallback(response) {
                        if (response.status == 401) {
                            $location.url('/login?redirectTo='+$location.path());
                        }
                        else {
                            $scope.error = {
                                code: response.status,
                                name: response.statusText,
                                message: response.data
                            };
                            $location.path('/error');
                        }
                    }
                );
            }
            else {
                $scope.showProfile = true;
                callback();
            }
        };
    }
]);

app.controller('DashboardCtrl', ['$scope',
    function DashboardCtrl($scope) {
        $scope.$parent.loadProfile(function () {});
        $scope.$parent.title = 'Dashboard';
    }
]);

app.controller('ProfileCtrl', ['$scope',
    function ProfileCtrl($scope) {
        $scope.$parent.loadProfile(function () {});
        $scope.$parent.title = 'Profile';
    }
]);

app.controller('SubjectsCtrl', ['$scope', '$location', '$http',
    function SubjectsCtrl($scope, $location, $http) {
        $scope.$parent.title = 'Subjects';
        $scope.subjectType = {
            internal: 'Internal Only',
            tee: 'Term End Exam'
        };
        $scope.showSubjects = false;
        $scope.$parent.loadProfile(function () {
            $http.get('/api/secure/subject-details').then(
                function successCallback(response) {
                    $scope.subjectDetails = response.data;
                    $scope.subjectIds = Object.keys($scope.subjectDetails);
                    $scope.showSubjects = true;
                },
                function errorCallback(response) {
                    if (response.status == 401) {
                        $location.url('/login?redirectTo='+$location.path());
                    }
                    else {
                        $scope.$parent.error = {
                            code: response.status,
                            name: response.statusText,
                            message: response.data
                        };
                        $location.path('/error');
                    }
                }
            );
        });
    }
]);

app.controller('AssessmentsCtrl', ['$scope', '$location', '$http',
    function AssessmentsCtrl($scope, $location, $http) {
        $scope.$parent.title = 'Assessments';
        $scope.showAssessment = false;
        $scope.showSubjects = false;
        $scope.$parent.loadProfile(function () {
            $http.get('/api/secure/subject-details').then(
                function successCallback(response) {
                    $scope.subjectDetails = response.data;
                    $scope.showSubjects = true;
                },
                function errorCallback(response) {
                    if (response.status == 401) {
                        $location.url('/login?redirectTo='+$location.path());
                    }
                    else {
                        $scope.$parent.error = {
                            code: response.status,
                            name: response.statusText,
                            message: response.data
                        };
                        $location.path('/error');
                    }
                }
            );
        });

        $scope.marks = function (score) {
            return (typeof score.score === 'undefined')? 'N/A': (score.score.marks === null)? '*': score.score.marks;
        };

        $scope.selectionMade = function (selectForm, assessment) {
            if (selectForm.$valid) {
                $http.get('/api/secure/scores/assessment-'+assessment).then(
                    function successCallback(response) {
                        $scope.scores = response.data;
                        $scope.showAssessment = true;
                    },
                    function errorCallback(response) {
                        if (response.status == 401) {
                            $location.url('/login?redirectTo='+$location.path());
                        }
                        else {
                            $scope.$parent.error = {
                                code: response.status,
                                name: response.statusText,
                                message: response.data
                            };
                            $location.path('/error');
                        }
                    }
                );
            }
        };
    }
]);

app.controller('GradesCtrl', ['$scope', '$location', '$http',
    function GradesCtrl($scope, $location, $http) {
        $scope.$parent.title = 'Grades';
        $scope.showGrades = false;

        $scope.marks = function (score) {
            return (typeof score === 'undefined')? 'N/A': (score.marks === null)? '*': score.marks;
        };

        $scope.$parent.loadProfile(function () {
            $http.get('/api/secure/subject-details').then(
                function successCallback(response) {
                    $scope.subjectDetails = response.data;
                    $http.get('/api/secure/grades').then(
                        function successCallback(response) {
                            $scope.grades = response.data;
                            $scope.showGrades = true;
                        },
                        function errorCallback(response) {
                            if (response.status == 401) {
                                $location.url('/login?redirectTo='+$location.path());
                            }
                            else {
                                $scope.$parent.error = {
                                    code: response.status,
                                    name: response.statusText,
                                    message: response.data
                                };
                                $location.path('/error');
                            }
                        }
                    );
                },
                function errorCallback(response) {
                    if (response.status == 401) {
                        $location.url('/login?redirectTo='+$location.path());
                    }
                    else {
                        $scope.$parent.error = {
                            code: response.status,
                            name: response.statusText,
                            message: response.data
                        };
                        $location.path('/error');
                    }
                }
            );
        });
    }
]);

app.controller('LoginCtrl', ['$scope', '$location', '$http',
    function LoginCtrl($scope, $location, $http) {
        $scope.$parent.showProfile = false;
        $scope.$parent.title = 'Login';

        $scope.loginSuccess = false;
        $scope.loginFailure = false;
        $scope.login = function () {
            $scope.loginSuccess = false;
            $scope.loginFailure = false;
            if ($scope.loginForm.$valid) {
                var data = {
                    student_id: $scope.student_id,
                    password: $scope.password
                };
                $http.post('/api/login', data).then(
                    function successCallback(response) {
                        delete $scope.$parent.profile;
                        $scope.loginSuccess = true;
                        var redirectTo = $location.search().redirectTo;
                        if (typeof redirectTo !== 'undefined') {
                            $location.url(redirectTo);
                        }
                        else {
                            $location.path('/dashboard');
                        }
                    },
                    function errorCallback(response) {
                        if (response.status == 401) {
                            $scope.error = {
                                message: response.data
                            };
                            $scope.loginFailure = true;
                        }
                        else {
                            $scope.$parent.error = {
                                code: response.status,
                                name: response.statusText,
                                message: response.data
                            };
                            $location.path('/error');
                        }
                    }
                );
            }
        };
    }
]);

app.controller('LogoutCtrl', ['$scope', '$location', '$http',
    function LogoutCtrl($scope, $location, $http) {
        $scope.$parent.showProfile = false;
        $scope.$parent.title = 'Logout';

        $scope.loggedOut = false;
        $http.get('/api/logout').then(
            function successCallback(response) {
                delete $scope.$parent.profile;
                $scope.loggedOut = true;
            },
            function errorCallback(response) {
                $scope.$parent.error = {
                    code: response.status,
                    name: response.statusText,
                    message: response.data
                };
                $location.path('/error');
            }
        );
    }
]);

app.controller('ErrorCtrl', ['$scope',
    function ErrorCtrl($scope) {
        $scope.$parent.showProfile = false;
        $scope.$parent.title = 'Error';
    }
]);

app.controller('PageNotFoundCtrl', ['$scope',
    function PageNotFoundCtrl($scope) {
        $scope.$parent.showProfile = false;
        $scope.$parent.title = 'Page Not Found';
    }
]);
