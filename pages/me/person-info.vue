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
				<text class="title">医院：</text>
				<text class="content">{{info.hosNm}}</text>
			</view>
			
			<view class="row">
				<text class="title">科室：</text>
				<text class="content">{{info.deptNm}}</text>
			</view>
			
			<view class="row">
				<text class="title">职称：</text>
				<text class="content">{{info.docTitle}}</text>
			</view>
			
			<view class="row">
				<text class="title">职务：</text>
				<text class="content">{{info.docPost}}</text>
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
					phonenumber:''
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
		height:18vh;
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
			border-radius:15rpx;
			padding:20rpx 0;
			.avatar-center {
				position: relative;
				bottom: 90rpx;
			}
			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				margin-bottom:15rpx;
			}
			.phone {
				font-size: 28rpx;
				font-weight: 600;
				color: #333;
			}
		}
	}
	.detail-part {
		padding: 150rpx 120rpx;
		.row {
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding:20rpx 0 ;
			.title {
				display: inline-block;
				font-size: 31rpx;
				font-weight: 600;
				width:150rpx;
				text-align: right;
			}
			.content {
				flex:1;
				font-size: 31rpx;
			}
		}
	}
</style>
