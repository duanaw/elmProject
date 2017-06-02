<template>
    <div class="goods">
        <div class="menu-warp" ref="meunWrap">
            <ul>
                <li v-for='(item,index) in goods' class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="goods-text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foots-wrap" ref="foodsWrap">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="food-content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span class="pin">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-show="food.oldPrice"  class="old">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shoppcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shoppcart>
    </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
import shoppcart from 'components/shoppcart/shoppcart';
const ERR_OK=0;
    export default{
        //父组件向子组件传递数据
        props:{
            seller:{
                type:Object
            }
        },
        //放初始数据
        data(){
            return{
                goods:[],
                listHeight:[],
                scrollY:0
            }
        },
      //计算属性  （计算滚动的）
      computed:{
            currentIndex(){
                for(var i=0;i<this.listHeight.length;i++){
                    var height1=this.listHeight[i];
                    var height2=this.listHeight[i+1];
                  if(this.scrollY>=height1&&this.scrollY<height2){
                        return i
                  }

                }
                return 0;
            }
        },
        //渲染后的
        created(){
            this.$http.get('/api/goods').then((response)=>{
                response=response.body;
                if(response.errno===ERR_OK){
                    this.goods=response.data;
                    this.$nextTick(()=>{
                        this._initScroll();
                        this._calculateHeight()
                    })

                }
            }),
            this.classMap=['decrease','discount','special','invoice','guarantee'];
        },
        //放函数的
        methods:{
            //scroll事件
            _initScroll(){
                this.meunScroll=new BScroll(this.$refs.meunWrap,{
                    click:true   //设置为true的时候可以点击
                });
                this.foodsScroll=new BScroll(this.$refs.foodsWrap,{
                    probeType:3
                });
                this.foodsScroll.on('scroll',(pos)=>{
                    this.scrollY=Math.abs(Math.round(pos.y));
                })
            },

            //滚动可以让后面左面的添加类
            _calculateHeight(){
                var foodList=this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
                var height=0;
                this.listHeight.push(height)
                for(var i=0;i<foodList.length;i++){
                    var item=foodList[i]
                    height+=item.clientHeight
                    this.listHeight.push(height)
                }
            },
            selectMenu(index,event){
                //兼容pc端点击1次，不然在pc会调用两次
                if(!event._constructed){
                    return;
                }

                var foodList=this.$refs.foodsWrap.getElementsByClassName('food-list-hook')
                var el=foodList[index]
                console.log(el)
                this.foodsScroll.scrollToElement(el,300)
                console.log(index)
              
            }
        },
        components:{
            shoppcart
        }
       
    }
</script>
<style type="text/css">
.goods{
    display:flex;
    position: absolute;
    top:185px;
    bottom:46px;
    width:100%;
    overflow: hidden;
} 
.goods .menu-warp{
    flex:0 0 80px;
    width: 80px;
    background:#f4f5f7;
}
.goods .menu-warp .menu-item{
    display:table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
    list-style: none;

}
.goods .menu-warp .current{
    position: relative;
    margin-top:-1px;
    background:#fff;
    font-weight: 700;
}

.goods .menu-warp .menu-item .goods-text{
    display:table-cell;
    width: 56px;
    font-size: 12px;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
}
.goods .menu-warp .current .goods-text{
   border-bottom:none;
}
.goods .foots-wrap{
    flex:1;
} 
.goods .foots-wrap .food-list{
    list-style: none;
}
.goods .foots-wrap .food-list .food-item{
    list-style: none;
    display: flex;
    margin: 18px;
    border-bottom:1px solid rgba(7,17,27,0.1); 
    padding-bottom: 18px;
}
.goods .foots-wrap .food-list ul :last-child{
    border-bottom: none;
    margin-bottom: 0;
}
.goods .foots-wrap .food-list .food-item .icon img{
    width: 57px;
    height: 57px;
    flex:0 0 57px;
    margin-right:10px; 
}
.goods .foots-wrap .food-list .food-item .food-content{
    flex:1;
}
.goods .foots-wrap .food-list .food-item .food-content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 400;
    color:#07111b;
}
.goods .foots-wrap .food-list .food-item .food-content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
     color: #93999f;
}
.goods .foots-wrap .food-list .food-item .food-content .extra{
    line-height: 10px;

}
.goods .foots-wrap .food-list .food-item .food-content .extra .count{
    margin-right: 12px;
    color: #93999f;
    font-size: 10px;
}
.goods .foots-wrap .food-list .food-item .food-content .extra .pin{
    color: #93999f;
    font-size: 10px;
}
.goods .foots-wrap .food-list .food-item .food-content .price{
    
    line-height: 24px;
}
.goods .foots-wrap .food-list .food-item .food-content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: #f01414;
}
.goods .foots-wrap .food-list .food-item .food-content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color:#93999f;
}
.goods .foots-wrap .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    font-weight: 400;
    color: rgba(147,153,159);
    background:#f3f5f7;
} 
</style>
