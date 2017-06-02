<template>
    <div class="cartconcontrol">
        <div class="cart-decrease" v-show='food.count>0'>-</div>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add" @click="addCard">+</div>
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
                    Vue.set(this.food,'count',1)
                  //this.food.count=1;  
                }else{
                    this.food.count++;
                }
            }
        }
    };
</script>
<style type="text/css">
    .cartconcontrol{
        font-size:0;
    }
    .cartconcontrol .cart-decrease, .cart-add{
        display: inline-block;
        padding:6px;
        font-size: 14px;
        font-weight: 800;
        color:#fff;
        width: 8px;
        height: 8px;
        background:rgb(0,160,220);
        line-height: 8px;
        border-radius: 50%;
    }
    .cartconcontrol .cart-count{
        display: inline-block;
    }
    .cartconcontrol .cart-add{
        display: inline-block;
    }
</style>