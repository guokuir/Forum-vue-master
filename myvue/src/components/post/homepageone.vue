<template>
  <section class="nav">
    <div class="right">

<!--
      <el-input v-model="keyWord" placeholder="请输入问题"  ></el-input>
-->

      <el-autocomplete
        v-model="keyWord"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>


      <el-button icon="el-icon-search"  type="info" circle @click="keyWordSearch()"></el-button>
      <br>
      <br>
      <div class="article">
        <div class="articleItem"
             v-for="(item, index) in postsList" :key="index"
             @click="$router.push({ name: 'posts', params: { postsId: item.postId } })"
        >
          <div class="userAvatar">
            <img :src="require('../../assets/用户.png')" alt="" lazy fit="cover"/>
          </div>
          <div class="ItemCenter">
            <div class="title" v-html="item.title"></div>
            <div class="publishDate">{{ item.updateTime}}</div>
            <div class="content mdContent" v-html="item.content"></div>

          </div>
          <div class="ItemRight">
            <div>
              <i class="el-icon-thumb"/>
              {{item.likes}}
            </div>
            <div>
              <i class="el-icon-chat-round"/>
              {{item.floors}}
            </div>
            <br><br>

          </div>
        </div>
      </div>
      <!-- 分页组件 -->
      <div class="bottom">
        <el-pagination  layout="prev, pager, next" :total="100"
                        :current-page="this.$route.query.page * 1"
                        @current-change="changePage"
                        v-show="searched===true"
                        :background="isbackground"
        >
        </el-pagination>
      </div>

      <br><br><br><br>

      <el-carousel :interval="4000" type="card" height="400px" v-show="searched===false" style="width: 1400px; margin: auto">
        <el-carousel-item v-for="item in imgwrap"  :key="item.url">

          <img :src="item.url"/>
        </el-carousel-item>
      </el-carousel>
      <GoTop></GoTop>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GoTop from "../utils/GoTop";
export default {
  name: "homepageone",
  components:{
    GoTop
  },
  data(){
    return{
      searched:false,

      postsList:[],
      eachPage:'',
      pagination:'',
      order:'',
      total:'',
      isbackground:true,
      keyWord:'',
      imgwrap:[
        {url:require("../../assets/search.jpg")},
        {url:require("../../assets/publish.jpg")},
        {url:require("../../assets/manage.jpg")},

      ],
      restaurants: [],
      state: '',
      timeout:  null



    }
  },
  created() {

  },

  methods:{

    getInfos() {
      const self = this;
      self.$axios({
        method:'get',
        url:'/post/posts?keyword='+this.keyWord+'&userId'+this.$route.query.typeId
          +'&size=15&page='+(this.$route.query.page-1)+'&order=1'
      }).then(res=>{
        console.log(res)
        if(res.data.flag===true) {

          self.searched=true;

          this.postsList=res.data.data.records
          this.total=res.data.data.total
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        else {
          console.log(res)
          alert(res.data.message)
        }
      })
    },
    // 切换分页的回调
    changePage(e) {
      this.$router.push({
        name: "homepageone",
        query: { typeId: this.$route.query.typeId, page: e },
      });
      this.getInfos()
    },


    keyWordSearch(){
      this.page=1;
      this.changePage(1);
    },
    clearKeyWord(){
      this.keyWord='';
    },
    loadAll() {
      const self = this
      self.$axios({
        method: 'get',
        url: "/post/getRandom"
      }).then(res => {
        if (res.data.flag === true) {
          console.log(res)
          this.restaurants=[]
          for(let item in res.data.data.records){
            this.restaurants.push({"value":res.data.data.records[item].title.toString()})
            // console.log(res.data.data.records[item].title)
          }
        } else {

        }
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (keyWord) => {
        return (keyWord.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.loadAll()
  }


}
</script>


<style scoped>
.el-autocomplete{
  width:800px;
  border-radius: 50%;
}
.communityContainer {
  display: flex;
  justify-content: center;
  font-size: 15px;
}

.community {
  display: flex;
  max-width: 1200px;
  width: 85vw;
}

.left {
  position: sticky;
  top: 74px;
  padding: 20px 0;
  width: 200px;
  /* 74px+padding上下的20px */
  height: calc(100vh - 114px);
  color: rgb(83, 83, 83);
  font-size: 13px;
}

.right {
  padding: 80px 30px 50px;
  width: calc(100% - 200px);
  /*position: center;*/
}

.writeButton {
  width: 100%;
  margin-bottom: 10px;
}

.sortItem {
  margin: 15px 0;
  cursor: pointer;
}

.currentItem {
  color: #8B4513;
  font-weight: 600;
}
.article{

}
.articleItem {

  display: flex;
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 20px 20px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.15s;
}

.articleItem:hover {
  background-color: #f2f6fb;
}

.userAvatar {
  width: 45px;
}

.userAvatar img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.ItemCenter {
  width: 700px;
  margin: 0 10px;
}

.ItemCenter div {
  margin-bottom: 7px;
  line-height: 24px;
}

.title {
  color: rgb(43, 43, 43);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.publishDate {
  color: rgb(136, 136, 136);
  margin: 4px 0;
  font-size: 12px;
}

.content {
  color: rgb(136, 136, 136);
  font-size: 14px;
  line-height: 19px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.articleImg {
  margin: 15px 0 10px;
  display: flex;
  justify-content: flex-start;
}

.articleImg img {
  border-radius: 5px;
}

.articleImgItem {
  height: 100px;
  width: auto;
  margin-right: 10px;
}

.articleImgItem /deep/ .el-image__inner {
  width: unset;
}

.ItemRight {
  width: auto;
  font-size: 18px;
  color: rgb(83, 83, 83);
  position: absolute;
  right: 10px;
}

.tips {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: rgb(158, 158, 158);
  margin: 20px 0;
}



.communityContainer /deep/ .el-loading-spinner {
  margin-top: 80px;
}

.nullTips {
  text-align: center;
  margin-top: 20vh;
  color: #666;
  letter-spacing: 1px;
}
.container {

  width: 500px;

  height: 50px;

  margin: 100px auto;

}

.el-carousel /deep/ .el-carousel__container {

}

#building{
  background:		#FDF5E6;
  opacity:0.9;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

.bottom {

  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;

}
.msg-pagination-container.is-background .el-pager li {
  /*对页数的样式进行修改*/
  background-color: #10263c;
  color: #FFF;
}
.nav{
  background-image: url("../../assets/1111.png");
  background-size:cover;
  background-attachment:fixed;
}
</style>
