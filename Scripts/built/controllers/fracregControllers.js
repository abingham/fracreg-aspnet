/// <reference path="../lib/angularjs/angular.d.ts"/>
/// <reference path="../lib/underscore/underscore.d.ts"/>
'use strict';
var FracReg;
(function (FracReg) {
    var Controller;
    (function (Controller) {
        var fracregControllers = angular.module('fracregControllers', ['fracregServices',
            'ui.bootstrap']);
        ;
        ;
        var DefaultSingleSelection = (function () {
            function DefaultSingleSelection() {
                this.selected = null;
                this.options = [];
            }
            return DefaultSingleSelection;
        })();
        var DefaultMultiSelection = (function () {
            function DefaultMultiSelection() {
                this.selected = [];
                this.options = [];
            }
            return DefaultMultiSelection;
        })();
        function initializeScope(scope) {
            scope.previousFacility = null;
            scope.previousProcedure = null;
            scope.previousExternalFacility = false;
            scope.noneComplications = [];
            scope.simpleComplications = [];
            scope.seriousComplications = [];
            scope.mainMethod = new DefaultSingleSelection();
            scope.secondaryMethods = new DefaultMultiSelection();
            scope.additionalProcedures = [];
            scope.repositioning = new DefaultSingleSelection();
            scope.arthroscopicallyAssisted = false;
            scope.cast = new DefaultSingleSelection();
            scope.woundTreatment = new DefaultSingleSelection();
            scope.transplant = new DefaultSingleSelection();
            scope.message = '';
            scope.aoInfo = null;
            scope.hour = null;
            scope.date = null;
            scope.treatmentDelay = new DefaultSingleSelection();
            scope.dislocation = new DefaultSingleSelection();
            scope.openFractureClassification = new DefaultSingleSelection();
            scope.pathology = new DefaultMultiSelection();
            scope.pathologyDescription = null;
            scope.facilities = [];
            scope.previousProcedures = [];
            scope.multiSelectLocalLang = {
                selectAll: "Velg alle",
                selectNone: "Velg ingen",
                reset: "Angre alle",
                search: "Søk...",
                nothingSelected: "Velg..."
            };
            return scope;
        }
        function getComplications(level, locations, resource) {
            return _.map(locations, function (location) {
                return resource.query({ location: location, level: level }).$promise;
            });
        }
        fracregControllers.controller('FracRegCtrl', ['$scope', '$http', '$q', '$modal',
            'PreviousProcedures',
            'Facilities',
            'SecondaryProcedureReasons',
            'AOCodes',
            'Dislocations',
            function ($scope, $http, $q, $modal, PreviousProcedures, Facilities, SecondaryProcedureReasons, AOCodes, Dislocations) {
                $scope = initializeScope($scope);
                $scope.updateComplications = function () {
                    _.each(['none', 'simple', 'serious'], function (level) {
                        var attr = level + 'Complications';
                        if ($scope.previousFacility) {
                            var requests = getComplications(level, [$scope.previousFacility.code], SecondaryProcedureReasons);
                            $q.all(requests).then(function (results) {
                                $scope[attr] = _.map(_.flatten(results), function (r) {
                                    return { id: r.id, text: r.text, selected: false };
                                });
                            });
                        }
                        else {
                            $scope[attr] = [];
                        }
                    });
                };
                $scope.aoPrefixClicked = function (prefix) {
                    var modalInstance = $modal.open({
                        templateUrl: 'aoSelectionDialog.html',
                        controller: 'AOSelectionInstanceCtrl',
                        resolve: {
                            prefix: function () { return prefix; }
                        }
                    });
                    modalInstance.result.then(function (aoInfo) {
                        $scope.aoInfo = aoInfo;
                    }, function () {
                    });
                };
                var facilities = Facilities.query({}, function () {
                    $scope.facilities = facilities;
                });
                $scope.$watch('previousFacility', function () {
                    if ($scope.previousFacility) {
                        var procedures = PreviousProcedures
                            .query({ facility: $scope.previousFacility.code }, function () {
                            $scope.previousProcedures = procedures;
                        });
                    }
                    else {
                        $scope.previousProcedures = [];
                    }
                    $scope.updateComplications();
                });
                $scope.$watch('previousProcedure', function () {
                    if ($scope.previousProcedure) {
                        var info = AOCodes.get({ code: $scope.previousProcedure.ao_code }, function () {
                            $scope.aoInfo = info;
                        });
                        $scope.date = new Date($scope.previousProcedure.date.getTime());
                        $scope.hour = $scope.previousProcedure.hour;
                        $scope.treatmentDelay.selected = _.findWhere($scope.treatmentDelay.options, { id: $scope.previousProcedure.delay });
                        $scope.dislocation.selected = _.findWhere($scope.dislocation.options, { id: $scope.previousProcedure.dislocation });
                        $scope.openFractureClassification.selected = _.findWhere($scope.openFractureClassification.options, { id: $scope.previousProcedure.open_fracture_classification });
                        $scope.pathology.selected = _.filter($scope.pathology.options, function (p) {
                            return _.contains($scope.previousProcedure.pathology, p.id);
                        });
                        $scope.pathologyDescription = $scope.previousProcedure.pathology_description;
                    }
                });
                $http.get('/treatment_delays').then(function (response) {
                    $scope.treatmentDelay.options = response.data;
                    $scope.treatmentDelay.selected = $scope.treatmentDelay.options[0];
                }, function (response) {
                });
                $scope.$watch('aoInfo', function () {
                    if ($scope.aoInfo) {
                        var dislocations = Dislocations
                            .query({ ao_code: $scope.aoInfo.id }, function () {
                            $scope.dislocation.options = dislocations;
                        });
                    }
                });
                $http.get('/open_fracture_classifications').then(function (response) {
                    $scope.openFractureClassification.options = response.data;
                }, function (response) {
                });
                $http.get('/pathologies').then(function (response) {
                    $scope.pathology.options = response.data;
                }, function (response) {
                });
                $http.get('/main_methods').then(function (response) {
                    $scope.mainMethod.options = response.data;
                    $scope.secondaryMethods.options = response.data;
                }, function (response) {
                });
                $http.get('/additional_procedures').then(function (response) {
                    $scope.additionalProcedures = _.map(response.data, function (r) {
                        return { id: r.id, text: r.text, selected: false };
                    });
                }, function (response) {
                });
                $http.get('/repositioning').then(function (response) {
                    $scope.repositioning.options = response.data;
                    $scope.repositioning.selected = $scope.repositioning.options[0];
                }, function (response) {
                });
                $http.get('/cast').then(function (response) {
                    $scope.cast.options = response.data;
                    $scope.cast.selected = $scope.cast.options[0];
                }, function (response) {
                });
                $http.get('/cast').then(function (response) {
                    $scope.cast.options = response.data;
                    $scope.cast.selected = $scope.cast.options[0];
                }, function (response) {
                });
                $http.get('/wound_treatment').then(function (response) {
                    $scope.woundTreatment.options = response.data;
                    $scope.woundTreatment.selected = $scope.woundTreatment.options[0];
                }, function (response) {
                });
                $http.get('/transplants').then(function (response) {
                    $scope.transplant.options = response.data;
                    $scope.transplant.selected = $scope.transplant.options[0];
                }, function (response) {
                });
                $scope.getSelected = function (group) {
                    return _.filter(group, function (g) { return g.selected; });
                };
            }]);
    })(Controller = FracReg.Controller || (FracReg.Controller = {}));
})(FracReg || (FracReg = {}));
//# sourceMappingURL=fracregControllers.js.map