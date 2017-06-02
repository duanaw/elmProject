import home from './components/home';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
module.exports = function(VueRouter){
	const router = new VueRouter({
		routes:[
			{
				name:'home',
				path:'/',
				component: home
			},
			{
				name:'goods',
				path:'/goods',
				component: goods
			},
			{
				name:'ratings',
				path:'/ratings',
				component: ratings
			},{
				name:'seller',
				path:'/seller',
				component: seller
			}

		]
	})

	return router;
}