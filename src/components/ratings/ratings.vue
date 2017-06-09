<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overvie-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边的商家{{seller.rankRate}}%</div>
                </div>
                 <div class="overvie-right">
                     <div class="score-wrap">
                         <span class="title">服务态度</span>
                         <star :size="36" :score="seller.serviceScore"></star>
                         <span class="score">{{seller.serviceScore}}</span>
                     </div>
                     <div class="score-wrap">
                         <span class="title">商品评分</span>
                         <star :size="36" :score="seller.foodScore"></star>
                         <span class="score">{{seller.foodScore}}</span>
                     </div>
                     <div class="delivery-wrap">
                         <span class="title">送达时间</span>
                         <span class="delivery">{{seller.deliveryTime}}分钟</span>
                     </div>
                 </div>
            </div>
            <split></split>
          <ratingselect :select-type="selectType" :only-content='onlyContent' :desc="desc" :ratings='ratings'></ratingselect>
          <div class="rating-wrap1">
              <ul>
                  <li v-for="rating in ratings" class="rating-item1">
                      <div class="avatar1">
                          <img :src="rating.avatar" alt="">
                      </div>
                      <div class="content1">
                          <h1 class="name1">{{rating.username}}</h1>
                          <div class="star-wrap1">
                              <star :size="24" :score="rating.score"></star>
                              <span class="delivery1" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                          </div>
                          <p class="text1">{{rating.text}}</p>
                          <div class="recommend1" v-show="rating.recommend && rating.recommend.length">
                             <span v-for="item in rating.recommend" class="item1">{{item}}</span>
                          </div>
                          <div class="time1"> {{rating.rateTime | formatDate}} </div>
            
                         
                      </div>
                  </li>
              </ul>
          </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";
import {formatDate} from '../../common/js/data.js';

var POSITIVE=0;
var NEGATIVE=0;
var All=2;
var ERR_OK=0;
export default{
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            ratings:[],
                selectType:All,
                onlyContent:true,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
               }
            } 
    },
    created(){
        this.$http.get('/api/ratings').then((response)=>{
            response=response.body;
            console.log(response)
            if(response.errno===ERR_OK){
                this.ratings=response.data;
                this.$nextTick(()=>{
                    this.scroll=new BScroll(this.$refs.ratings,{
                    click:true
                    });
                });
                
              
            }
        })
    },
    components:{
        star,
        split,
        ratingselect

    },
     filters:{
           formatDate(time){
            var data = new Date(time);
            return formatDate(data,'yyyy-MM-dd hh:mm');
           } 
        }

}
</script>

<style type="text/css">
    .ratings{
        position: absolute;
        top:174px;
        bottom:0;
        left:0;
        width:100%;
        overflow: hidden;
    }
    .ratings .overview{
        display:flex;
        padding:18px 0;
    }
    .ratings .overview .overvie-left{
        flex:0 0 137px;
        padding:6px 0;
        width: 137px;
        border-right:1px solid rgba(7,17,27,0.1);
        text-align: center;
        @media only screen and (max-width:320px){
            flex:0 0 120px;
            width: 120px;
        }
    }
    .ratings .overview .overvie-left .score{
        line-height: 28px;
        font-size: 24px;
        color:rgb(255,153,0);
    }
    .ratings .overview .overvie-left .title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color:rgb(7,17,27);
    }
    .ratings .overview .overvie-left .rank{
        line-height: 10px;
        font-size: 10px;
        color:rgb(147,153,159);
    }
    .ratings .overview .overvie-right{
        flex:1;
        padding:6px 0 6px 24px;
        @media only screen and (max-width:320px){
            padding-left:6px;      
        }
    }
    .ratings .overview .overvie-right .score-wrap{
    
        font-size: 0;
        margin-bottom: 8px;
    }
    .ratings .overview .overvie-right .score-wrap .title{
        display: inline-block;
        font-size: 12px;
        color:rgb(7,17,27);
        line-height: 18px;
    }
    .ratings .overview .overvie-right .score-wrap .star{
        display: inline-block;
        margin:0 12px;
        vertical-align: top;
    }
    .ratings .overview .overvie-right .score-wrap .score{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 18px;
        color:rgb(255,153,0);
    }
    .ratings .overview .overvie-right .delivery-wrap{
        font-size: 0;
    }
    .ratings .overview .overvie-right .delivery-wrap .title{
        font-size: 12px;
        color:rgb(7,17,27);
        line-height: 18px;
    }
    .ratings .overview .overvie-right .delivery-wrap .delivery{
        font-size: 12px;
        color:rgb(147,153,159);
        margin-left: 12px;
    }
    .ratings .rating-wrap1{
        padding: 0 18px;

    }
    .ratings .rating-wrap1 .rating-item1{
        display:flex;
        padding:18px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .ratings .rating-wrap1 .rating-item1 .avatar1{
        flex:0 0 28px;
        width: 28px;
        margin-right:12px;
    }
     .ratings .rating-wrap1 .rating-item1 .avatar1 img{
        border-radius: 50%;
        width: 28px;
        height: 28px;
     }
     .ratings .rating-wrap1 .rating-item1 .content1{
        position: relative;
        flex:1;
     }
     .ratings .rating-wrap1 .rating-item1 .content1 .name1{
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(7,17,27);
     }
      .ratings .rating-wrap1 .rating-item1 .content1 .star{
        display: inline-block;
      }
     .ratings .rating-wrap1 .rating-item1 .content1 .star-wrap1{
       
        margin-bottom: 6px;
        font-size: 0;
     }
     .ratings .rating-wrap1 .rating-item1 .content1 .star-wrap1 .star1{
        display: inline-block;
        margin-right: 6px;
        vertical-align: top;
     }
     .ratings .rating-wrap1 .rating-item1 .content1 .star-wrap1 .delivery1{
        display: inline-block;
        vertical-align: top;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147,153,159);
     }
     .ratings .rating-wrap1 .rating-item1 .content1 .text1{
        line-height: 18px;
        color: rgb(7,17,27);
        font-size: 12px;
        margin-bottom: 8px;
     }
      .ratings .rating-wrap1 .rating-item1 .content1 .recommend1{
        line-height: 16px;

      }
       .ratings .rating-wrap1 .rating-item1 .content1 .recommend1 .item1{
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
       }
</style>