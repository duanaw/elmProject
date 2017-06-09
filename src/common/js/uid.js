/* 
* @Author: Marte
* @Date:   2017-06-09 16:07:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-09 16:26:32
*/
/**解析URL的参数
*  @example
* ?id=123456&a=b
* @return Object {id:12345,a:b}
*/
export function urlParse(){
    var url=window.location.search;
    var obj={};
    var reg=/[?&][^?&]+=[^?&]+/g;
    var arr=url.match(reg);
    //['?id=123456','&a=b']
    if(arr){
        arr.forEach((item)=>{
            var tempArr=item.substring(1).split('=');
            var key=decodeURIComponent(tempArr[0]);
            var val=decodeURIComponent(tempArr[1]);
            obj[key]=val;
        })
    }
    return obj;
}