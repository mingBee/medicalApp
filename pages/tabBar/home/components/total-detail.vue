<template>
	<div>
		
		<div class="flex tab-part">
			<div class="flex-1 item" @click="choiceType('person')" :class="{active:sign ==='person'}">个人全年累计情况</div>
			<div class="flex-1 item" @click="choiceType('department')"  :class="{active:sign ==='department'}">科室累计情况</div>
		</div>
		
		<div class="flex-between main">
			
			<div class="detail-part">
				
				<div class="item">
					<span class="title">申请次数：</span>
					<span class="num-area"> <span class="num">2</span>次</span>
				</div>
				
				<div class="item">
					<span class="title">拟扣款：</span>
					<span class="num-area"> <span class="num">1000.00</span>元</span>
				</div>
				
				<div class="item">
					<span class="title">违规记录：</span>
					<span class="num-area"> <span class="num">100</span>条</span>
				</div>
				
			</div>
			
			<div class="detail-btn" v-if="sign ==='department'">查看明细</div>

			
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				sign:'person'
			}
		},
		methods:{
			choiceType(sign){
				this.sign = sign;
			}
		}
	}
</script>

<style>
	.tab-part {
		background-color: #5677FC;
		box-shadow: 0 2px 5px rgba(0,0,0,.5);
	}
	.tab-part .item {
		box-sizing: border-box;
		padding:20rpx 0;
		text-align: center;
		color:rgba(255,255,255,0.7);
		border-bottom: 2px solid #5677FC;
	}
	.tab-part .item.active {
		border-color: #fff;
		color: #fff;
	}
	
	.main {
		padding:15rpx 35rpx;
	}
	
	.main .item {
		padding:10rpx 0;
	}
	
	.main .item .title{
		font-size: 28rpx;
		font-weight: 600;
	}
	
	.main .item .num-area{
		font-size: 28rpx;
	}
	
	.main .item .num{
		color:#18ACED;
		font-size: 32rpx;
		margin:0 10rpx;
	}
	
	.main .detail-btn {
		background-color: #007AFF;
		color:#fff;
		border-radius: 15rpx;
		padding:10rpx 15rpx;
		font-size: 24rpx;
	}
	
</style>
