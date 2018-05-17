angular.module("campaign.controllers").controller('selectFontsCtrl', ['$scope',
  function($scope) {
    $scope.openPlugPop();
    $scope.selectFontObj = {
      "filterGX": $scope.$parent.$parent.fontRelation ? $scope.$parent.$parent.fontRelation : "AND",
      "filterLists": $scope.$parent.$parent.fontLists ? $scope.$parent.$parent.fontLists.slice() : [],
      "filterInputVal": "",
      "addFilterList": function() {
        var _this = this,
            hasFilterKeyWorldFlag = false;
        angular.forEach(_this.filterLists, function(val, key) {
          if (_this.filterInputVal == val) {
            hasFilterKeyWorldFlag = true;
          }
        });
        if (hasFilterKeyWorldFlag) {
          $scope.filterKeyWorldErrorText = "关键字不可以重复";
        } else if (_this.filterInputVal == "") {
          $scope.filterKeyWorldErrorText = "请填写关键字";
        } else if (_this.filterInputVal.length > 30) {
          $scope.filterKeyWorldErrorText = "每个关键字最大30个字符";
        } else if (/,|，/gi.test(_this.filterInputVal)) {
          $scope.filterKeyWorldErrorText = "关键字不能包含逗号";
        };
        if (_this.filterInputVal == "" || hasFilterKeyWorldFlag || (_this.filterInputVal.length > 30 || /,|，/gi.test(_this.filterInputVal))) {
          $scope.filterKeyWorldError = true;
          angular.element(".keyWorldPop .borderHighlight").addClass("isError");
        } else {
          angular.element(".keyWorldPop .borderHighlight").removeClass("isError");
          _this.filterLists.push(_this.filterInputVal);
          $scope.filterKeyWorldError = false;
        }
        _this.filterInputVal = "";
      },
      "delFilterFont": function(i) { //del keyWorld
        this.filterLists.splice(i, 1);
      },
      "filterSure": function() {
        $scope.$parent.$parent.fontLists = this.filterLists.slice();
        $scope.$parent.$parent.fontRelation = this.filterGX;
      }
    }
  }
]);
