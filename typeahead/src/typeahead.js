angular
    .module('ui.typeahead', [])
    .filter('keyword', function() {
        return function(lists, input) {
            if (input) {
                return lists.filter(function(list) {
                    if (list.indexOf(input) > -1) {
                        return list;
                    }
                })
            } else {
                return lists;
            }
        }
    })
    .directive('typeAhead', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                lists: '='
            },
            link: function($scope, $element) {
                $element.find('input').on('focus', function() {
                    $element.addClass('show');
                });

                $scope.liClick = function(text) {
                    $scope.filterText = text;
                    $element.removeClass('show');
                };
            },
            templateUrl: function($attrs) {
                return $attrs.templateUrl || './typeahead.html';
            }
        };
    });