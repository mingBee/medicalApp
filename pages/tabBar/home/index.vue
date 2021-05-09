<template>
	<view>
		<fun-bar color="#3B43F2"></fun-bar>
		<swiper-comp></swiper-comp>
		<view class="flex-between flex-dir-row tip-part" v-if="tipSign">
			<text class="content">{{tip}}</text>
			<icon type="cancel" size="16" color="#fff" @click="closeTip"/>
		</view>
		<view class="notify-part"  v-if="info.batchDes">
			<text class="item">市医保网监科{{info.batchDes}}情况</text>
		</view>
		
		<chart-comp :cdata="info" v-if="hasAppeal"></chart-comp>
		<view v-if="!hasAppeal" class="flex-center no-appeal-part">
			<text class="txt">医保中心暂未下发申诉内容!!</text>
		</view>
		<total-detail></total-detail>
		
	</view>
</template>

<script>
	import funBar from '@/pages/common-comp/fun-bar.vue'
	import swiperComp from './components/swiper/swiper'
	import chartComp from './components/ucharts'
	import totalDetail from './components/total-detail'
	import { getDetail } from "@/fetch/api/home/index.js"
	import { getBatchId } from "@/fetch/api/admin/index.js"
	export default {
		components:{
			funBar,
			swiperComp,
			chartComp,
			totalDetail
		},
		data() {
			return {
				info:{},
				tip:'本次您的违规记录在本科室相对良好，请继续保持！',
				tipSign:true,
				isDoc:true,
				hasAppeal:true
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.hosId = uni.getStorageSync('hosId');
			this.isDoc = this.userInfo.docTitle === "主治医生"?true:false;
			
			this.getBatchId();
		},
		methods:{
			getDetail(){
				let params = {
					userId:this.userInfo.userId,
					hosId:this.hosId,
					batchId:this.batchId
				}
				getDetail(params).then(res=>{
					let noAppealNum = Number(res.noAppealNum || 0);
					let hasAppealNum = Number(res.hasAppealNum || 0);
					let totalAppeal = noAppealNum + hasAppealNum;
					if(noAppealNum > 0){
						uni.setTabBarBadge({
						  index: 1,
						  text: String(noAppealNum)
						})
					}else{
						uni.removeTabBarBadge({
						  index: 1
						})
					};
					this.hasAppeal =  totalAppeal === 0? false:true;
					this.info = res;
					if(this.info && (this.info.noAppealNum || this.info.hasAppealNum)){
						let total = this.info.noAppealNum + this.info.hasAppealNum;
						if(total> 15){
							this.tip = "本次您的违规记录在本科室内相对较多，还请规范行为！";
						}
					}
				})
			},
			/**
			 * 获取批次id
			 */
			getBatchId(){
				getBatchId().then(res=>{
					this.$uniPromiseMethods.setStorage('batchId',res.batchId).then(StorageRes=>{
						console.log('成功缓存batchId');
					})
					this.batchId = res.batchId;
					this.getDetail();
				})
			},
			/**
			 * 关闭tip
			 */
			closeTip(){
				this.tipSign = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip-part {
		position: fixed;
		top:50rpx;
		left:0;
		right:0;
		padding:10rpx 25rpx;
		background-color: #F99432;
		z-index: 1;
		
		.content {
			font-size: 26rpx;
			color: #fff;
		}
		.close-sign {
			display: inline-block;
			width:27rpx;
			height:27rpx;
			border-radius: 50%;
			border:1px solid #fff;
			text-align: center;
			font-size: 27rpx;
			color: #fff;
		}
	}
	
	.notify-part {
		margin:15rpx 0 10rpx;
		.item {
			padding:10rpx 15px;
			color:#E5A046;
			font-size: 30rpx;
		}
	}
	
	.no-appeal-part {
		box-sizing: border-box;
		height:400rpx;
		padding:30rpx;
		text-align: center;
		.txt {
			font-size: 33rpx;
			color: #333;
		}
	}
</style>