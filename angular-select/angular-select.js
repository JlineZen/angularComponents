/**
 * @dependency angular ^1.5.8
 */
(function(angular) {
    function toggle(element) {
        if (element && element.style.display == "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }

    function hide(element) {
    	element && (element.style.display = "none");
    }
    angular.module('ngSelect', []).directive('dropDown', ['$document', function dropDown($document) {
        return {
            restrict: 'E',
            require: '^ngModel',
            replace: true,
            scope: {
                options: '=',
                ngModel: '=',
                ngChange: '&'
            },
            link: function(scope, element, attrs) {
                var input = element.find('input'),
                    ul = element.find('ul');
                // 设置宽度
                ul[0].style.width = input[0].offsetWidth + 'px';
                ul[0].style.top = input[0].offsetHeight + 'px';
                // 绑定事件
                input.on('click', function(e) {
                	// 阻止冒泡
                	e.stopPropagation();
                    toggle(ul[0]);
                });
                // li事件绑定
                scope.optionFn = function(e) {
                	// 阻止冒泡
                    e.stopPropagation();
                    scope.ngModel = e.target.innerHTML;
                    // 模拟select标签 ngChange
                    scope.ngChange({value: scope.ngModel});
                    toggle(ul[0]);
                };

                // 点击其他地方 隐藏
                $document.on('click', function(e) {
                	hide(ul[0]);
                });
            },
            template: '<div class="ng-select">' + 
	            '<input class="ng-model" type="text" ng-model="ngModel"' + 
	            'readonly />' + 
	            '<ul class="ng-options">' + 
	            	'<li ng-click="optionFn($event);" class="ng-option"' 
	            	+ 'ng-repeat="option in options" ng-bind="option">' + 
	            	'</li>' + 
	            '</ul>' + 
            '</div>'
        }
    }]);
})(window.angular);