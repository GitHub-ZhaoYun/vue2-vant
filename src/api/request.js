import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';


//创建请求实例
const instance = axios.create({
	baseURL:process.env.NODE_ENV === 'production' ? ".." : "http://10.0.0.159:8088/portal",
	timeout: 10000,
	headers:{
		'Content-Type': 'application/json;charset=UTF-8',
	}
})


// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		if(config.method=='post'){
			config.data = {
				sid:sid,
				...config.data				
			}
		}else if(config.method=='get'){
			config.params = {
				sid:sid,
				...config.params
			}
		}
		if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
		config.data = qs.stringify(config.data)
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}	
)

// 添加响应拦截器
instance.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		if(response.data.result == 'ok' || response.data.result == 'OK'){
			// console.log(response)
			return response;
		}else{
			//console.log(response)
			if(response.data.errorCode){
				switch (response.data.errorCode){
					case "401":
						Message.error({
							message: '用户没有权限',
							duration: 1500
						})
						break;
					case "403":
						Message.error({
							message: '登录过期，请重新登录',
							duration: 1500
						})
						break;
					case "404":
						Message.error({
							message: '网络请求不存在',
							duration: 1500
						})
						break;
					default:
						Message.error({
							message: response.data.msg,
							duration: 1500
						})
						break;
				}
			}else if(response.data.result){
				Message.error({
					message: response.data.msg,
					duration: 1500
				})
			}
		}
		
	},
	(error) => {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
)


export default instance