<template>
    <div class="cartconcontrol">
        <div class="cart-decrease" v-show='food.count>0'  @click.stop.prevent="decreaseCart">-</div>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add" @click.stop.prevent="addCard" ref="cartAdd">+</div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
    export default{
        props:{
            food:{
                type:Object
            }
        },
        creaed(){
            console.log(this.food)
        },
        methods:{
            addCard(event){
               if(!event._constructed){
                return;
               }
               console.log(111)
                if(!this.food.count){
                    Vue.set(this.food,'count',1)    //添加字段   vue的特性
                  //this.food.count=1;  
                }else{
                    this.food.count++;
                }
               var cartAdd=this.$refs.cartAdd
            },
            decreaseCart(event){
                if(!event._constructed){
                    return;
                }
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    };
</script>
<style type="text/css">
    .cartconcontrol{
        font-size:0;
    }
    .cartconcontrol .cart-decrease{
        display: inline-block;
        padding:6px;
        font-size: 16px;
        color:rgb(0,160,220);
        width: 6px;
        height: 6px;
        background:#fff;
        line-height: 6px;
        border-radius: 50%;
        border:1px solid rgb(0,160,220);
        margin-right: 10px;
    }
    .cartconcontrol .cart-count{
        display: inline-block;
        font-size: 12px;
        color:rgb(147,153,159);
    }
    .cartconcontrol .cart-add{
        display: inline-block;
        padding:6px;
        font-size: 16px;
        color:#fff;
        width: 8px;
        height: 8px;
        background:rgb(0,160,220);
        line-height: 8px;
        border-radius: 50%;
        margin-left: 10px;
    }
</style>