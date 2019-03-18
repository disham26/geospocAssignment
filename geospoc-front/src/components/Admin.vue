<template>
<div>{{email}}
		<div class="showAllProfiles">
			<h1>Here we will see all the details of the profiles</h1>

				<div class="Row">
					<div class="Column">
						<md-field>
          <label for="movie">Categories</label>
          <md-select v-model="section">
            <md-option value="all">All</md-option>
            <md-option value="reviews">My Reviewed</md-option>
            <md-option value="best">All 5 *</md-option>
          </md-select>
        </md-field>
					</div>
					<div class="Column">
      			<md-field>
      			<label>Search for a name</label>
      			<md-input v-on:keyup="searchNameFunc()" v-model="searchName"></md-input>
      		</md-field>
      	</div>
					<div class="Column">
    			<md-field>
      			<label>Search for email</label>
      			<md-input v-on:keyup="searchEmailFunc()" v-model="searchEmail"></md-input>
    			</md-field>
    		</div>
    		</div>

    		<div style="float:left;width:100%;">
    			<div v-if="allProfiles.length>0">
			<md-card  class="card" v-for="p in allProfiles">
      <div @click="goToProfile(p)" style="cursor: pointer;">
      <md-card-header >
        <div class="md-title" style="text-align: left;">{{p.name}}
        	<div style="float:right;text-align: right;"><star-rating v-bind:star-size="20" :rating="getRating(p)" :read-only="true"></star-rating>
        	</div>
        </div>
        <div class="md-subhead" style="text-align: left;">{{p.email}}</div>
      </md-card-header>


			</div>
			</md-card>
		</div>
		<div v-else>
			No Entries
		</div>
		</div>
		</div>
	</div>
</div></template>
<script>
export default {
props: ['email'],
data() {
    return {
    	loginEmail:'',
    	profiles:[],
    	allProfiles:[],
    	searchName:'',
    	searchEmail:'',
    	api_url:'http://localhost:8000',
    	section:'all',
}
},
watch:{
section:function(){
	this.searchEmail='';
	this.searchName='';
	switch(this.section){
		case 'reviews':console.log("reviews");
		this.allProfiles=[];
		for(var i=0;i<this.profiles.length;i++){
			if(this.profiles[i].reviews!=null){
				for(var j=0;j<this.profiles[i].reviews.length;j++){
					if(this.profiles[i].reviews[j].by==this.email){
						this.allProfiles.push(this.profiles[i]);
					}
				}
			}

		}
		break;
		case 'best':console.log("best");
		this.allProfiles=[];
		for(var i=0;i<this.profiles.length;i++){
			if(this.profiles[i].ratings!=null){
				for(var j=0;j<this.profiles[i].ratings.length;j++){
					if (this.profiles[i].ratings[j].rating==5){
						this.allProfiles.push(this.profiles[i]);
					}
				}
			}
		}
		break;
		case 'all':console.log("all");
		this.allProfiles=this.profiles;
		break
	}
}
},
created:function(){
	if(this.email==''||this.email==undefined){
		console.log("Aivayi a gaya, bhagao isko");
		this.$router.push({ name: 'login'});


	}else{
		console.log("Sachhi user hai"+this.email);
		this.loginEmail=this.email;
		this.getAllProfiles();
	}
},
methods:{
	searchNameFunc:function(){
		console.log("Called");
		this.allProfiles=[];
		var lowerSearch = this.searchName.toLowerCase();
		for(var i=0;i<this.profiles.length;i++){
			if(this.profiles[i].name.toLowerCase().includes(lowerSearch)){
				this.allProfiles.push(this.profiles[i]);
			}
		}
	},
	searchEmailFunc:function(){
		console.log("Called");
		this.allProfiles=[];
		var lowerSearch = this.searchEmail.toLowerCase();
		for(var i=0;i<this.profiles.length;i++){
			if(this.profiles[i].email.toLowerCase().includes(lowerSearch)){
				this.allProfiles.push(this.profiles[i]);
			}
		}
	},
		goToProfile:function(p){
			console.log(p);
			this.$router.push({ name: 'profile', params: {id:p.email,email: this.email,profile:p }})
		},
		getAllProfiles:function(){
  		const url=this.api_url+'/getAllProfiles';
  		this.axios.get(url).then((response)=> {
  			this.profiles=response.data;
  			this.allProfiles=response.data;
  		})
  	},
  	getRating:function(p){
  		//console.log(p);
  		var result=0;
  		var count=0;
  		if(p.ratings!=null){
  			for(var i=0;i<p.ratings.length;i++){
  			count++;
  			result+=p.ratings[i].rating;
  		}
  	}else{
  		return 0;
  	}

  		return result/count;
  	},
}
}
</script>
<style>
	.Row
{
    display: table;
    width: 100%;
    table-layout: fixed;
    border-spacing: 10px;
}
.Column
{
    display: table-cell;
}
</style>