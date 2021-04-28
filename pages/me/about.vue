<template>
	<view class="flex-center flex-dir-column wrap">
		<view class="flex-center flex-dir-row logo-part">
			<image class="logo" src="../../static/img/base/logo.png"></image>
			<text class="app-name">医疗应用软件</text>
		</view>
		
		<text class="edition">版本 1.0.0</text>
		
		<view class="update-btn">
			<text class="btn-txt">检查更新</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding:150rpx 0 0;
	}
	.logo-part {
		.logo {
			width:100rpx;
			height:100rpx;
		}
		.app-name {
			font-size: 33rpx;
			margin-left:30rpx;
		}
	}
	.edition {
		margin-top:40rpx;
		font-weight: 600;
	}
	.update-btn {
		margin-top:50rpx;
		.btn-txt {
			color:#3B43F2;
		}
	}
</style>
