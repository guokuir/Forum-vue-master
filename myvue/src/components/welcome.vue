<template>
  <body>

  <section class="nav">
    <img src="..//assets/sign.jpg">
  </section>


  <canvas class="background"></canvas>
  </body>
</template>


<script>
export default {
  name: "welcome",
  created() {
    this.islogin()
  },
  methods:{
    islogin() {
      const self = this
      self.$axios({
        method:"get",
        //url一律要再次修改
        url:"/user"
      })
        .then(result => {         //存储用户nickname
          if(result.data.token!=='' && result.data.token!==null){
            this.$store.commit("saveLocalid",result.data.data.userId,result.data.data.role === "1")
            this.$store.commit("saveNickname",result.data.data.nickname)
            this.ifIdNotExisted = false;
            // console.log(result);
            // alert(result.data.data.role === "1")
            // alert("index页面的islogin执行成功")
            // alert(result.data.id)
          }
          else {
            // alert("index页面的islogin执行失败")
            // alert(result.data)
          }

        })
    }
  }

}
import drag from '../assets/JS/welcome'

</script>

<style scoped>
/** {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  box-sizing: border-box;*/
/*}*/

body {
  font-family: "ROBOTO", sans-serif;
}

.nav,
.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-color: #1e1f26;
  text-align: center;
  padding: 0 2em;

}
.nav{
  background-image: url("../assets/1111.png");
  background-size:cover;
  background-attachment:fixed;
}

.nav h1,
.slider h1 {
  font-family: "Josefin Sans", sans-serif;
  font-size: 5vw;
  margin: 0;
  padding-bottom: 0.5rem;
  letter-spacing: 0.5rem;
  color: #03dac6;
  transition: all 0.3s ease;
  z-index: 3;
}
h1:hover {
  transform: translate3d(0, -10px, 22px);
  color: #ff0266;
}
.nav h2,
.slider h2 {
  font-size: 2vw;
  letter-spacing: 0.5rem;
  font-family: "ROBOTO", sans-serif;
  font-weight: 300;
  color: #ffffff;
  z-index: 4;
}

a {
  text-decoration: none;
}

.nav-container {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  background: #1e1f26;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-first {
  position: fixed;
  top: 75px;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-second {
  position: fixed;
  top: 0;
}
.nav-container--top-second {
  position: fixed;
  top: 0;
}

.nav-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #03dac6;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 2vw;
}

.nav-tab:hover {
  color: #1e1f26;
  background: #03dac6;
  transition: all 0.5s ease;
}

.nav-tab-slider {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 5px;
  background: #03dac6;
  transition: left 0.3s ease;
}
.background {
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: auto;
}
@media (min-width: 800px) {
  .nav h1,
  .slider h1 {
    font-size: 5vw;
  }

  .nav h2,
  .slider h2 {
    font-size: 3vw;
  }

  .nav-tab {
    font-size: 3vw;
  }
}

@media screen and (min-width: 360px) {
  .nav h1,
  .slider h1 {
    font-size: 8vw;
  }

  .nav h2,
  .slider h2 {
    font-size: 2vw;
    letter-spacing: 0.2vw;
  }

  .nav-tab {
    font-size: 1.2vw;
  }
}
.background {
  position: absolute;
  /*height: 100vh;*/
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
#tab-pwa{
  background-image: url("../assets/1.jpg");
  background-size:cover;
  background-attachment:fixed;
}
#tab-graphql{
  background-image: url("../assets/2.jpg");
  background-size:cover;
  background-attachment:fixed;
}
#tab-mocha{
  background-image: url("../assets/6.jpg");
  background-size:cover;
  background-attachment:fixed;
}
#tab-docker{
  background-image: url("../assets/5.jpg");
  background-size:cover;
  background-attachment:fixed;
}
</style>
