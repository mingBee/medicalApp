<template>
	<view class="container">
		<text class="tip">请填写申诉理由，并上传病历首页图片</text>
		<view class="info-part">
			
			<view class="flex flex-dir-row reason-area">
				<text class="title">拒付理由：</text>
				<text class="flex-1 value">{{info.vioReason}}</text>
			</view>
			
			<view class="detail-area">
				<view class="detail-cell">
					<text class="title">参保人：</text>
					<text class="value">{{info.patientNm}}</text>
				</view>
				<view class="detail-cell">
					<text class="title">住院号：</text>
					<text class="value">{{info.hosNum}}</text>
				</view>
				<view class="detail-cell">
					<text class="title">出院诊断：</text>
					<text class="value">{{info.outDiag}}</text>
				</view>
				<view class="detail-cell">
					<text class="title">三目名称：</text>
					<text class="value">{{info.medProName}}</text>
				</view>
				<view class="detail-cell">
					<text class="title">扣款金额：</text>
					<text class="value">{{info.carpayAmount || 0}}元</text>
				</view>
			</view>
			
		</view>
		
		<textarea class="reason-part" auto-height placeholder="请填写申诉理由" v-model="form.reason"/>
		
		<image-comp @submitUrl="submitUrl" ></image-comp>
		
		<view class="flex-around flex-dir-row btn-part">
			<text class="btn save-btn" :class="{active:form.reason}" @click="beforeSave">提交</text>
			<text class="btn giveUp-btn" @click="beforeGiveUp">放弃申诉</text>
		</view>
			
		<uni-popup ref="confirmPopup" type="dialog">
			<uni-popup-dialog mode="base" title="" content="是否提交申诉？" @confirm="save"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="giveUpPopup" type="dialog">
			<uni-popup-dialog mode="base" title="" content="是否放弃申诉？" @confirm="giveUp"></uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	import imageComp from './components/image'
	import { saveAppealInfo } from "@/fetch/api/appeal/appeal.js"
	export default {
		components:{
			imageComp
		},
		data(){
			return {
				feedbackId:'',
				info:{},
				form:{
					reason:'',
					imgAddr:''
				}
			}
		},
		onLoad(){
			this.info = uni.getStorageSync('appealItem');
			this.feedbackId = this.info.feedbackId;
		},
		methods:{
			submitUrl(value){
				if(!value) return;
				this.form.imgAddr = value.join(';') || [];
			},
			beforeSave(){
				if(!this.form.reason){
					uni.showToast({
					    title: '请填写申诉理由',
							icon:'none'
					});
					return
				}
				this.$refs['confirmPopup'].open('center');
			},
			beforeGiveUp(){
				this.$refs['giveUpPopup'].open('center');
			},
			save(){
				uni.showLoading({
				    title: '提交中...'
				});
				let params = {
					feedbackId:this.feedbackId,
					feedbackReason:this.form.reason,
					imgAddr:this.form.imgAddr
				}
				saveAppealInfo(params).then(res=>{
					uni.setStorageSync('appealListRefresh', 'refresh');
					uni.hideLoading();
					uni.showToast({
					    title: '申诉成功',
							icon:'none'
					});
					
					setTimeout(()=>{
						uni.navigateBack({
						    delta: 1
						});
					},1500);
				})
			},
			giveUp(){
				uni.showLoading({
				    title: '提交中...'
				});
				let params = {
					feedbackId:this.feedbackId,
					feedbackState:'gvupfeed'
				}
				saveAppealInfo(params).then(res=>{
					uni.setStorageSync('appealListRefresh', 'refresh');
					uni.hideLoading();
					uni.showToast({
					    title: '已放弃申诉',
							icon:'none'
					});
					setTimeout(()=>{
						uni.navigateBack({
						    delta: 1
						});
					},1500);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding:0 20rpx;
		box-sizing: border-box;
	}
	.tip {
		display: inline-block;
		padding:15rpx 0;
		font-size: 27rpx;
		color:rgba(0, 134, 171, 1);
	}
	.info-part {
		padding:15rpx 10rpx;
		box-shadow:0 0 3px 3px #f0f0f0;
		.reason-area {
			align-items: baseline;
			position: relative;
			border-bottom:1px solid #f0f0f0;
			padding:15rpx 15rpx;
			.title {
				font-size: 28rpx;
			}
			.value {
				font-size: 27rpx;
			}
		}
		.detail-area {
			padding:15rpx 15rpx;
			.detail-cell {
				display: flex;
				flex-direction: row;
				align-items: baseline;
				padding:7rpx 0;
				.title {
					font-size: 28rpx;
				}
				.value {
					flex:1;
					font-size: 28rpx;
				}
			}		
		}
	}
	
	.reason-part {
		width:670rpx;
		margin-top:25rpx;
		box-sizing: border-box;
		min-height:150rpx;
		box-shadow:0 0 3px 3px #f0f0f0;
		padding:20rpx;
		font-size: 28rpx;
	}
	
	.btn-part {
		.btn {
			display: inline-block;
			margin:30rpx 0 40rpx;
			width:250rpx;
			font-size: 28rpx;
			font-weight: 600;
			border-radius:10rpx;
			height:60rpx;
			line-height: 60rpx;
			text-align: center;
		}
		.save-btn {
			background-color: #ccc;
			color:#fff;
			&.active {
				background-color: #25AFF3;
			}
		}
		.giveUp-btn {
			background-color: #DD4D42;
			color:#fff;
		}
	}
</style>
