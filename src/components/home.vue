<template>
    <div id="home">
        <!-- <v-head :seller='seller'></v-head>
        <div class="tab">
            <div class="tab-item" @click="addClass(1)">
               商品
            </div>
            <div class="tab-item" @click="addClass(2)">
               评论
            </div>
            <div class="tab-item" @click="addClass(3)">
               商家
            </div>
        </div>
        <div class="content">
            <div class="goods">1</div>
            <div class="goods">2</div>
            <div class="goods">3</div>
        </div> -->
    </div>
</template>
<script>
 import head from './head/head.vue';

 const ERR_OK=0;
 export default{
    data(){
        return {
            seller:{}
        };
    },
    created(){
        this.$http.get('/api/seller').then((response)=>{
            response=response.body;
            if(response.errno===ERR_OK){
                this.seller=response.data;
                console.log(this.seller)
            }
        })
    },
    components:{
        'v-head':head
    },
    methods:{
        addClass(id){
            console.log(this.id)
        }
    }
 }
</script>
<style>
    .tab{
        display:flex;
        width: 100%;
        height: 40px;
        line-height:40px;
        border-bottom:1px solid #ccc; 

    }
    .tab .tab-item{
        -webkit-flex:1;
        text-align: center;
    }
    .content{
        width: 300%;
        height: 100%;
        overflow: hidden;
        display: flex;
    }
     .content .goods{
        width: 100%;
        height: 100%;
     }
   
</style>