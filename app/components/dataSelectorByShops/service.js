angular.module('components.dataSelectorByShops')
	.service('dataShopsResources', ['$resource', function($resource) {
    return {
      // 选择器
      tree: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:pkid/tree', {pkid: '@pkid', type: 'shop'}),										// 选择器菜单
      searchColumn: $resource(GLOBAL_STATIC.componentRoot  + 'shop/selector/:type/searchColumn'),						// 选择器搜索配置
      cloume: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:type/choose/cloume'),							// 选择器数据
      choose: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:type/choose/:cid', {type: '@type'})				// 选择器数据
    };
  }]);
