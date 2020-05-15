import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state={
	token: null,
	isshows:false,
	msg:''
}
if(sessionStorage.getItem('userinfo')){
	//如果 本地存储中有用户数据 初始化 此数据
	state.token=JSON.parse(sessionStorage.getItem('userinfo'));
	state.msg=JSON.parse(sessionStorage.getItem('msg'));
}
export default new Vuex.Store({
	state,
	mutations: {
		myshop(state, data){
			state.msg=data
			sessionStorage.setItem('msg', JSON.stringify(data));
		},
		login: function(state, data) {
			state.token = data;
			//本地存储中保存一份用户的数据 方式刷新时数据的丢失
			sessionStorage.setItem('userinfo', JSON.stringify(data));
		},
		logout:function(state){
			state.token = null;
			sessionStorage.removeItem('userinfo');
		},
		addloading(state,load){
		  state.isshows = load;
		}
	},
  actions: {

  }
})
