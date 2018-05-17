angular.module("campaign.controllers").controller('discountECBelleCtrl', ["$scope", "getListService", function($scope, getListService) {
	$scope.openNodePop(); //调用弹框方法

	var beforeCouponRuleCode = "",
			discType = ["", "金额", "折扣"],
			settlementPrice = ["", "抵牌价", "抵结算价", "先促销再用券再内外卡"];

	$scope.ecScopeObj = {
	  "name": "百丽优惠券",
		"brandCode": ""
	};

	$scope.ecScopeFormatObj = {};

	function replaceData(_data) {
		Object.keys(_data).forEach(function(key) {
			if (key === "outputType") {
				$scope.ecScopeFormatObj.targetClient = _data.outputType ? String(_data.outputType) : "0";
			} else {
				$scope.ecScopeObj[key] = _data[key] || "";
			}
		});
		$scope.ecScopeFormatObj.discTypeFormat = discType[$scope.ecScopeObj.discType];
		$scope.ecScopeFormatObj.settlementPriceFormat = settlementPrice[$scope.ecScopeObj.settlementPrice];
	}

	function getEditorData() {
		$scope.ecScopeObj.outputType = +$scope.ecScopeFormatObj.targetClient;
		return $scope.ecScopeObj;
	}

	$scope.ecScopeFunc = {
		"openDiscountEcBelle": function() {
			getListService.openDiscountEcBelle(function(response) {
				beforeCouponRuleCode = response.couponRuleCode;
				replaceData(response);
			});
		},
		"initDiscountEcBelle": function(data) {
			Object.keys(data).forEach(function(key) {
				if (key !== 'name' && key !== 'couponRuleCode' && key !== 'brandCode' && key !== 'id') {
					$scope.ecScopeObj[key] = null;
				}
			});
		},
		"hideWarning": function() {
			$('#couponRuleCodeWraning').css('display', 'none');
      $("div:contains('优惠券规则代码')").prev('input').removeClass('border_warning');
		},
		"getDiscountCouponBelle": function() {
			if (beforeCouponRuleCode === $scope.ecScopeObj.couponRuleCode) {
				return false;
			}
			beforeCouponRuleCode = $scope.ecScopeObj.couponRuleCode;
			this.initDiscountEcBelle($scope.ecScopeObj);//请求优惠券规则前 清除上一次的数据
			getListService.getDiscountCouponBelle(function(response) {
				replaceData(response);
			}, beforeCouponRuleCode);
		},
		"postDiscountEcBelleData": function(ent) {
			if ($scope.ecScopeObj.couponRuleCode == "" ) {
        return false;
      };
			if (!$scope.ecScopeObj.discType) {
				$('#couponRuleCodeWraning').css('display', 'block');
        $("div:contains('优惠券规则代码')").prev('input').addClass('border_warning');
				return false;
			}
			if ($scope.ecScopeObj.brandCode == "") {
				$("div:contains('品牌编码')").css('display','block');
        $("div:contains('品牌编码')").prev('input').addClass('border_warning');
				return false;
			}
			var element = angular.element(ent.target);

			disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
        getListService.postDiscountEcBelleData(function(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(response.id, response.name, $scope.nodecomment);
        }, getEditorData(), element);
      }, element);
		}
	}
	$scope.ecScopeFunc.openDiscountEcBelle();
}])
