
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabBar/me/index","pages/admin/tip","pages/admin/disablePhone","pages/admin/forgetPsd","pages/admin/resetPsd","pages/admin/login","pages/tabBar/home/index","pages/tabBar/appeal/index","pages/tabBar/policy/index","pages/tabBar/me/index","pages/me/resetPsd","pages/me/feedback","pages/home/depart-detail","pages/appeal/form/index","pages/policy/search","pages/policy/detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#007AFF","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/tabBar/home/index","iconPath":"static/img/tabBar/home.png","selectedIconPath":"static/img/tabBar/home-active.png","text":"首页"},{"pagePath":"pages/tabBar/appeal/index","iconPath":"static/api.png","selectedIconPath":"static/apiHL.png","text":"申诉"},{"pagePath":"pages/tabBar/policy/index","iconPath":"static/extui.png","selectedIconPath":"static/extuiHL.png","text":"政策"},{"pagePath":"pages/tabBar/me/index","iconPath":"static/img/tabBar/center.png","selectedIconPath":"static/img/tabBar/center-active.png","text":"我"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"base","compilerVersion":"3.1.11","entryPagePath":"pages/tabBar/me/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabBar/me/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/admin/tip","meta":{},"window":{"titleNView":false}},{"path":"/pages/admin/disablePhone","meta":{},"window":{"titleNView":false}},{"path":"/pages/admin/forgetPsd","meta":{},"window":{"titleNView":false}},{"path":"/pages/admin/resetPsd","meta":{},"window":{"titleNView":false}},{"path":"/pages/admin/login","meta":{},"window":{"titleNView":false}},{"path":"/pages/tabBar/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/tabBar/appeal/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"申诉"}},{"path":"/pages/tabBar/policy/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"政策","navigationBarBackgroundColor":"#23A8F2","navigationBarTextStyle":"white","titleNView":false}},{"path":"/pages/me/resetPsd","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#377EB4","backgroundColor":"#377EB4","navigationBarTitleText":"修改密码"}},{"path":"/pages/me/feedback","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#377EB4","backgroundColor":"#377EB4","navigationBarTitleText":"意见反馈"}},{"path":"/pages/home/depart-detail","meta":{"isNVue":true},"window":{"navigationBarTitleText":"科室累计情况详情"}},{"path":"/pages/appeal/form/index","meta":{},"window":{"navigationBarTitleText":"申诉"}},{"path":"/pages/policy/search","meta":{"isNVue":true},"window":{"navigationBarTextStyle":"white","titleNView":{"backgroundColor":"#23A8F2","backButton":{"color":"#ffffff"},"searchInput":{"autoFocus":true,"align":"left","backgroundColor":"#ffffff","borderRadius":"5px","placeholder":"搜索"}}}},{"path":"/pages/policy/detail","meta":{},"window":{"navigationBarTitleText":"政策详情"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
