<template>
	<view>
		<view :style="{height:barHeight+'px'}"></view>
		<view class="fix-part" :style="{height:barHeight+'px',backgroundColor:color}"></view>
	</view>
	
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

<style scoped>
	.fix-part {
		position: fixed;
		top: 0;
		width:750rpx;
		z-index: 1;
	}
</style>
