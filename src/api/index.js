import request from './request.js'

//get请求示例
export function getDemo() {
	return request({
		url: '/r/jd',
		method: 'get',
		params:{
			
		}
	})
}

//post请求示例
export function postDemo() {
	return request({
		url: '/r/jd',
		method: 'post',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
		},
		data:{
			
		}
	})
}
