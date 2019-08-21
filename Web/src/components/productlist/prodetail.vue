<template>
    <div>
            <!-- 配套设施 -->
        <div class="part part2" id="part2">
            <div class="detail clearfix">
                <div class="detail_left">配套设施</div>
                <div class="detail_right">
                    <ul class="support_list clearfix">
                        <li> <i class="icon_supports tv"></i>电视</li> <!--电视-->		
                        <li> <i class="icon_supports air"></i>空调</li><!--空调-->
                        <li> <i class="icon_supports fridge"></i>冰箱</li><!--冰箱-->
                        <li> <i class="icon_supports washing"></i>洗衣机</li><!--洗衣机-->
                        <li> <i class="icon_supports hair_dryer"></i>电吹风</li><!--电吹风-->
                        <li> <i class="icon_supports shower"></i>热水淋浴</li><!--热水淋浴-->
                        <li> <i class="icon_supports toothbrush"></i>牙具</li><!--牙具-->
                        <li> <i class="icon_supports soap"></i>香皂</li><!--香皂-->
                        <li> <i class="icon_supports shoes"></i>拖鞋</li><!--拖鞋-->
                        <li> <i class="icon_supports papper"></i>手纸</li><!--卫生纸-->
                        <li> <i class="icon_supports tower"></i>毛巾</li><!--毛巾-->
                        <li> <i class="icon_supports acne"></i>沐浴用品</li><!--沐浴露-->
                        <li> <i class="icon_supports wify"></i>无线网络</li><!--无线网络-->
                        <li> <i class="icon_supports network"></i>有线网络</li><!--有线网络-->
                        <li> <i class="icon_supports heater"></i>暖气</li><!--暖气-->
                        <li> <i class="icon_supports lift"></i>电梯</li><!--电梯-->
                    </ul>
                </div>
                
            </div>
        </div>
        <div id="part3" class="part part3">
			<div class="detail clearfix">
				<div class="detail_left">房源描述</div>
					<div class="detail_right">
						<div class="detail_intro detail_txt overflow">
								近地铁7号线房子是三居室，空间很宽敞。各种家用电器一应俱全，厨房用具非常齐全，随时迎接各位大厨光临。24小时热水供应，各位爱干净的亲们可以随时使用，并且为各位客人们准备了洗漱用品，包括牙膏、牙刷、毛巾、浴巾、洗发露、沐浴露，方便大家来一场轻车简行的旅程。使用了很多绿植布置，在保持房子整体视觉感受的同时，又增加了很多自然趣味。房东阿姨非常爱干净，所以大家会有非常舒适整洁的体验，就像回到了妈妈家。客房内的布置耗尽了房东及其家人的洪荒之力，力求舒适温馨的同时，保有一些小格调，请各位有有品位的亲们帮助提意见完善哦！
						</div>
					</div>
				</div>
				<div class="show_more_btn" style="display: none;">
					<a href="javascript:;" id="introBtn" class="overflowBtn">查看全部</a>
				</div>
		</div>
        <div id="part4" class="part part4">
			<div class="detail clearfix">
				<div class="detail_left">预订须知</div>
				<div class="detail_right">
					<ul class="reserve_list clearfix">
						<li>
							<span class="reserve_list_tt">预订类型 ：</span>
									立即预订
						</li>
						<li>
							<span class="reserve_list_tt">押金规则 ：</span>
									198元
						</li>
						<li>
							<span class="reserve_list_tt">最少入住天数 ：</span>
									1天
						</li>
						<li>
							<span class="reserve_list_tt">清洁费 ：</span>
									0元/单
						</li>
						<li>
							<span class="reserve_list_tt">入住时间 ：</span>
								14点之后
						</li>
						<li>
							<span class="reserve_list_tt">退房时间 ：</span>
									12点之前
						</li>
						
						<li class="clearfix server_li">
						    <span class="reserve_list_tt" style="float:left;">服务 ：</span>
						    <div>可做饭</div>
						</li>
					</ul>
				</div>
            </div> 
        </div> 
        <div id="part5" class="part part5">
					<div class="detail clearfix">
						<div class="detail_left">周边情况</div>
						<div class="detail_right">
							<div class="detail_arround detail_txt overflow">
								房子位于东四环内，步行一刻钟到地铁7号线百子湾站（建议骑行单车哦，非常方便），200米处有公交31、专71和439路公交车。十分钟处有永辉超市，楼下各药店、超市、饭店、小吃店非常多，生活方便。亲们一定会喜欢的。
							</div>
						</div>
					</div>
		</div>
								
    </div>

</template>    
<script>
export default {
    data(){
        return{
            arr:[[],[],[],[],[],[],[],[]]
        }
    }
}
</script>
<style scoped>
    ul{
        list-style: none;
        padding: 0;
    }
    /* 配套设施 */
    .part {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    }
    .detail {
        width: 690px;
        padding: 15px 20px;
    }
    .clearfix {
        display: block;
    }
    .detail_left {
        width: 100px;
        float: left;
        font-size: 18px;
        color: #666;
        margin-left:-10px; 
    }
    .detail_right {
        width: 560px;
        float: right;
        font-size: 14px;
        color: #999;
        margin-top:-5px;
    }
    .part2 .support_list li {
        float: left;
        width: 30%;
        height: 40px;
        line-height: 40px;
    }
    .part2 .support_list li .icon_supports.washing {
        background-position: 0 -216px;
    }
    .part2 .support_list li .icon_supports {
        width: 30px;
        height: 24px;
        display: inline-block;
        background-image: url(../image/config.png);
        background-repeat: no-repeat;
        vertical-align: middle;
    }
    .part2 .support_list li .icon_supports.tv {
    background-position: -59px 0;
    }
    .part2 .support_list li .icon_supports.air {
    background-position: -28px -24px;
    }
    .part2 .support_list li .icon_supports.fridge {
    background-position: -84px -72px;
}
    .part2 .support_list li .icon_supports.washing {
    background-position: 0 -216px;
}
    .part2 .support_list li .icon_supports.hair_dryer {
    background-position: -59px -115px;
}
    .part2 .support_list li .icon_supports.shower {
    background-position: 2px -192px;
}   
    .part2 .support_list li .icon_supports.toothbrush {
    background-position: -28px -72px;
}
    .part2 .support_list li .icon_supports.soap {
    background-position: -59px -71px;
}
    .part2 .support_list li .icon_supports.shoes {
    background-position: -28px -118px;
}
    .part2 .support_list li .icon_supports.papper {
    background-position: -59px -216px;
}
    .part2 .support_list li .icon_supports.tower {
    background-position: -84px -48px;
}
    .part2 .support_list li .icon_supports.acne {
    background-position: -84px -24px;
}
    .part2 .support_list li .icon_supports.wify {
    background-position: -28px -94px;
}
    .part2 .support_list li .icon_supports.network {
    background-position: -28px -165px;
}
    .part2 .support_list li .icon_supports.heater {
    background-position: -59px -168px;
}
    .part2 .support_list li .icon_supports.lift {
    background-position: -28px -192px;
}
    .clearfix:after {
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
    content: ".";
}
/* 房屋描述 */
.part5 .map_box .map {
    width: 100%;
    height: 410px;
}
.show_more_btn {
    width: 100%;
    text-align: center;
    height: 30px;
    padding: 10px 0 30px 0;
}
.show_more_btn a {
    display: inline-block;
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    color: #7ad2c5;
    font-size: 14px;
    border: 1px solid #7ad2c5;
    border-radius: 5px;
    margin: 0 auto;
}

</style>