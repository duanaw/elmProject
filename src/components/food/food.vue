<template>
    <div v-show="showFlog" class="food-wrap" ref="foods">
        <div class="food-content">
            <div class="img-head">
                <img :src="food.image" alt="" />
                <div class="back" @click="hide">
                    <span>返回</span>
                </div>
            </div>
            <div class="content-food">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail-food">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}</span> 
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice"  class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="catr-warp">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst()">加入购物车</div>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating-food">
                <h1 class="title-food">商品评价</h1>
                <ratingselect :select-type="selectType" :only-content='onlyContent' :desc="desc" :ratings='food.ratings'></ratingselect>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartconcontrol/cartconcontrol';
import Vue from 'vue';
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";
var POSITIVE=0;
var NEGATIVE=0;
var All=2;
    export default{
        props:{
            food:{
               type:Object
            }
        },
        data(){
            return{
                showFlog:false ,
                selectType:All,
                onlyContent:true,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
               }
            }
        },
        methods:{
            show(){
               this.showFlog=true;
               this.selectType=All;
               this.onlyContent=true;
               this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll=new BScroll(this.$refs.foods,{
                        click:true
                    })
                }else{
                    this.scroll.refresh();
                }
               }) 
              
            },
            hide(){
               this.showFlog=false;  
            },
            addFirst(event){
                /*if(!event._constructed){
                    return;
                }*/
                Vue.set(this.food,'count',1)
            }
        },
        components:{
            cartcontrol,
            split,
            ratingselect
        }
    }
</script>
<style>
    .food-wrap{
        position: fixed;
        left:0;
        top:0;
        bottom:48px;
        z-index:30;
        width:100%;
        background:#fff ;
    }
   .food-wrap .img-head{
    position: relative;
    width: 100%;
    height: 0;
    padding-top:100%;
   }
   .food-wrap .img-head img{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
   }
   .food-wrap .img-head .back{
    position: absolute;
    top:10px;
    left:0;
   }
   .food-wrap .img-head .back span{
    display: inline-block;
    padding:10px;
    font-size: 20px;
    color:#fff;

   }
   .food-wrap .content-food{
    position: relative;
    padding:18px;
   }
   .food-wrap .content-food .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 14px;
        color:rgb(7,17,27);
   }
  .food-wrap .content-food .detail-food{
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
    height: 10px;
  }
  .food-wrap .content-food .detail-food .sell-count, .rating{
    font-size: 10px;
    color:rgb(147,153,159);
  }
  .food-wrap .content-food .detail-food .sell-count{
    margin-right: 12px;
  }
  .food-wrap .content-food .price{
    font-weight: 700;
    line-height: 24px;
  }
  .food-wrap .content-food .price .now{
    margin-right:8px;
    font-size: 14px;
    color:rgb(240,20,20);
  }
  .food-wrap .content-food .price .old{
    text-decoration:line-through;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  .food-wrap .content-food .catr-warp{
    position: absolute;
    right:19px;
    bottom:20px;
  }
  .food-wrap .content-food .buy{
    position: absolute;
    right:18px;
    bottom:18px;
    z-index:10;
    height: 24px;
    line-height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color:#fff;
    background:rgb(0,160,220) ;
  }
.food-wrap .info{
    padding:18px;
} 
.food-wrap .info .title{
    line-height: 14px;
    margin-bottom:6px;
    font-size: 14px;
    color:rgb(7,17,27);
}
.food-wrap .info .text{
    line-height: 24px;
    padding:0 8px;
    font-size: 12px;
    color:rgb(77,85,93);
}
.food-wrap .rating-food{
    padding-top:18px;
}
.food-wrap .rating-food .title-food{
    padding-left: 18px;
    font-size: 14px;
    color:rgb(7,17,27);
}
</style>