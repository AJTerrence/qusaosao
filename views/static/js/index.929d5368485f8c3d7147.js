webpackJsonp([7],{16:function(t,e,n){function s(t){n(73)}var i=n(2)(n(34),n(92),s,null,null);t.exports=i.exports},34:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=(n(0),n(1));n.n(s);e.default={components:{},data:function(){return{}},methods:{_goDevice:function(){window.location.href="./device.html"},_scan:function(){wx.scanQRCode({needResult:0,scanType:["qrCode","barCode"],success:function(t){var e=t.resultStr;console.log(e)}})},_goGains:function(){window.location.href="./gains.html"}},mounted:function(){}}},52:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),i=n(16),c=n.n(i);s.a.config.productionTip=!1,new s.a({el:"#index",template:"<index/>",components:{index:c.a}})},73:function(t,e){},92:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"index"}},[t._m(0),t._v(" "),n("div",{staticClass:"device",on:{click:function(e){t._goDevice()}}},[n("p",[t._v("设备管理")]),t._v(" "),n("p",{staticClass:"num"},[t._v("共1台，在线0台")])]),t._v(" "),n("ul",{staticClass:"regist"},[n("li",{on:{click:function(e){t._scan()}}},[n("p",[t._v("设备注册")]),t._v(" "),n("p",[t._v("扫描设备二维码")])]),t._v(" "),n("li",{on:{click:function(e){t._goGains()}}},[n("p",[t._v("经营统计")]),t._v(" "),n("p",[t._v("经营数据监控")])])]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{staticClass:"header-t"},[n("p",[t._v("今日收益 (元)")]),t._v(" "),n("h3",[t._v("0.60")])]),t._v(" "),n("ul",{staticClass:"header-m"},[n("li",{staticClass:"online"},[n("p",[t._v("在线支付")]),t._v(" "),n("p",[t._v("0.00元")])]),t._v(" "),n("li",{staticClass:"ad"},[n("p",[t._v("广告收益")]),t._v(" "),n("p",[t._v("0.60元")])]),t._v(" "),n("li",{staticClass:"cash"},[n("p",[t._v("现金收益")]),t._v(" "),n("p",[t._v("0.00元")])])]),t._v(" "),n("ul",{staticClass:"header-b"},[n("li",[n("p",[t._v("礼品消耗")]),t._v(" "),n("p",[t._v("0个")])]),t._v(" "),n("li",[n("p",[t._v("线下投币")]),t._v(" "),n("p",[t._v("7个")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"person"},[n("div",[n("span",[t._v("我的账号")]),t._v(" "),n("span",{staticClass:"radius"},[t._v("可设置商户名称")])]),t._v(" "),n("p",[t._v("钱包、投放地址、消息设置")])])}]}}},[52]);
//# sourceMappingURL=index.929d5368485f8c3d7147.js.map