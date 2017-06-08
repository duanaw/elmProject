<template>
    <div class="seller">
    	<div class="seller-content">
    		<div class="overview-seller">
    			<h1 class="seller-title">{{seller.name}}</h1>
    			<div class="seller-desc">
    				<star :size="36" :score="seller.score"></star>
    				<span class="text">({{seller.ratingCount}})</span>
    				<span class="text">{{seller.sellCount}}</span>
    			</div>
    			<ul class="remark">
    				<li class="block">
    					<h2>起送价</h2>
    					<div class="content2">
    						<span class="stress">{{seller.minPrice}}</span>元
    					</div>
    				</li>
    				<li class="block">
    					<h2>商家配送</h2>
    					<div class="content2">
    						<span class="stress">{{seller.deliveryPrice}}</span>元
    					</div>
    				</li>
    				<li class="block">
    					<h2>平均配送时间</h2>
    					<div class="content2">
    						<span class="stress">{{seller.deliveryTime}}</span>分钟
    					</div>
    				</li>
    			</ul>
    		</div>
    		<split></split>
    		<div class="bulletin">
    			<h1 class="title1">公告与活动</h1>
    			<div class="content-wrap1">
    				<p class="content1">{{seller.bulletin}}</p>
    			</div>
    		</div>
    	</div>
    </div>
</template>
<script>
import star from 'components/star/star';
import split from "components/split/split";
export default{
	 props:{
    	seller:{
    		type:Object
    	}
    },
    components:{
    	star,
    	split
    }
} 
   
</script>
<style>
	.seller{
		position: absolute;
        top:174px;
        bottom:0;
        left:0;
        width:100%;
        overflow: hidden;
	}
	.overview-seller{
		padding: 18px;
	}
	.overview-seller .seller-title{
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7,17,27);
		font-size: 14px;
		font-weight: 700;
	}
	.overview-seller .seller-desc{
		padding-bottom:18px;
		line-height: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-size: 0; 
	}
	.overview-seller .seller-desc .star{
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	.overview-seller .seller-desc .text{
		margin-right: 12px;
		display: inline-block;
		vertical-align: top;
		font-size: 14px;
	}
	.overview-seller .remark{
		display: flex;
		padding-top:18px;
	}
	.overview-seller .remark .block{
		flex:1;
		text-align: center;
		border-right:1px solid rgba(7,17,27,0.1);
		list-style: none; 
	}
	.overview-seller .remark .block h2{
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color:rgb(147,153,159);
	}
	.overview-seller .remark .block .content2{
		line-height: 24px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.overview-seller .remark .block .content2 .stress{
		font-size: 24px;
	}
	.bulletin{
		padding:18px;
	}
</style>