angular.module("campaign.dataServices").service("MarketResource", ["$resource", function($resource) {
  return {
    MarketConditions: $resource(GLOBAL_STATIC.campaignRoot + 'campaign/config/valid/canvas/:id', {id: '@id'}, {
      get: {
        method: 'GET',
        isArray: true
      }
    }),
    Marketing: $resource(GLOBAL_STATIC.campaignRoot + 'campaign/:id', {id: '@id'}, {
      update: {
        method: 'PUT' 
      }
    }),
    Organization: $resource(GLOBAL_STATIC.orgsRoot + 'admin/orgs/page')
  }
}])