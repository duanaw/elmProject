<template>
  <div id="app">
        <v-head :seller='seller'></v-head>
        <div class="tab">
            <div class="tab-item">
               <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
               <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
               <router-link to="/seller">商家</router-link>
            </div>
        </div>
      <div class="footer">
        <keep-alive><router-view :seller="seller"></router-view></keep-alive>
      </div>
  </div>
    
</template>

<script>
//rem 适配
import { setREM } from './script/util';
import { Alert } from 'vux';
import head from './components/head/head.vue';
import {urlParse} from './common/js/uid.js';

const ERR_OK=0;
export default {
  name: 'app',
   data(){
        return {
            seller:{
              id:(()=>{
                var queryParam=urlParse();
                console.log(queryParam)
                return queryParam.id
              })()
            }
        };
    },
  created () {
    setREM(),
    this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
            response=response.body;
            if(response.errno===ERR_OK){
                //this.seller=response.data;
                this.seller=Object.assign({},this.seller,response.data);
                console.log(this.seller.id)
                console.log(this.seller)
            }
        })
  },
  components:{
        'v-head':head
    },
    methods:{
        
    }
}

</script>

<style lang="less">
@import '~vux/src/styles/index.less';
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

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
