<template>

    <div class="shoppcart">
      <div class="content-shop" @click="toggleList">
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
          <div class="content-right" @click.stop.prevent="pay">
              <div class="pay" :class='payClass'>
                  {{payDesc}}
              </div>
          </div>  
      </div>
      <div class="shoppcart-list " v-show="listShow">
          <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
              <ul>
                  <li class="foodul" v-for="food in selectFoods">
                      <span class="name">{{food.name}}</span>
                      <div class="price">
                          <span>￥{{food.price*food.count}}</span>
                      </div>
                      <div class="cartcontrol-wrap">
                          <cartcontrol :food="food"></cartcontrol>
                      </div>
                  </li>
              </ul>
          </div>
      </div>

    </div>
<!--  <div class="list-mask" v-show="listShow"></div>  -->
  
</template>
<script type="text/javascript">
import cartcontrol from 'components/cartconcontrol/cartconcontrol';
import BScroll from 'better-scroll'
    export default{
         data(){
                return{
                  fold:true
                }
            },
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
            },
            listShow(){
                if(!this.totalCount){
                    this.fold=true;
                    return false;
                }
                var show=!this.fold;
                if(show){
                  
                  this.$nextTick(()=>{
                    if(!this.scroll){
                      this.scroll=new BScroll(this.$refs.listContent,{
                      click:true
                    });
                    }else{
                      this.scroll.refresh();
                    }
                    
                  })
                }
                return show;
            }
        },
        methods:{
            toggleList(){
               if(!this.totalCount){
                return;
               }
               this.fold=!this.fold
            },
            empty(){
              this.selectFoods.forEach((food)=>{
                food.count=0;
              })
            },
            pay(){
              if(this.totalPrice<this.minPrice){
                return;
              }
              window.alert(`支付${this.totalPrice}元`)
            }
        },
        components:{
            cartcontrol
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
    .shoppcart .shoppcart-list{
        position: absolute;
        top:20px;
        left:0;
        z-index:-1;
        width: 100%;
        transition: all 0.5s;
        transform:translate3d(0,-100%,0);
    }
   .shoppcart .shoppcart-list .list-header{
    height:40px;
    line-height: 40px;
    padding:0 18px;
    background:#f3f5f7;
    border-bottom: 1px solid raga(7,17,27,0.1);
   }
   .shoppcart .shoppcart-list .list-header .title{
    font-weight: 400;
    float:left;
    font-size: 14px;
    color:rgb(7,17,27);
   }
   .shoppcart .shoppcart-list .list-header .empty{
    float:right;
    font-size: 12px;
    color:rgb(0,160,220);
   }
   .shoppcart .shoppcart-list .list-content{
        padding:0 18px;
        max-height: 217px;
        overflow: hidden;
        background:#fff;
   }
   .shoppcart .shoppcart-list .list-content .foodul{
    list-style: none;
    position: relative;
    padding:12px 0;
    box-sizing: border-box;
    border-bottom:1px solid rgba(7,17,27,0.1);
   }
   .shoppcart .shoppcart-list .list-content .foodul .name{
    line-height: 24px;
    font-size: 14px;
    color:rgb(7,17,27);
   }
   .shoppcart .shoppcart-list .list-content .foodul .price{
    position: absolute;
    right:90px;
    bottom:12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color:#f01414;
   }
   .shoppcart .shoppcart-list .list-content .foodul .cartcontrol-wrap{
    position: absolute;
    right:0;
    bottom:13px;
   }
   .list-mask{
   position:fixed;
   top:0;
   left:0;
   width: 100%;
   height: 100%;
   z-index:40;
   opacity: 1;
   background: rgba(7,17,27,0.6);
   backdrop-filter:blur(10px);
  } 
</style>