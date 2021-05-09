<template>
	<view>

		<view class="qiun-charts">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :width="cWidth*pixelRatio"
			 :style="{'width':cWidth+'px'}" @touchstart="touchPie($event,'canvasRing')"></canvas>
			 <!-- :height="this*pixelRatio"    ,'height':this+'px' -->
			<!--#ifndef MP-ALIPAY -->
<!-- 			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie($event,'canvasRing')"></canvas> -->
			<!--#endif-->
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var canvasObj = {};

	export default {
		props:{
			cdata:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				cWidth: '',
				cHeight:'',
				pixelRatio: 1,
				serverData: '',
			}
		},
		mounted() {
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: (res)=> {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						this.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(400);
		},
		watch:{
			cdata:{
				handler(newV,oldV){
					if(newV.hasAppealNum || newV.hasAppealNum == 0){
						let data = [
							{
								name: "未申诉",
								data: Number(newV.noAppealNum)
							},
							{
								name: "已申诉",
								data: Number(newV.hasAppealNum)
							}
						]
						this.fillData(data);
					}		
				},
				deep:true,
				immediate: true
			}
		},
		methods: {
			fillData(data) {
				let Ring = [];
				Ring = data;
				for (let i = 0; i < Ring.length; i++) {
					Ring[i].format = () => {
						return Ring[i].name + Ring[i].data
					};
				}
				this.$nextTick(()=>{
					this.showRing("canvasRing", Ring);
				})
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 13,
					padding: [5, 5, 5, 5],
					loadingType:2,
					legend: {
						show: true,
					 "position": "right",
						"float": "bottom",
						itemGap: 20,
						padding: 3,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 2
					},
					title: {
						name: '已申诉',
						color: '#666666',
						fontSize: uni.upx2px(35) * this.pixelRatio
					},
					// subtitle: {
					// 	name: '申诉率',
					// 	color: '#666666',
					// 	fontSize: 15 * this.pixelRatio,
					// },
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: uni.upx2px(50) * this.pixelRatio, //圆环的宽度
							offsetAngle: 50 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: chartData,
					animation: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});

			},

			touchPie(e, id) {
				canvasObj[id].showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>

	/* 通用样式 */
	.qiun-charts {
		/* width: 750rpx; */
		/* width:100%; */
		height: 400rpx;
		background-color: #FFFFFF;
	}

	.charts {
		/* width: 750rpx; */
		width:100%;
		height: 400rpx;
		background-color: #FFFFFF;
	}

</style>
