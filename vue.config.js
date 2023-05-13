const webpack = require("webpack")
module.exports = {
	assetsDir: 'static',
	publicPath: process.env.NODE_ENV == 'development' ? '/' : '../web/',
	outputDir: './dist',
	indexPath: 'index.html',
	productionSourceMap: false,
	lintOnSave: false,
	filenameHashing: true,
	css: {
		loaderOptions: {
			postcss: {
				// 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
				plugins: [
					require('postcss-px2rem-exclude')({
						remUnit: 75,
						exclude: /node_modules/i  //这是为了不影响第三库的样式，如果入写，会导致vant的样式会变小
					})
				]
			},
			sass:{
				prependData:`@import "@/assets/style/variables.scss";`
			}
		}
	},
	devServer: {
		hot: true,
		port: 8080,
		open: false,
		noInfo: false,
		overlay: {
			warnings: true,
			errors: true,
		},
		proxy:{
			"baidupi":{
				target:'https://baidu.com/api/',
				changeOrigin: true,
				pathRewrite:{
					"^/baidupi":"/"
				}
			},
		}
	}
}
