<template>
	<div>
		<md-button @click="back()">Go Back</md-button>
		Details of the Candidate
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{userProfile.name}}</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head><b>Name</b></md-table-head>
        <md-table-head>{{userProfile.name}}</md-table-head>

      </md-table-row>
      <md-table-row>
        <md-table-head>Email</md-table-head>
        <md-table-head>{{userProfile.email}}</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-head>Web Address</md-table-head>
        <md-table-head>{{userProfile.webaddress}}</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-head>Cover Letter</md-table-head>
        <md-table-head>{{userProfile.coverletter}}</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-head>Likes Working?</md-table-head>
        <md-table-head v-if="userProfile.like">Yes</md-table-head>
        <md-table-head v-else>No</md-table-head>
      </md-table-row>
      <md-table-row>
      	<md-table-head>When Applied</md-table-head>
      	<md-table-head>{{userProfile.uts}}</md-table-head>
      </md-table-row>
      <md-table-row>
      	<md-table-head>IP address</md-table-head>
      	<md-table-head>{{userProfile.IP}}</md-table-head>
      </md-table-row>
      <md-table-row>
      	<md-table-head>Location</md-table-head>
      	<md-table-head>{{userProfile.location}}</md-table-head>
      </md-table-row>
    </md-table>
    <div id="pdf">
   <iframe :src=url style="width: 80%; height: 1200px;" frameborder="0" scrolling="no">
        <p>It appears your web browser doesn't support iframes.</p>
   </iframe>
</div>
    <div class="comments" >
    	<div v-if="userProfile.reviews!=null" style="width:50%;float:left">
						<p style="text-align: left;">Comments</p>
        		<div v-for="review in userProfile.reviews" style="text-align: left;width:50%;">
        			<b>{{review.by}}</b>:{{review.content}}<br>

        		</div>
        	</div>
        	<div class="rating" style="width:50%;float:right;">
    		<div v-if="!alreadyRated()">
    			<star-rating v-bind:star-size="20" v-model="rating"></star-rating>
    			<md-button class="md-raised md-primary" @click="submitRating()">SUBMIT RATING</md-button>
    		</div>

    </div>
    </div>

    <div class="addComment">
    	 <div class="comment" style="text-align: left;">
        		<br>
        		    <md-field>
      <label>Add Comment</label>
      <md-input v-model="comment"></md-input>
    </md-field>
        		<md-button class="md-raised md-primary" @click="addComment(userProfile.email)">Add Comment</md-button>
        	</div>
    </div>


	</div>
</template>
<script>
export default {
	components: {
  },
	props:['email','profile'],
	data:function(){
		return{
			loggedInEmail:'',
			userProfile:{},
			comment:'',
    	api_url:'http://localhost:8000',
    	rating:0,
    	url:'',

		}
	},
	created:function(){
		if(this.email==null || this.email==undefined || this.email==''){
			this.$router.push({ name: 'login'});
		}
		this.getProfile(this.profile.email);
		//this.userProfile=this.profile;
	},
	methods:{
		back:function(){
			this.$router.push({ name: 'admin', params: {email: this.email }})
		},
		submitRating(){

  		const url=this.api_url+'/addRating/'+this.userProfile.email+'/'+this.rating+'/'+this.email;
  		this.axios.get(url).then((response)=> {
  			this.getProfile(this.userProfile.email);
  		})
  	},
			alreadyRated:function(){
				var result=false;
				if(this.userProfile.ratings==null){
					return result;
				}
				for(var i=0;i<this.userProfile.ratings.length;i++){

					if (this.userProfile.ratings[i].by==this.email){
						result=true;
						break;
					}
				}
				return result;

			},
		  	getRating:function(p){

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
  	addComment(email){
  		const url=this.api_url+'/addComment/'+email+'/'+this.comment+'/'+this.email;
  		this.axios.get(url).then((response)=> {
  			this.comment='';
  			this.getProfile(email);
  		})
  	},

  	getProfile:function(email){
  		console.log("getProfile called");
  		const url=this.api_url+'/getProfile/'+email;
  		this.axios.get(url).then((response)=> {
  			this.userProfile=response.data;
  			this.url=this.api_url+"/uploads/"+this.userProfile.email+".pdf";
  			console.log(this.url);
  		})
  	},
	}

}
</script>
<style></style>