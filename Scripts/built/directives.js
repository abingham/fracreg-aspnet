/// <reference path="lib/angularjs/angular.d.ts"/>
/// <reference path="lib/bootstrap-table.d.ts"/>
/// <reference path="lib/snap.svg/snapsvg.d.ts"/>
/// <reference path="controllers/fracregControllers.ts"/>
'use strict';
var FracReg;
(function (FracReg) {
    var Directive;
    (function (Directive) {
        var fracregDirectives = angular.module('fracregDirectives', [
            'ngSanitize',
            'ui.select'
        ]);
        fracregDirectives.directive('fracregFacilitiesTable', [function () {
                function link(scope, element, attrs) {
                    element.data('striped', 'true');
                    element.data('classes', 'table-condensed table');
                    element.data('click-to-select', 'true');
                    element.data('single-select', 'true');
                    element.bootstrapTable({
                        data: [],
                        columns: [{
                                field: 'state',
                                checkbox: 'true'
                            }, {
                                field: 'name',
                                title: 'Navn'
                            }],
                        formatNoMatches: function () { return ""; }
                    });
                    scope.$watch('facilities', function () {
                        if (scope.facilities) {
                            element.bootstrapTable('load', scope.facilities);
                        }
                    });
                    element.on('check.bs.table', function (e, row) {
                        scope.$apply(function () {
                            scope.previousFacility = { code: row.code, name: row.name };
                        });
                    });
                    element.on('uncheck.bs.table', function (e, row) {
                        scope.$apply(function () {
                            scope.previousFacility = null;
                        });
                    });
                }
                return {
                    link: link
                };
            }]);
        fracregDirectives.directive('fracregPreviousProceduresTable', [function () {
                function link(scope, element, attrs) {
                    element.data('striped', 'true');
                    element.data('classes', 'table-condensed table');
                    element.data('click-to-select', 'true');
                    element.data('single-select', 'true');
                    element.bootstrapTable({
                        data: [],
                        columns: [{
                                field: 'state',
                                checkbox: 'true'
                            }, {
                                field: 'date',
                                title: 'Operert'
                            }, {
                                field: 'procedure',
                                title: 'Skade/prosedyr'
                            }, {
                                field: 'side',
                                title: 'Side'
                            }]
                    });
                    scope.$watch('previousProcedures', function () {
                        element.bootstrapTable('load', scope.previousProcedures);
                    });
                    element.on('check.bs.table', function (e, row) {
                        scope.$apply(function () {
                            scope.previousProcedure = row;
                        });
                    });
                }
                return {
                    link: link
                };
            }]);
        fracregDirectives.directive('fracregSkeletonImage', [function () {
                function link(scope, element, attrs) {
                    var that = this;
                    $(element).find('#ao-skeleton-image')[0].addEventListener('load', function (event) {
                        var handle = Snap('#ao-skeleton-image');
                        var clickLayer = handle.select('g#click-layer');
                        var rects = [];
                        handle.selectAll('rect').forEach(function (r) { rects.push(r); });
                        rects = _.filter(rects, function (r) {
                            return r.node.id.search('ao-label-') == 0;
                        });
                        _.each(rects, function (r) {
                            var ao_code_prefix = r.node.id.substring(9, 11);
                            var bbox = r.getBBox();
                            var clickable = clickLayer.rect(bbox.x, bbox.y, bbox.width, bbox.height);
                            clickable.attr({
                                fill: "#000000",
                                opacity: 0,
                                id: 'ao-clickable-' + ao_code_prefix
                            });
                            clickable.click(function (evt) {
                                scope.aoPrefixClicked(evt.currentTarget.id.substring(13, 15));
                            });
                        });
                    });
                }
                return {
                    link: link
                };
            }]);
    })(Directive = FracReg.Directive || (FracReg.Directive = {}));
})(FracReg || (FracReg = {}));
//# sourceMappingURL=directives.js.map