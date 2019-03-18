import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Profiles from './components/Profiles.vue'
import StarRating from 'vue-star-rating'
import Admin from './components/Admin.vue'
import Profile from './components/Profile.vue'

Vue.component('star-rating', StarRating);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
const routes = [
{path: '/',component: Home,name:'home'},
{path:'/login',component:Login,name:'login'},
{path:'/admin',component:Admin,name:'admin',props: true},
{path:'/profiles',component:Profiles,name:'profiles'},
{path:'/profile/:id',component:Profile,name:'profile',props:true},
];

const router = new VueRouter({
	routes,
	mode:'history'
})
new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
