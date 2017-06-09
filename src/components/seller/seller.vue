<template>
    <div class="seller" ref="seller">
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
                <div class="favorite" @click="toggleFavortie">
                    <span class="inon-fav" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
    		</div>
    		<split></split>
    		<div class="bulletin">
    			<h1 class="title1">公告与活动</h1>
    			<div class="content-wrap1">
    				<p class="content1">{{seller.bulletin}}</p>
    			</div>
                <ul v-if="seller.supports" class="list-supports">
                       <li v-for="(itme,index) in seller.supports" class="supports-item">
                          <span :class="classMap[seller.supports[index].type]" class="icon"></span>
                          <span class="supports-text">{{seller.supports[index].description}}</span>
                       </li>
                </ul>
    		</div>
            <split></split> 
            <div class="pics">
                <h1 class="title2">商家实景</h1>
                <div class="pic-wrap" ref="picWrap">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                             <img :src="pic" alt="" width="120" height="90"/> 
                        </li>
                    </ul>
                </div>
            </div> 
            <split></split>
            <div class="info">
                <h1  class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>  
    	</div>
    </div>
</template>
<script>
import star from 'components/star/star';
import split from "components/split/split";
import BScroll from 'better-scroll';
import {saveToLocal,loadFromLocal} from '../../common/js/stor.js';
export default{
    data(){
        return{
            favorite:(()=>{
                return loadFromLocal(this.seller.id,'favorite',false)
            })()
        }
    },
	 props:{
    	seller:{
    		type:Object
    	}
    },
    components:{
    	star,
    	split
    },
     created(){
        this.classMap=['decrease','discount','special','invoice','guarantee'];
    },
    watch:{
        'seller'(){     //初始化seller的方法
            this._ininScroll();
            this._initPics();
        }
    },
    mounted(){
        this._ininScroll();
        this._initPics();
    },
    methods:{
        _ininScroll(){
            if(!this.scroll){
                 this.scroll=new BScroll(this.$refs.seller,{
                    click:true
                });
            }else{
                this.scroll.refresh();
            }
        },
        _initPics(){
             if(this.seller.pics){
                var picWidth=120;
                var margin=6;
                var width=(picWidth+margin)*this.seller.pics.length-margin;
                console.log(width)
               this.$refs.picList.style.width=width+'px';

               this.$nextTick(()=>{
                if(!this.picScroll){
                    this.picScroll=new BScroll(this.$refs.picWrap,{
                       scrollX:true,
                       eventPassthrough:'vertical'
                    })
                }else{
                    this.$refs.refresh();
                }
               })

            }
        },
        toggleFavortie(){
            if(!event._constructed){
                return;
            }
            this.favorite=!this.favorite;
            //localStorage.favorite=this.favorite;
            saveToLocal(this.seller.id,'favorite',this.favorite);
        }
    },
    computed:{
        favoriteText(){
            return this.favorite? '已收藏':'收藏'
        }
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
        position: relative;
	}
    .overview-seller .favorite{
        width: 50px;
        position: absolute;
        right:18px;
        top:18px;
        text-align: center;
        
    }
    .overview-seller .favorite .inon-fav{
        display:block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background:#d4d6d9;
        margin:0 auto; 
    }
     .overview-seller .favorite .active{
        background:#f00;
     }
     .overview-seller .favorite .text{
        line-height: 10px;
        font-size: 12px;
        color:#4d555d;
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
    .overview-seller .remark :last-child{
        border-right:none;
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
    .bulletin .title1{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
        font-weight: 700;
    }
    .bulletin .content-wrap1{
        padding:0 12px 16px 12px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .bulletin .content-wrap1 .content1{
        line-height: 24px;
        font-size: 12px;
        color:rgb(240,20,20);
    }
    .bulletin  .list-supports .supports-item{
        padding:16px 12px;
        list-style: none;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .bulletin  .list-supports :last-child{
        border-bottom: none;
    }
     .bulletin  .list-supports .supports-item .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
     }
     .bulletin  .list-supports .supports-item .decrease{
        width: 16px;
        height: 16px;
        background: url(./img2.png);
        background-size:16px 16px;
        background-repeat:no-repeat;
     }
     .bulletin  .list-supports .supports-item .discount{
        width: 16px;
        height: 16px;
        background: url(./img5.png);
        background-size:16px 16px;
        background-repeat:no-repeat;
     }
     .bulletin  .list-supports .supports-item .special{
        width: 16px;
        height: 16px;
        background: url(./img4.png);
        background-size:16px 16px;
        background-repeat:no-repeat;
     }
     .bulletin  .list-supports .supports-item .invoice{
        width: 16px;
        height: 16px;
        background: url(./img6.png);
        background-size:16px 16px;
        background-repeat:no-repeat;
     }
     .bulletin  .list-supports .supports-item .guarantee{
        width: 16px;
        height: 16px;
        background: url(./img3.png);
        background-size:16px 16px;
        background-repeat:no-repeat;
     }
     .bulletin .list-supports .supports-item .supports-text{
        line-height: 16px;
        font-size: 12px;
        vertical-align: top;
     }
     .pics{
       padding:18px; 
     }
      .pics .title2{
        margin-bottom: 12px;
        line-height: 14px;
        color:rgb(7,17,27);
        font-size: 14px;
      }
      .pics .pic-wrap{
        width: 100%;
        overflow: hidden;
        white-space:nowrap;
      }
      .pics .pic-wrap .pic-list{
        font-size: 0;
      }
      .pics .pic-wrap .pic-list .pic-item{
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
      }
      .pics .pic-wrap .pic-list :last-child{
        margin-right: 0;
      }
      .info{
        padding:18px 18px 0 18px;
      }
      .info .title{
        padding-bottom:12px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        line-height: 14px;
        color:rgb(7,17,27);
        font-size: 14px;      
    }
    .info .info-item{
        padding:16px 12px;
        list-style: none;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 12px;
    } 
    .info ul :last-child{
        border-bottom: none;
    }
    </style>