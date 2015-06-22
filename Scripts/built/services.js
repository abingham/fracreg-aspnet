/// <reference path="lib/angularjs/angular.d.ts" />
/// <reference path="lib/angularjs/angular-resource.d.ts" />
/// <reference path="lib/underscore/underscore.d.ts" />
/// <reference path="controllers/fracregControllers.ts" />
var FracReg;
(function (FracReg) {
    var Service;
    (function (Service) {
        var fracregServices = angular.module('fracregServices', ['ngResource']);
        fracregServices.factory('PreviousProcedures', ['$resource',
            function ($resource) {
                return $resource('/PreviousProcedures/:facility', {}, {
                    query: { method: 'GET',
                        params: {},
                        isArray: true,
                        transformResponse: function (data, headersGetter) {
                            var response = angular.fromJson(data);
                            response = _.map(response, function (r) {
                                r.date = new Date(r.date);
                                return r;
                            });
                            return response;
                        }
                    }
                });
            }]);
        fracregServices.factory('Facilities', ['$resource',
            function ($resource) {
                return $resource('/Facilities', {}, {
                    query: { method: 'GET', params: {}, isArray: true }
                });
            }]);
        fracregServices.factory('SecondaryProcedureReasons', ['$resource',
            function ($resource) {
                return $resource('/secondary_procedure_reasons/:location/:level', {}, {
                    query: { method: 'GET', isArray: true }
                });
            }]);
        fracregServices.factory('AOCodes', ['$resource',
            function ($resource) {
                return $resource('/AOCodes/Info/:code');
            }]);
        fracregServices.factory('Dislocations', ['$resource',
            function ($resource) {
                return $resource('/dislocations/:ao_code');
            }]);
    })(Service = FracReg.Service || (FracReg.Service = {}));
})(FracReg || (FracReg = {}));
//# sourceMappingURL=services.js.map