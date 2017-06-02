<template>
    <div class="shoppcart">
      <div class="content-shop">
          <div class="content-left">
              <div class="logo-wrap">
                  <div class="logo" :class="{'highlight':totalCount>0}">
                      <span class="icon-shopping_cart">购物</span>
                  </div>
                  <div class="num">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay" :class='payClass'>
                  {{payDesc}}
              </div>
          </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        props:{
            selectFoods:{
                type:Array,
                default(){
                    return[
                    {
                        price:10,
                        count:1
                    }
                    ];
                }
            },
           deliveryPrice:{
            type:Number,
            default:0
           },
           minPrice:{
            type:Number,
            default:0
           }
        },
        computed:{
            //计算价格
            totalPrice(){
                var total=0;
                this.selectFoods.forEach((food)=>{
                    total+=food.price*food.count;
                });
                return total
            },
            totalCount(){
               var count=0;
               this.selectFoods.forEach((food)=>{
                count+=food.count;
               })
               return count;
            },
            payDesc(){
               if(this.totalPrice==0){
                return `￥${this.minPrice}元起送`;
               }else if(this.totalPrice<this.minPrice){
                var diff=this.minPrice-this.totalPrice;
                return `还差￥${diff}元起送`;
               }else{
                return '去结算';
               }
            },
            payClass(){
                if(this.totalPrice<this.minPrice){
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            }
        }
    }
</script>
<style type="text/css">
    .shoppcart{
        position: fixed;
        left:0;
        bottom:0;
        z-index:50;
        width: 100%;
        height: 48px;
       
    }
    .shoppcart .content-shop{
        display:flex;
        background:#141d27;
        font-size: 0;
    }
    .shoppcart .content-shop .content-left{
        flex:1;
        
    }
    .shoppcart .content-shop .content-left .logo-wrap{
        display: inline-block;
        position: absolute;
        top:-10px;
        margin:0 12px;
        padding:6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background:#141d27;
    }
    .shoppcart .content-shop .content-left .logo-wrap .num{
        position: absolute;
        top:0;
        right:0;
        width:24px;
        height: 16px;
        line-height:16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        background:#f00;
        box-shadow: 0 4px 8px 0 rgba(0,0 0,0.4);
        color:#fff;
    }
    .shoppcart .content-shop .content-left .logo-wrap .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background:#2b343c;
        position: relative;
    }
    .shoppcart .content-shop .content-left .logo-wrap .highlight{
        background:rgb(0,160,220);
    }
    .shoppcart .content-shop .content-left .logo-wrap .logo .icon-shopping_cart{
       float:left;
        font-size: 10px;
        color:#fff;
        text-align: center;
        line-height: 44px;
        position: absolute;
        left:8px;
    }
    
    .shoppcart .content-shop .content-left .price{

        display: inline-block;
        vertical-align: top;

        margin-top: 12px;
        line-height: 24px;
        box-sizing: border-box;
        padding-left:78px;
        border-right:1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight:700;
        color:rgba(255,255,255,0.4);
    }
    .shoppcart .content-shop .content-left .highlight{
         color:#fff;
    }
    .shoppcart .content-shop .content-left .desc{
        display: inline-block;
        vertical-align: top;
        margin:12px 0 0 12px;
        line-height: 24px;
        color:rgba(255,255,255,0.4);
        font-size: 10px;
    }
    .shoppcart .content-shop .content-right{
        flex:0 0 105px;
        width: 105px;
        background:#2b343c;
    }
    .shoppcart .content-shop .content-right .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color:rgba(255,255,255,0.4);
        font-weight: 700;
    }
     .shoppcart .content-shop .content-right .not-enough{
        background:#2b333b;
     }
     .shoppcart .content-shop .content-right .enough{
        background:#00b43c;
        color:#fff;
     }
</style>