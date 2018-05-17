angular.module("dashboard.controllers").controller('systemMessageController', ["$rootScope", "$scope", "$http", "dashboardService", "$q",
  function($rootScope, $scope, $http, dashboardService, $q) {
    $scope.close = function () {
      $scope.hidemesses = false
    }
    $scope.dashboadMessContent = false;

    $scope.readClick = function (index) {
      var notice = $scope.messes[index];
      var param = {
        'userName': DASHBOARD_STATIC.tenantId,
        'ccmsVersion': $rootScope.ccmsVersion,
        'id': parseInt(notice.noticeId)
      };
      $scope.isShowMessContent = true;
      notice.isRead || dashboardService.postNotice(param);
      notice.isRead = true;

      $scope.content = notice.content;
      $scope.contitle = notice.title;
      $scope.condate = notice.created;
    };

    $scope.hideContentDialog = function () {
      $scope.isShowMessContent = false;
    };


    $q.all($rootScope.shopInfoDefer ).then(function () {
      dashboardService.getNoticesList({
        'userName': DASHBOARD_STATIC.tenantId,
        'ccmsVersion': $rootScope.ccmsVersion,
        'pageSize': 100,
        'pageNo': 1
      }, getSystemMess, serverFail);
    });

    function getSystemMess(res) {
      res.data.forEach(function (item) {
        item.isRead = item.status === 1;
      });
      var data = res.data.filter(function (item) {
        //status: 0 未读, 1 已读
        return item.status !== 1;
      });

      if (data.length == 0) {
        $scope.hidemesses = false
      } else {
        $scope.hidemesses = true
      }
      $scope.messes = data;
    }

    function serverFail() {
      $scope.messes = [];
    };
  }
]);
