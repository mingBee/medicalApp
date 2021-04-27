<template>
	<view class="container">
		<view class="tip">请填写申诉理由，并上传病历首页图片</view>
		<view class="info-part">
			
			<view class="flex flex-dir-row reason-area">
				<view class="title">拒付理由：</view>
				<view class="value">禁忌症：半乳糖血症，肠梗阻，急腹痛。</view>
			</view>
			
			<view class="detail-area">
				<view class="detail-cell">
					<view class="title">参保人：</view>
					<view class="value">{{info.name}}</view>
				</view>
				<view class="detail-cell">
					<view class="title">住院号：</view>
					<view class="value">{{info.number}}</view>
				</view>
				<view class="detail-cell">
					<view class="title">出院诊断：</view>
					<view class="value">{{info.result}}</view>
				</view>
				<view class="detail-cell">
					<view class="title">三目名称：</view>
					<view class="value">{{info.three}}</view>
				</view>
				<view class="detail-cell">
					<view class="title">扣款金额：</view>
					<view class="value">{{info.amount}}元</view>
				</view>
			</view>
			
		</view>
		
		<textarea class="reason-part" auto-height placeholder="请填写申诉理由" v-model="form.reason"/>
		
		<image-comp></image-comp>
		
		<view class="flex-around flex-dir-row btn-part">
			<button class="save-btn" @click="save">提交</button>
			<button class="giveUp-btn" @click="giveUp">放弃申诉</button>
		</view>	
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
				info:{
					name:'杨**',
					number:'123456',
					result:'不完全性肠梗阻',
					three:'J乳果糖口服液',
					amount:30
				},
				form:{
					reason:''
				}
			}
		},
		onLoad(option){
			this.feedbackId = option.feedbackId;
		},
		methods:{
			save(){
				let params = {
					feedbackId:this.feedbackId,
					checkReason:this.form.reason,
					imgAddr:''
				}
				saveAppealInfo(params).then(res=>{
					
				})
			},
			giveUp(){
				let params = {
					feedbackId:this.feedbackId,
					feedbackState:'gvupfeed'
				}
				saveAppealInfo(params).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding:0 25rpx;
	}
	.tip {
		font-size: 20rpx;
		color:rgba(0, 134, 171, 1);
	}
	.info-part {
		padding:15rpx 0;
		.reason-area {
			position: relative;
			border:1px solid #ccc;
			padding:15rpx 15rpx;
		}
		.detail-area {
			border:1px solid #ccc;
			padding:15rpx 15rpx;
			.detail-cell {
				display: flex;
				flex-direction: row;
				padding:10rpx 0;
			}		
		}
	}
	
	.reason-part {
		box-sizing: border-box;
		width:680rpx;
		min-height:200rpx;
		border:1px solid #ccc;
		padding:15rpx;
	}
	
	.btn-part {
		.save-btn {
			background-color: #ccc;
			color:#fff;
			width:40%;
		}
		.giveUp-btn {
			background-color: red;
			color:#fff;
			width:40%;
		}
	}
</style>
