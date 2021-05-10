
<template>
	<view class="content">
		
		<view class="header">登录</view>
		
		<view class="form">
      <view class="inputWrapper" v-if="isFirstLogin && loginType === 'jobNum'">
				<picker @change="bindPickerChange" :range="hospNameList" class="hosp-picker">
						<view class="hosp-picker-view">{{curHosp.hosArev || '请选择医院'}}</view>
				</picker>
			</view>
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.jobNum" :placeholder="loginType === 'jobNum' ? '请输入工号':'请输入手机号'"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="form.psd" placeholder="请输入密码"/>
			</view>
			
			<view class="loginBtn" @click="login">
				<text class="btnValue">登录</text>
			</view>
			
			<view class="flex-between flex-dir-row bottom-part">
				
				<view class="phone-login-btn">
					<text @click="changeLoginType">{{ loginType === 'jobNum' ? "手机登录":"工号登录" }}</text>
				</view>
				
				<view class="forgot-btn" @click="goTo_forgetPsd">
					<text>找回密码</text>
				</view>
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import { getAllHosp, login ,phoneLogin, getUserInfo ,saveClient } from "@/fetch/api/admin/index.js"
	export default {
		data() {
			return {
        form:{
          jobNum:'', //  15523236998
          psd:'' // 123456
        },
				loginType:'jobNum',
				isFirstLogin:true,
				hospList:[],
				hospNameList:[],
				curHosp:{},
				hosId:'' //100
			}
		},
		onLoad() {
      this.hasChooseHosp();
		},
		methods: {
			/**
			 * 是否选择了医院
			 */
			hasChooseHosp(){
				const hosId = uni.getStorageSync('hosId');
				if ( hosId || hosId === 0 ) {
					this.hosId = hosId;
					this.isFirstLogin = false;
				}else{
					this.getHospList();
				}
			},
			/**
			 * 获取医院列表
			 */
			getHospList(){
				getAllHosp().then(res=>{
					if(res && res.length>0){
						res.forEach(i=>{
							let temp = {
								hosArev:i.hosArev,
								hosId:i.hosId
							};
							this.hospList.push(temp);
							this.hospNameList.push(i.hosArev);
						});
					}else{
						this.hospList = [];
					}
				})
			},
			/**
			 * 登录
			 */
			login(){
				if(this.loginType === 'jobNum' && !this.hosId && this.hosId !== 0){
					uni.showToast({
							title: '请选择医院',
							icon:'none'
					});
					return
				}
				
				if( !this.form.jobNum && this.form.jobNum !== 0 ){
					uni.showToast({
					    title: '请输入工号',
							icon:'none'
					});
					return
				}
				if( !this.form.psd && this.form.psd !== 0 ){
					uni.showToast({
					    title: '请输入密码',
							icon:'none'
					});
					return
				}
				uni.showLoading({
				    title: '登录中'
				});
				
				let params = {
					username:this.form.jobNum,
					password:this.form.psd
				};
				
				if(this.loginType === 'jobNum'){
					params.hosId = this.hosId;
					login(params).then(res=>{
						this.loginSet(res);
					})
				}else{
					phoneLogin(params).then(res=>{
						this.loginSet(res);
					})
				}
			},
			loginSet(res){
				//缓存token
				if(res){
					this.$uniPromiseMethods.setStorageSync('token',res).then(StorageRes=>{
						console.log('成功缓存token');
						getUserInfo().then(userInfoRes=>{
							let userInfo = {
								userId:userInfoRes.userId,
								docTitle:userInfoRes.docTitle,
								deptNm:userInfoRes.deptNm,
								hosId:userInfoRes.hosId
							}
							setTimeout(()=>{
								let token = uni.getStorageSync('token');
								if(!token) return;
								let prinf = plus.push.getClientInfo();
								let cid = prinf.clientid;
								let clientParams = {
									userId:userInfoRes.userId,
									clientId:cid
								};
								saveClient(clientParams).then(clientRes=>{
									console.log('提交client成功 -- ' + cid );
								})
							},10000)
							this.$uniPromiseMethods.setStorageSync('userInfo',userInfo).then(userStorage=>{
								console.log('成功缓存用户信息');
								uni.showToast({
								    title: '登录成功',
										icon:'none',
								    duration: 1500
								});
								setTimeout(()=>{
									uni.hideLoading();
									this.goTo_home();
								},1500)
							})
						})
					})
				}
			},
			bindPickerChange(e) {
				let item = this.hospList[e.target.value];
				this.curHosp = item;
				this.hosId = item.hosId;
			},
			changeLoginType(){
				if(this.loginType === "jobNum"){
					this.loginType = "phone";
				}else{
					this.loginType = "jobNum";
				}
				this.form.jobNum='';
				this.form.psd='';
			},
			/**
			 * 跳转到重置密码页
			 */
			goTo_forgetPsd() {
				uni.navigateTo({
					url: '/pages/admin/forgetPsd'
				})
			},
			/**
			 * 跳转到tab 首页 home
			 */
			goTo_home() {
				uni.switchTab({
					url: '../tabBar/home/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
		box-sizing: border-box;
		background: #377EB4;
		width: 100vw;
		height: 100vh;
		padding:250rpx 100rpx 0;
	}
	.header {
		font-size: 60rpx;
		text-align: center;
		color:#fff;
	}
	.form{
		margin-top: 80rpx;
		.inputWrapper{
			width: 100%;
			height: 75rpx;
			background: white;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 0 20px;
			margin-top: 25px;
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
			}
		}
		.hosp-picker {
			width:100%;
			height:100%;
			.hosp-picker-view {
				height: 75rpx;
				line-height: 75rpx;
				font-size: 15px;
			}
		}
	}
	
	.loginBtn{
		width: 100%;
		height: 75rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnValue{
			color: white;
		}
	}
	
	.bottom-part {
		margin-top: 40rpx;
		padding:0 20rpx;
		.phone-login-btn {
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
		.forgot-btn{
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
	}
	
</style>