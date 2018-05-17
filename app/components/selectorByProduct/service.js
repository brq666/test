angular.module('components.selectorByProduct')
	.service('ProductResources', ['$resource', '$httpParamSerializerJQLike', function($resource, $httpParamSerializerJQLike) {
    return {
      // 选择器
      tree: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:pkid/tree', {pkid: '@pkid', type: 'shop'}),										// 选择器菜单
      // searchColumn: $resource(GLOBAL_STATIC.componentRoot  + 'shop/selector/:type/searchColumn'),						// 选择器搜索配置
      searchColumn: $resource(GLOBAL_STATIC.componentRoot  + 'product/metas/:subjectId/:shopId/conditions/cfg'),
      cloume: $resource(GLOBAL_STATIC.componentRoot + 'product/metas/:subjectId/view/cfg'),							// 选择器数据
      choose: $resource(GLOBAL_STATIC.componentRoot + 'product/selector/:tenantId/search/product', { tenantId: '@tenantId' }, {
        query: {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          cancellable: true,
          transformRequest: function (data) {
            return $httpParamSerializerJQLike(data);
          }
        }
      }),			// 选择器数据
      edecathlonChoose: $resource(GLOBAL_STATIC.componentRoot + 'product/selector/2/search/product/edecathlon', {type: '@tenantId'})	,			// 选择器数据
      chooseView: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:type/choose/:cid', {type: '@type'})	,
      shops: function(segmentationId, success, error) {
        var ShopResource = $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:segmentationId/all', {type: '@segmentationId'}, {
          getShops: {
            method: 'GET',
            isArray: true
          }
        });
        return ShopResource.getShops({segmentationId: segmentationId}, success, error);
      }
    };
  }]);
