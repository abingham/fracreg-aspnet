/// <reference path="../lib/angularjs/angular.d.ts"/>
/// <reference path="../lib/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>
/// <reference path="../lib/underscore/underscore.d.ts"/>
'use strict';
var FracReg;
(function (FracReg) {
    var Feedback;
    (function (Feedback) {
        var fracregFeedbackControllers = angular.module('fracregFeedbackControllers', ['ui.bootstrap']);
        fracregFeedbackControllers.controller('FracRegFeedbackCtrl', ['$scope', '$http', '$modal',
            function ($scope, $http, $modal) {
                $scope.open = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'fracregFeedback.html',
                        controller: 'FracRegFeedbackInstanceCtrl'
                    });
                    modalInstance.result.then(function (values) {
                        if (values.message.length > 0) {
                            $http.post("/feedback", { name: values.name,
                                message: values.message });
                        }
                    }, function () {
                    });
                };
            }]);
        fracregFeedbackControllers.controller('FracRegFeedbackInstanceCtrl', ['$scope', '$modalInstance',
            function ($scope, $modalInstance) {
                $scope.name = '';
                $scope.message = '';
                $scope.ok = function () {
                    $modalInstance.close({
                        name: $scope.name,
                        message: $scope.message
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);
    })(Feedback = FracReg.Feedback || (FracReg.Feedback = {}));
})(FracReg || (FracReg = {}));
//# sourceMappingURL=feedbackControllers.js.map