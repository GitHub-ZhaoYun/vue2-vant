import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)
export default new Router({
	mode:"hash",
	base:process.env.BASE_URL,
	routes:[{
		path:'/',
		redirect:'/Index'
	},{
		path:'/Index',
		name:'Index',
		component :()=> import('@/views/index.vue'),
		meta:{
			title:'首页',
			index:1,
			keepAlive:false
		},
	}]
})