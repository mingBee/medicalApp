<template>
	<view>

		<view class="qiun-charts">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie($event,'canvasRing')"></canvas>
			
			<!--#ifndef MP-ALIPAY -->
<!-- 			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie($event,'canvasRing')"></canvas> -->
			<!--#endif-->
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		mounted() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				
				// uni.showLoading({
				// 	title: "正在加载数据..."
				// })
				// uni.request({
				// 	url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				// 	data: {},
				// 	success: function(res) {
				// 		_self.fillData(res.data);
				// 	},
				// 	fail: () => {
				// 		_self.tips = "网络错误，小程序端请检查合法域名";
				// 	},
				// 	complete() {
				// 		uni.hideLoading();
				// 	}
				// });
				let data =  {
						"series": [{
							"name": "一班",
							"data": 50
						}, {
							"name": "二班",
							"data": 30
						}, {
							"name": "三班",
							"data": 20
						}, {
							"name": "四班",
							"data": 18
						}, {
							"name": "五班",
							"data": 8
						}]
					}
					_self.fillData(data);
			},
			fillData(data) {
				let Ring = {
					series: []
				};
				Ring.series = data.series;
				for (let i = 0; i < Ring.series.length; i++) {
					Ring.series[i].format = () => {
						return Ring.series[i].name + Ring.series[i].data
					};
				}
				console.log(Ring);
				this.showRing("canvasRing", Ring);
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 40 * _self.pixelRatio, //圆环的宽度
							offsetAngle: 0 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
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
		height: 500rpx;
		background-color: #FFFFFF;
	}

	.charts {
		/* width: 750rpx; */
		width:100%;
		height: 500rpx;
		background-color: #FFFFFF;
	}

</style>
