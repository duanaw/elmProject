/* 
* @Author: Marte
* @Date:   2017-06-09 16:45:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-09 17:10:14
*/
//存储数据
export function saveToLocal(id,key,value){
    var seller=window.localStorage.__seller__;
    if(!seller){
        seller={};
        seller[id]={};
        seller[id][key]=value;
    }else{
        seller=JSON.parse(seller);
        if(!seller[id]){
            seller[id]={};
        }
    }
    seller[id][key]=value;
    localStorage.__seller__=JSON.stringify(seller)
};
//读取数据
export function loadFromLocal(id,key,def){
     var seller=window.localStorage.__seller__;
     if(!seller){
        return def;
     }
     seller=JSON.parse(seller)[id];
     if(!seller){
        return def;
     }

     var ret=seller[key];
     return ret || def;
}
