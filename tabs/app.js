angular.module('ui.tab', [])
    .component('tabs', {
        bindings: {
            tabsList: '<',
            selected: '@'
        },
        transclude: true,
        controller: function() {
            this.selectedTab = function(index) {
                this.tabsList.forEach(function() {
                    this.selected = false;
                });
                this.tabsList[index].selected = true;
            };
            this.selectedTab(this.selected || 0);
        },
        template: '<tab ng-repeat="tab in $ctrl.tabsList" tab="tab"></tab>'
    })
    .component('tab', {
        bindings: {
            tab: '<'
        },
        require: {
            tabs: '^^'
        },
        controller: function() {
            console.log(this.tabs);
        },
        template: '<div><a href="#" ng-bind="$ctrl.tab.label"></a><div ng-if="$ctrl.tab.selected" ng-bind="$ctrl.tab.content"></div></div>'
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