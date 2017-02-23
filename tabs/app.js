angular.module('ui.tab', [])
    .component('tabs', {
        transclude: true,
        controller: function() {
            this.tabs = [];
            this.selectTab = function(tab) {
                angular.forEach(this.tabs, function(tab) {
                    tab.selected = false;
                });
                tab.selected = true;
            };
            this.addTab = function(tab) {
                if (this.tabs.length === 0) {
                    this.selectTab(tab);
                }
                this.tabs.push(tab);
            };
        },
        templateUrl: 'tabs.html'
    })
    .component('tab', {
        bindings: {
            label: '@'
        },
        require: {
            tabsCtrl: '^tabs'
        },
        transclude: true,
        controller: function() {
            this.$onInit = function() {
                this.tab = {
                    label: this.label,
                    selected: false
                }
                this.tabsCtrl.addTab(this.tab);
            };
        },
        templateUrl: 'tab.html'
    });