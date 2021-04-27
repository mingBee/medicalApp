<template>
	<view :style="{height:barHeight+'px',backgroundColor:color}"></view>
</template>

<script>
	export default{
		props:{
			color:{
				type:String,
				default:"#fff"
			}
		},
		data(){
			return {
				barHeight:0
			}
		},
		mounted(){
			this.getFunBarheight();
		},
		methods:{
			getFunBarheight(){
				this.barHeight = uni.getSystemInfoSync().statusBarHeight; //状态栏高度
			}
		}
	}
</script>

<style>
</style>
