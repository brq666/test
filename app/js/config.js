/**
 * @author Created by taoyong
 * @Date  on 2016/11/14.
 * 打包rootStatic做替换
 */
;(function() {
  var version = 'v1';
  var CONFIGUAL = window.CCMS_INFOS_CONFIG.UAL || '';
  window.GLOBAL_STATIC = {
    cookies: JSON.parse(Cookies.get('USERINFO')),
    Credentials: JSON.parse(localStorage.getItem('ccmsRequestCredential')),
    getCredentials: function() {
      return JSON.parse(localStorage.getItem('ccmsRequestCredential'))
    },
    rootModule: (location.pathname.indexOf('portal/index') != -1) ? '/ccms' : '/app',
    ualRoot: CONFIGUAL,
    portalRoot: CONFIGUAL + '/web-portal/',
    dashboardRoot: CONFIGUAL + '/web-dashboard/' + version + '/',
    systemRoot: CONFIGUAL + '/web-system/' + version + '/',
    campaignRoot: CONFIGUAL + '/campaign/' + version + '/web/',
    nodeRoot: CONFIGUAL + '/node/' + version + '/web/',
    datamanageRoot: CONFIGUAL + '/common-component/' + version + '/web/',
    datamanageDomain: '/common-component/' + version + '/',
    componentRoot: CONFIGUAL + '/common-component/' + version + '/',
    orgsRoot: CONFIGUAL + '/epassport/' + version + '/',
    decathlonRoot: CONFIGUAL + '/decathlon-custv/' + version + '/'
  };
})();
