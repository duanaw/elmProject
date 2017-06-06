<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
            <span class="dui">✔</span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/javascript">
var POSITIVE=0;
var NEGATIVE=0;
var All=2;
    export default{
        props:{
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:All
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return{
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    };
                }
            }
        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType===POSITIVE;
                })
            },
            negatives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType===NEGATIVE;
                })
            }
        },
        methods:{
            select(type,event){
                if(!event._constructed){
                    return;
                }
               this.selectType = type;
              /* this.$emit('ratingtype.select',type)*/
            },
            toggleContent(event){
                if(!event._constructed){
                    return;
                }
                this.onlyContent=!this.onlyContent;  //这里对onlyContent做取反
            }
        }
    }
</script>
<style type="text/css">
    .ratingselect .rating-type{
        padding:18px 0;
        margin:0 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 0;
    }
    .ratingselect .rating-type .block{
        display: inline-block;
        padding:8px 12px;
        margin-right:8px;
        border-radius:1px;
        color:rgb(77,85,93);
        font-size: 12px;
    }
  
    .ratingselect .rating-type .block .count{
       margin-left:2px;
       line-height:16px;
       font-size: 8px; 
    }
    .ratingselect .rating-type .positive{
        background:rgba(0,160,220,0.2);
    }
   .ratingselect .rating-type .active{
    background:rgb(0,160,220);
    color:#fff;
   }
    .ratingselect .rating-type .negative{
        background:rgba(77,85,93,0.2); 
    }

   .ratingselect .switch{
    padding:12px 18px;
    font-size: 24px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    color:rgb(147,153,159);
    font-size: 0;
   }
   
   .ratingselect .switch .dui{
    display: inline-block;
    width: 20px;
    height: 20px;
    border:1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    margin-right: 4px;
    background:#ccc;
    color:#fff;
   }
    .ratingselect .on .dui{
        background:#00c850;
        border:1px solid #00c850;
   }
   .ratingselect .switch .text{
    font-size: 12px;
   }
</style>