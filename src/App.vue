<template>
  <div id="app">
		<!-- 页面切换动画transitionName -->
		<transition :name="transitionName">
			<!-- 缓存数据 <router-view> -->
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition :name="transitionName">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    
  </div>
</template>

<script>

export default {
  name: 'App',
	data() {
		return {
			transitionName: ""
		}
	},
	watch: {
		$route(to, from) {
			if (to.meta.index > 0 && from.meta.index) {
				if (to.meta.index < from.meta.index) {
					this.transitionName = "slide-right";
				} else {
					this.transitionName = "slide-left";
				}
			} else if (to.meta.index == 0 && from.meta.index > 0) {
				this.transitionName = "";
			}
		}
	}
}
</script>

<style lang="scss">
html,
body,
div,
p,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	padding: 0;
	font-size: 14px;
}
i,
li {
	list-style: none;
	font-style: normal;
}
html,
body,
#app {
	height: 100%;
	overflow-x: hidden;
	margin: 0;
	padding: 0;
	font-family: "microsoft yahei";
	color: #333;
}
#app {
	&>div {
		width: 100%;
		min-height: 100vh;
	}
}
body {
	animation: showOpacity 2s infinite;
	animation-iteration-count: 1;
}

@keyframes showOpacity {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

::-webkit-scrollbar-track {
	width: 6px;
	background: rgba(224, 226, 238, 1);
	-webkit-border-radius: 2em;
	-moz-border-radius: 2em;
	border-radius: 2em;
}

::-webkit-scrollbar-thumb {
	background-color: #6992dd;
	background-clip: padding-box;
	min-height: 28px;
	-webkit-border-radius: 2em;
	-moz-border-radius: 2em;
	border-radius: 2em;
}
/* 页面切换动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	/* will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置 */
	will-change: transform;
	transition: all ease 0.4s;
	-webkit-transition: all ease 0.4s;
	position: absolute;
	width: 100%;
	left: 0;
}

.slide-right-enter {
	transform: translateX(-100%);
	-webkit-transform: translateX(-100%);
}

.slide-right-leave-active {
	transform: translateX(100%);
	-webkit-transform: translateX(100%);
}

.slide-left-enter {
	transform: translateX(100%);
	-webkit-transform: translateX(100%);
}

.slide-left-leave-active {
	transform: translateX(-100%);
	-webkit-transform: translateX(-100%);
}
</style>
