<template>
	<view class="center">
		<view class="logo" :hover-class="!hasLogin ? 'logo-hover' : ''">
			<image class="logo-img" :src="info.avatar || avatarUrl"></image>
			<view class="flex-between flex-dir-row logo-title">
				<view class="flex flex-dir-column  flex-align-start">
					<text class="uer-name">Hi，{{hasLogin ? info.userName : '您未登录'}}</text>
					<text class="user-phone" v-if="hasLogin">{{info.phonenumber}}</text>
					
				</view>
		<!-- 		<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png" v-if="hasLogin"></image> -->
			</view>
		</view>
		<view class="center-list">
			<!-- v-show="hasLogin && hasPwd" -->
			<view class="center-list-item" @click="goTo_resetPsd">
				<image class="item-icon" src="../../../static/img/me/clock.png"></image>
				<text class="list-text">修改密码</text>
				<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png"></image>
			</view>
			<!-- #ifdef APP-PLUS -->
<!-- 				<view v-if="hasLogin" class="center-list-item border-bottom" @click="toInvite">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">邀请好友</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
			<!-- #endif -->
		</view>
		<view class="center-list" @click="goTo_feedback">
			<view class="center-list-item">
				<image class="item-icon" src="../../../static/img/me/edit.png"></image>
				<text class="list-text">意见反馈</text>
				<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png"></image>
			</view>
		</view>
		
		<view class="center-list">
			<view class="center-list-item">
				<image class="item-icon" src="../../../static/img/me/star.png"></image>
				<text class="list-text">用户需知</text>
				<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png"></image>
			</view>
		</view>
		
		<view class="center-list" @click="goTo_personInfo">
			<view class="center-list-item">
				<image class="item-icon" src="../../../static/img/me/data.png"></image>
				<text class="list-text">个人资料</text>
				<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png"></image>
			</view>
		</view>

		<view class="center-list" @click="goTo_about">
			<view class="center-list-item">
				<image class="item-icon" src="../../../static/img/me/system.png"></image>
				<text class="list-text">关于应用</text>
				<image class="right-arrow-icon" src="../../../static/img/base/left_arrow.png"></image>
			</view>
		</view>
		<view class="btn-row">
			<button v-if="hasLogin" class="primary logout-btn" type="primary" :loading="logoutBtnLoading"
				@tap="bindLogout">退出登录</button>
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" title="是否现在退出登录？" @confirm="popConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { personInfo } from "@/fetch/api/me/index.js"
	export default {
		data() {
			return {
				hasLogin:true,
				avatarUrl: "../../../static/img/me/user-avatar.png",
				inviteUrl: '',
				logoutBtnLoading: false,
				info:{
					userName:'',
					phonenumber:'',
					avatar:''
				}
			}
		},
		onShow(){
			this.personInfo();
		},
		methods: {
			/**
			 * 获取用户信息
			 */
			personInfo(){
				personInfo().then(res=>{
					if(res){
						this.info.userName = res.userName;
						this.info.avatar = res.avatar;
						this.info.phonenumber = res.phonenumber;
					}
					
				})
			},
			/**
			 * 跳转到修改密码
			 */
			goTo_resetPsd(){
				uni.navigateTo({
					url: '/pages/me/resetPsd'
				})
			},
			/**
			 * 跳转到意见反馈页面
			 */
			goTo_feedback(){
				uni.navigateTo({
					url: '/pages/me/feedback'
				})
			},
			/**
			 * 跳转到关于应用
			 */
			goTo_about(){
				uni.navigateTo({
					url: '/pages/me/about'
				})
			},
			/**
			 * 跳转到个人详情页面
			 */
			goTo_personInfo(){
				uni.navigateTo({
					url: '/pages/me/person-info'
				})
			},
			/**
			 * 退出登录
			 */
			bindLogout() {
				this.$refs.popup.open('center');
			},
			popConfirm(){
				this.logoutBtnLoading = true;
				this.userInfo = uni.getStorageSync('userInfo');
				this.hosId = this.userInfo.hosId;
				uni.clearStorageSync();
				this.$uniPromiseMethods.setStorageSync('isFirstLogin','no').then(StorageRes=>{
					this.$uniPromiseMethods.setStorageSync('hosId',this.hosId).then(StgHosIdRes=>{
						this.logoutBtnLoading = false;
						uni.reLaunch({
							url: '/pages/admin/login'
						});
						return
					})
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page {
		background-color: #f8f8f8;
	}

	.logo {
		height: 240rpx;
		padding: 50rpx 20rpx 20rpx 50rpx;
		box-sizing: border-box;
		background-color: #377EB4;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
		color:#fff;
	}

	.uer-name {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 30rpx;
	}
	
	.user-phone {
		font-size: 27rpx;
	}

	.login-title {
		height: 150rpx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 15rpx;
		flex-direction: column;
	}

	.center-list-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 90rpx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0rpx 20rpx;
	}
	.center-list-item .item-icon {
		width:40rpx;
		height:40rpx;
		margin-right: 20rpx;
	}
	.right-arrow-icon {
		width:19rpx;
		height:33rpx;
		margin-right: 20rpx;
	}

	.border-bottom {
		border-bottom-width: 1rpx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #0faeff;
		text-align: center;
		font-family: texticons;
		margin-right: 20rpx;
	}

	.list-text {
		height: 90rpx;
		line-height: 90rpx;
		color: #555;
		font-size: 32rpx;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90rpx;
		width: 40rpx;
		line-height: 90rpx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	
	.btn-row {
		margin-top:100rpx;
		padding:0 50rpx;
	}
	.btn-row .logout-btn {
		background-color: #377EB4;
	}
</style>
