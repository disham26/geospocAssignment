<template>
  <div id="app">
<div style="text-align: -webkit-auto;">
    <router-link class="link" to="/">User Form</router-link>
    <router-link class="link" to="/login">Admin</router-link>
    </div>

 <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  data:function(){
    return {
      login:'',
    };
  },
  methods:{
    loginUser:function(){
    }
  },
  components: {
    Home,Login
  }
}
</script>

<style>
 .link{

  padding:0 20px !important;
}
.right{
  float:right;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo{
  width:150px;
}
</style>
