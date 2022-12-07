<template>
  <div id="building">
    <body>
    <br>
    <h1>发布新问题</h1>
    <el-form ref="form" :model="form" label-width="50px" :rules="rules">
      <el-form-item label="问题"  prop="title">

        <el-input v-model="form.title"  ></el-input>
      </el-form-item>
      <p>问题描述（可为空）</p>
      <!--进行列表渲染，数据全部存在Vuex的全局静态变量里，修改分区数只需要修改store/index.js的静态数据-->

  <!--    </el-form-item>-->
  <!--    <el-form-item label="帖子内容" prop="content">-->
  <!--      <el-input type="textarea" v-model="form.content" :rows="20"></el-input>-->
  <!--    </el-form-item>-->
      <div class="mar" label="帖子内容" prop="content">
        <mavon-editor
          v-bind="$attrs"
          v-on="$listeners"
          v-model="form.content" :ishljs="true"/>
      </div>

      <el-form-item>
        <el-button type="warning" @click="onSubmit">提交</el-button>
        <el-button @click="returnMain">取消</el-button>
      </el-form-item>
    </el-form>

    </body>
  </div>
</template>

<script>
import axios from "axios"
import { mavonEditor } from 'mavon-editor';
import {marked} from "marked";
import 'mavon-editor/dist/css/index.css';

export default {

  data() {
    return {
      postsId:'',
      form: {
        title: '',
        content: ''
      },
      rules:{
        title:[{required : true,message: '请输入标题',trigger:'blur'}],

      }
    }
  },
  created() {
    if(this.$store.state.localid===''||this.$store.state.localid===undefined){
      alert("未登录，无法发布")
      this.$router.push('/login')
    }
  },
  methods: {
    onSubmit() {
      //alert('submit!');
      if(this.form.title===''){
        alert("有未填写项，无法发布")
      }
      else if(this.$store.state.localid===''||this.$store.state.localid===undefined){
        alert("未登录，无法发布")
      }
      else {
        const self = this;

        self.$axios({
          method:'post',
          url:'/post',
          data:{
            title: self.form.title,
            // content:  self.form.content
            content: marked.parse(self.form.content)
          }
        })
        .then(res=>{
          console.log(res.data.flag)
          if(res.data.flag===true) {
            alert(res.data.message)
            console.log(res)
            self.postsId=res.data.postsId
            this.returnMain()  // 发布成功后跳转页面
          }
          else {
            alert(res.data.message)
            console.log(res)
          }
        })
      }
    },
    returnMain(){
      this.$router.push('/homepageone?typeId=&page=1');
    }
  }
}
</script>

<style scoped>
.el-input{
  width:1000px;
  border-radius: 50%;
  padding: 0px 0px;
}
.el-form-item{
  padding: 40px;
  front-size:20px Extra large;
}
.mar{
  width:1300px;
  padding: 0px 80px 0px;

}
#building{
  background:		#FDF5E6;
  opacity:0.9;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
