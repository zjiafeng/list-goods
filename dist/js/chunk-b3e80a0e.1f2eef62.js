(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3e80a0e"],{"40d9":function(t,a,s){"use strict";var n=s("6a07"),e=s.n(n);e.a},"6a07":function(t,a,s){},b894:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=this,s=a.$createElement,n=a._self._c||s;return a.show?n("div",{staticClass:"right"},[n("h2",[a._v("我的信息")]),n("p",[n("span",[a._v("用户名：")]),n("span",[a._v(a._s(a.data.username))])]),n("p",[n("span",[a._v("电 话：")]),n("span",[a._v(a._s(a.data.phone))])]),n("p",[n("span",[a._v("邮 箱：")]),n("span",[a._v(a._s(a.data.email))])]),n("p",[n("span",[a._v("问 题：")]),n("span",[a._v(a._s(a.data.question))])]),n("p",[n("span",[a._v("答 案：")]),n("span",[a._v(a._s(a.data.answer))])]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(){t.$router.push({path:"/index/myshop/myshop3"})}}},[a._v("编辑")])],1):a._e()},e=[],i={data:function(){return{data:{},show:!0}},methods:{getData:function(){var t=this,a=this.$qs.stringify({username:this.$store.state.token.username});this.$axios.post("/user/get_user_info.do",a).then(function(a){200==a.status&&(t.data=a.data.data)})}},mounted:function(){this.$store.state.token&&this.getData()}},o=i,p=(s("40d9"),s("2877")),u=Object(p["a"])(o,n,e,!1,null,"34a76df0",null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-b3e80a0e.1f2eef62.js.map