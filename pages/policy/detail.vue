<template>
	<view>
		
		<view class="top-part">
			<view class="title">{{info.cmsTitle}}</view>
			
			<view class="info-part">
				<text class="department">{{info.pubInst}}</text>
			</view>
			
			<view class="info-part">
				<text class="time">{{info.pubDate}}</text>
			</view>
		</view>
		
		<view class="content" v-html="info.cmsCont"></view>
	</view>
</template>

<script>
	import { getPolicyList } from "@/fetch/api/policy/index.js"
	export default {
		data(){
			return {
				info:{
					title:"山西将统一城乡居民医保门诊慢病病种",
					time:'2014-10-24',
					department:'山西医保局',
					content:"aaaaaaaaa"
				}
			}
		},
		onLoad(){
			this.policyId = uni.getStorageSync('policyId');
			this.getPolicyList();
		},
		methods:{
			/**
			 * 获取政策详情
			 */
			getPolicyList(){
				let params = {
					offset: 0,
					limit: 1,
					cmsId: this.policyId
				}
				getPolicyList(params).then(res=>{
					this.info = res[0] || {};
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-part {
		padding:40rpx 20rpx 20rpx;
		border-bottom: 10rpx solid #f0f0f0;
	}
	.title {
		font-size: 35rpx;
		font-weight: 600;
	}
	.info-part {
		flex-direction: row;
		align-items: center;
		
		margin-top:10rpx;
		.time {
			font-size: 25rpx;
			margin-right: 15rpx;
			color: #23A8F2;
		}
		.department {
			font-size: 25rpx;
		}
	}
	.content {
		padding:15rpx;
	}
</style>
