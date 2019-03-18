<template>
  <div class="hello">
    <!-- <div style="text-align: -webkit-auto;">
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/login">Login</router-link>
    </div> -->

    <md-card>
      <md-card-header>
        <div class="md-title">Submit your review here</div>
      </md-card-header>
      <md-card-content>

    <md-field>
      <label>Name</label>
      <md-input v-model="name" required></md-input>
      <span class="md-helper-text">Enter your name here</span>
    </md-field>

    <md-field>
      <label>Email</label>
      <md-input type="email" v-model="email" required></md-input>
      <span class="md-helper-text">Enter your email id</span>
    </md-field>

    <md-field>
      <label>Web Address</label>
      <md-input v-model="webAddress" required></md-input>
      <span class="md-helper-text">Enter a link that showcases your work</span>
    </md-field>

    <md-field>
      <label>Cover Letter</label>
      <md-textarea v-model="coverletter" md-autogrow required></md-textarea>
    </md-field>
      <md-field>

      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept="application/pdf"/>
    </md-field>
    <div style="text-align: left">
      Do you like working?
      <md-radio v-model="boolean" :value="true">Yes</md-radio>
      <md-radio v-model="boolean" :value="false">No</md-radio>

  </div>


<div style="text-align:unset;"><p  style="width:100px;float:left;border-style:ridge;background-color: green;color:black;text-align: center;">{{captchaText}}</p><span style="float:left;"><md-button @click="makeid()">Reload</md-button></span></div>
        <md-field>
      <label>Captcha</label>

      <md-input v-model="captchaInput" required></md-input>
      <span class="md-helper-text">Enter the captcha here</span>
    </md-field>

      </md-card-content>

    </md-card>

<md-button class="left md-raised md-primary md-green" @click="checkEmailExists">Submit My Application</md-button>
     <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{error}}</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {

  name: 'Home',
  data() {
   return {
    name: '',
    email:'',
    webAddress:'',
    coverletter:'',
    attachment:null,
    boolean:true,
    api_url:'api',
    allGood:false,
    error:'',
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    file:'',
    emailExists:false,
    captchaText:'',
    captchaInput:'',
    ip: '',
    location:'',
   }
 },
  props: {
    msg: String
  },
  created:function(){
    var _this = this;


      this.axios.get('http://www.geoplugin.net/json.gp').then((response) => {
       console.log("Ip address result");
       this.ip=response.data.geoplugin_request;
       this.location=response.data.geoplugin_city+","+response.data.geoplugin_region;

})

    console.log("This is during created");
    this.makeid();

  },
  mounted: function () {


},
  methods:{

    makeid:function() {
      var length=5;
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      this.captchaText=text;

},
    handleFileUpload:function(){
      this.file = this.$refs.file.files[0];
      console.log("Inside handleFileUpload");
      console.log(this.$refs.file.files[0]);

    },
    validateForm: function(){
      if(this.name==''){
        this.allGood=false;
        this.error="Enter a valid name";
        this.showSnackbar = true;
        return;
      }
      if(this.email==''){
        this.allGood=false;
        this.error="Enter a valid email";

        this.showSnackbar = true;
        return;
      }
      if (!this.validateEmail(this.email)){
          this.error="Enter a valid email";
          this.showSnackbar=true;
          return;
        }
      if(this.webAddress==''){
        this.allGood=false;
        this.error="Enter a valid webAddress";
        this.showSnackbar = true;
        return;
      }
      if(!this.validURL(this.webAddress)){
        this.allGood=false;
        this.error="Enter a valid webAddress";
        this.showSnackbar=true;
        return;
      }
      if(this.coverletter==''){
        this.allGood=false;
        this.error="Enter a cover letter";
        this.showSnackbar = true;
        return;
      }
      if(this.file==''){
        this.allGood=false;
        this.error="Attachment missing";
        this.showSnackbar = true;
        return;
      }
      if(this.captchaInput!=this.captchaText){
        this.allGood=false;
        this.error="Captcha Incorrect"
        this.showSnackbar=true;
        return
      }
      this.allGood=true;
      this.submitReview();
    },
    checkEmailExists:function(email){
      var _this=this;
      const url = this.api_url+'/checkEmail/'+this.email;
      this.axios.get(url).then((response) => {
       _this.emailExists=response.data;
        if(response.data!=true){
          this.validateForm();
        }else{
          this.error="This email has already submitted a feedback. Try with another email";
          this.showSnackbar=true;
        }
})
    },
    validateEmail:function(mail)
    {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    return (false)
    },
    validURL:function(str) {
  var regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
    },
    submitReview:function(){
      if(this.allGood){
        var _this=this;
        let formData = new FormData();
        formData.append('file',_this.file);
        formData.append('name',_this.name);
        formData.append('email',_this.email);
        formData.append('webAddress',_this.webAddress);
        formData.append('coverletter',_this.coverletter);
        formData.append('boolean',_this.boolean);
        formData.append('ip',_this.ip);
        formData.append('location',_this.location);
        const url = _this.api_url+'/submitReview';
        this.axios.post(url, formData, {headers: {
          'Content-type': 'multipart/form-data',
        }}).then();
        this.error="Successfully submitted";
        this.showSnackbar=true;
        this.name='';
        this.email='';
        this.webAddress='';
        this.coverletter='';
        this.file=undefined;
        this.captchaInput='';
        document.getElementById("file").value = "";
        this.makeid();
      }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.green{
  color:green;
}
.red{
  color:red;
}
.left{
  float:left;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  margin:0 50px;
}
.link{
  margin:0 20px;
}
</style>
