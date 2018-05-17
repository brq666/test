/**
 * @author Created by taoyong
 * @Date  on 2016/11/2.
 */
var root = '';
mxBasePath = GLOBAL_STATIC.rootModule + '/modules/marketing/mxGraph';
mxImageBasePath = GLOBAL_STATIC.rootModule + '/modules/marketing/mxGraph';
window.CAMPAIGN_STATIC = {
  tenantId: window.sessionStorage.getItem('tenantId'),
  userName: GLOBAL_STATIC.cookies.name,
  useID: GLOBAL_STATIC.cookies.sub ,
  campUserName: GLOBAL_STATIC.cookies.name,
  tplBasePath:  GLOBAL_STATIC.rootModule + '/modules/marketing/'
};
