import Vue from "vue";
import Router from "vue-router";

import Login from "../components/Login";
import Index from '../components/utils'
import welcome from "../components/welcome";
import user from "../components/commonUser/user";
import {use} from "element-ui";
import {drag} from '../assets/JS/welcome'
import  myManagement from"../components/manage/myManagement"
import releasepost from "../components/post/releasepost";
import homepageone from "../components/post/homepageone";
import posts from "../components/post/posts";
import personal from "../components/commonUser/personal";
import userProfile from "../components/commonUser/userProfile";
import adminProfile from "../components/admin/adminProfile";
Vue.use(Router);


export default new Router({
  routes:[

    {
      //这里的Login是上面import的的Login
      name:'login',
      path:'/login',
      component:Login
    },
    //全局跳转到登录页
    //先登录，不然进不去主页面
    {
      path:'/',
      redirect:"/index"
    },
    //在主页面实现基本功能
    //路由跳转就是匹配此处的path规则，匹配到就使用path对应的组件，渲染到进行中的route-view处
    {
      name:'index',
      path:'/index',
      component:Index,
      redirect:'/homepageone',
      children:[
        {
          name:"welcome",
          path:'/welcome',
          component:welcome
        },
        {
          name:'myManagement',
          path:'/myManagement',
          component:myManagement
        },

        {
          name:'user',
          path:'/user',
          component:user
        },
        {
          name:'releasepost',
          path:'/releasepost',
          component:releasepost
        },
        {
          name:'homepageone',
          path:'/homepageone',
          component:homepageone
        },
        {
          name:'posts',
          path:'/posts/:postsId',
          component:posts
        },
        {
          name:'personal',
          path:'/personal/:id',
          component:personal
        },
        {
          name:'userProfile',
          path:'/userprofile',
          component:userProfile
        },
        {
          name:'adminProfile',
          path:'/adminProfile',
          component:adminProfile
        }
      ]
    },



  ]
});

