/// <reference path="lib/angularjs/angular.d.ts"/>
'use string';
var FracReg;
(function (FracReg) {
    var App;
    (function (App) {
        var fracregApp = angular.module('fracregApp', [
            'aoSelectionControllers',
            'fracregControllers',
            'fracregFeedbackControllers',
            'fracregDirectives',
            'isteven-multi-select'
        ]);
    })(App = FracReg.App || (FracReg.App = {}));
})(FracReg || (FracReg = {}));
//# sourceMappingURL=app.js.map