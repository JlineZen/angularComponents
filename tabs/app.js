angular.module('ui.tab', [])
    .component('tabs', {
        bindings: {
            tabsList: '<',
            selected: '@'
        },
        transclude: true,
        controller: function() {
            this.selectedTab = function(index) {
                this.tabsList.forEach(function(tab) {
                    tab.selected = false;
                });
                this.tabsList[index].selected = true;
            };
            this.selectedTab(this.selected || 0);
        },
        template: '<div class="tab-container">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="tab in $ctrl.tabsList">' +
            '<a href="javascript:void(0);" ng-class="{\'active\': tab.selected}"' +
            'ng-bind="tab.label" ng-click="$ctrl.selectedTab($index);"></a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content">' +
            '<tab ng-repeat="tab in $ctrl.tabsList" tab="tab"></tab>' +
            '</div>' +
            '</div>'
    })
    .component('tab', {
        bindings: {
            tab: '<'
        },
        require: {
            tabs: '^^'
        },
        controller: function() {

        },
        template: '<div class="tab-pane" ng-if="$ctrl.tab.selected"><p ng-bind="$ctrl.tab.content"></p></div>'
    })
    .controller('demoCtrl', function() {
        var vm = this;
        vm.tabsList = [{
                label: 'tab1',
                content: 'tab1 content',
                selected: false
            },
            {
                label: 'tab2',
                content: 'tab2 content',
                selected: false
            }
        ];
    });