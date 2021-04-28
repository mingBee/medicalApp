<template>
	<view>
		<view class="top-part">
			
			<view class="avatar-part">
				<view class="flex-center flex-dir-column  avatar-center">
					<image class="avatar" :src="info.avatarUrl"></image>
					<text class="phone">{{info.phonenumber}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="detail-part">
			<view class="row">
				<text class="title">您的医院：</text>
				<text class="content"></text>
			</view>
			
			<view class="row">
				<text class="title">科室：</text>
				<text class="content"></text>
			</view>
			
			<view class="row">
				<text class="title">职称：</text>
				<text class="content"></text>
			</view>
			
			<view class="row">
				<text class="title">职务：</text>
				<text class="content"></text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { personInfo } from "@/fetch/api/me/index.js"
	export default{
		data(){
			return {
				info:{
					avatarUrl: "../../static/img/me/user-avatar.png",
					phonenumber:'18482329095'
				}
			}
		},
		onLoad(){
			this.personInfo();
		},
		methods:{
			/**
			 * 获取用户信息
			 */
			personInfo(){
				personInfo().then(res=>{
					this.info = res;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-part {
		position: relative;
		height:21vh;
		background-color: #377EB4;
		border-bottom-left-radius: 30%;
		border-bottom-right-radius: 30%;
		.avatar-part {
			position: absolute;
			bottom: 0;
			left:50%;
			transform: translate(-50%,30%);
			background-color: #fff;
			width:500rpx;
			height:100rpx;
			z-index: 1;
			border:1px solid #f0f0f0;
			border-radius:20rpx;
			padding:20rpx 0;
			.avatar-center {
				position: relative;
				bottom: 90rpx;
			}
			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-bottom:15rpx;
			}
			.phone {
				font-size: 26rpx;
				color: #333;
			}
		}
	}
	.detail-part {
		padding: 150rpx 200rpx;
		.row {
			padding:15rpx 0 ;
			.title {
				display: inline-block;
				font-size: 27rpx;
				font-weight: 600;
				width:150rpx;
				text-align: left;
			}
			.content {
				font-size: 27rpx;
			}
		}
	}
</style>
