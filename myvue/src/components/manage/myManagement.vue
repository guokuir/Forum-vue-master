<template>
  <div class="root">
    <!--      侧边栏-->
    <el-container>
      <el-aside width="350px" style="z-index:1">
        <el-col :span="20">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="Transparent"
            text-color="#000000"
            active-text-color="#67C23A"
            :router="true">
            <!--侧边栏以index属性路由跳转-->


            <el-menu-item v-for="item in this.$store.state.homepageClass" :key="item.typeId" @click="postManagementClick(item.typeId)">
              <i class="el-icon-document-copy"/>
              <span @click="postManagementClick()">
            帖子管理
            <span style="color:#B0E0E6;" v-show="postManagementShow" class="el-icon-document-copy"></span>
          </span>
              <!--          {{item.home}}-->
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-user"/>
              <span @click="userManagementClick()">
            楼层管理
            <span style="color:#B0E0E6;" v-show="userManagementShow" class="el-icon-s-tools"></span>
          </span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-user"/>
              <span @click="sonMangementClick()">
            子评论管理
            <span style="color:#B0E0E6;" v-show="sonManagementShow" class="el-icon-s-tools"></span>
          </span>
            </el-menu-item>
            <hr>
            <div display="flex">
              <el-input v-model="keyWord" placeholder="输入关键词以筛选记录"/>
              <br>
              <br>
              <el-button type="warning" icon="el-icon-search" circle @click="changePage(1)"></el-button>
              <br>
              <!--          <el-button type="primary" icon="el-icon-delete" @click="clearKeyWord()"/>-->
            </div>
            <hr>

          </el-menu>
        </el-col></el-aside>
    </el-container>

    <div class="managementPage" style="z-index:0">
      <!--      楼层管理页面-->
      <div class="article" v-show="userManagementShow">
        <div class="userItem" v-for="(item, index) in userList" :key="index">
          <div class="post-block-code">
            <div>
              <i class="el-icon-chat-line-square"></i>
              楼层id: {{item.floorId}}
              从属帖子id: {{item.belongPostId}} &nbsp;

            </div>
            <div class="content" v-html="item.content"></div>
            <div class="ItemCenter">
              <div class="replyCount">
                <i class="iconfont icon-kuaisuhuifu"></i>

              </div>
            </div>
          </div>

          <div class="ItemRight">
            <div>
              <el-button style="font-size:5px;color:#fd0707;"
                         @click="deleteUser(item)">删除
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!--      帖子管理页面-->
      <div class="article" v-show="postManagementShow" v-bind:title="postsList">
        <div class="articleItem" v-for="(item, index) in postsList" :key="index">
          <div class="post-block-code">
            <div class="post-code" v-html="'id:'+item.postId"></div>
<!--            <div>
              <i class="el-icon-user"></i>
              发帖人: {{item.nickname}}
            </div>-->
          </div>
          <div class="ItemCenter">
            <div class="title" v-html="item.title"></div>
            <div class="publishDate">
              {{ item.updateTime}}
            </div>
            <div class="replyCount">
              <i class="iconfont icon-kuaisuhuifu"></i>
              楼层数:{{ item.floors }}
            </div>
          </div>
          <div class="ItemRight">
            <div>
              <el-button style="font-size:5px;color:#254ef5;"
                         @click="$router.push({ name: 'posts', params: { postsId: item.postId } })">查看
              </el-button>
            </div>
            <div>
              <el-button style="font-size:5px;color:#fd0707;"
                         @click="deletePost(item)">删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="article" v-show="userManagementShow">
        <div class="userItem" v-for="(item, index) in userList" :key="index">
          <div class="post-block-code">
            <div>
              <i class="el-icon-user"></i>
              楼层id: {{item.floorId}}
              楼层数: {{item.floorNumber}} &nbsp;

            </div>
            <div class="content" v-html="item.content"></div>
            <div class="ItemCenter">
              <div class="replyCount">
                <i class="iconfont icon-kuaisuhuifu"></i>

              </div>
            </div>
          </div>

          <div class="ItemRight">
            <div>
              <el-button style="font-size:5px;color:#fd0707;"
                         @click="deleteUser(item)">删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="article" v-show="sonManagementShow">
        <div class="userItem" v-for="(item, index) in sonList" :key="index">
          <div class="post-block-code">
            <div>
              <i class="el-icon-chat-dot-round"></i>
              子评论id: {{item.commentId}}
              从属楼层id:{{item.belongFloorId}}

            </div>
            <div>
              <i class="el-icon-tickets"></i>
              内容: {{item.content}} &nbsp;
            </div>
            <div class="content" v-html="item.content"></div>
            <div class="ItemCenter">
              <div class="replyCount">
                <i class="iconfont icon-kuaisuhuifu"></i>

              </div>
            </div>
          </div>

          <div class="ItemRight">
            <div>
              <el-button style="font-size:5px;color:#fd0707;"
                         @click="deleteUser(item)">删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <!-- 分页组件 -->
        <el-pagination background layout="prev, pager, next" :total="1000"
                       :current-page="this.$route.query.page * 1"
                       @current-change="changePage"
        >
        </el-pagination>
      </div>
      <GoTop></GoTop>
    </div>
  </div>



</template>

<script>
import GoTop from "../utils/GoTop";

export default {
  name: "myManagement",
  components:{
    GoTop
  },
  data() {
    return {
      userManagementShow:true,
      postManagementShow:false,
      sonManagementShow:false,
      keyWord:'',
      //文章管理相关
      postsList:[],
      page:1,
      eachPage:'',
      pagination:'',
      order:'',
      total:'',
      //用户管理相关
      userList:[],
      //
      sonList:[],
    }
  },

  created() {
    this.changePage(1);
  },

  methods:{
    userManagementClick(){
      this.userManagementShow=true;
      this.postManagementShow=false;
      this.sonManagementShow=false;
      this.page=1;
      this.changePage(1);
    },
    postManagementClick(){
      this.userManagementShow=false;
      this.postManagementShow=true;
      this.sonManagementShow=false;
      this.page=1;
      this.changePage(1);
    },
    sonMangementClick(){
      this.sonManagementShow=true;
      this.userManagementShow=false;
      this.postManagementShow=false;
      this.page=1;
      this.changePage(1);
    },

    // 切换分页的回调
    changePage(e) {
      // console.log(e);
      // this.currentPage = e;
      this.page=e;
      if(this.postManagementShow===true){
        this.getPosts();
      }
      else if(this.userManagementShow===true){
        this.getUsers();
      }
      else{
        this.getSon();
      }
    },
    keyWordSearch(){
      this.page=1;
      this.changePage(1);
    },
    clearKeyWord(){
      this.keyWord='';
    },


    //===================文章管理相关================
    //获取帖子列表
    getPosts() {
      const self = this;
      self.$axios({
        method:'get',
        url:'/post/myposts?&size=5&page='+this.page+'&order=1'
      }).then(res=>{
        console.log(res)
        if(res.data.flag===true) {
          this.postsList=res.data.data.records
          this.total=res.data.data.total
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        else {
          alert(res.data.message)
        }
      })
    },
    //删除帖子
    deletePost(post){
      let pid=post.postId
      const self = this
      self.$axios({
        method: 'delete',
        url: 'post/' + pid
      }).then(res => {
        if (res.data.flag === true) {
          console.log(res)
          this.postManagementClick()
          this.$message.success("帖子删除成功")
        } else {
          console.log(res)
          alert(res.data.message)
        }
      })
    },


    //============================楼层管理相关=================================
    //获取用户列表
    getUsers() {
      const self = this;
      self.$axios({
        method:'get',
        url:'/post/floor/myfloors?&size=5&page='+this.page+'&order=1'
      }).then(res=>{
        if(res.data.flag===true) {
          this.userList=res.data.data.records
          this.total=res.data.data.total
          console.log(res)
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
    //删除用户
    deleteUser(user){
      let uid=user.userId
      const self = this
      self.$axios({
        method: 'delete',
        url: 'user/' + uid
      }).then(res => {
        // console.log(res)
        if (res.data.flag === true) {
          this.userManagementClick();
          this.$message.success("用户删除成功")
        } else {
          alert(res.data.message)
        }
      })
    },

    getSon() {
      const self = this;
      self.$axios({
        method:'get',
        url:'/post/comment/mycomments?&size=5&page='+this.page+'&order=1'
      }).then(res=>{
        console.log(res)
        if(res.data.flag===true) {
          this.sonList=res.data.data.records
          this.total=res.data.data.total
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        else {
          alert(res.data.message)
        }
      })
    },
  }
}
</script>

<style scoped>
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
  padding: 10px 20px 20px;
  width: calc(100% - 200px);
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
  color: #18365b;
  font-weight: 600;
}

.root{
  display: flex;
  position: relative;
}

.article {
  position: relative;
  padding: 20px 180px 0px 180px;
}

.articleItem {
  display: inline-flex;
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

.userItem {
  display: inline-flex;
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 20px 20px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.15s;
}

.userItem:hover {
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
  margin-bottom: 1px;
  line-height: 18px;
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
  width: 45px;
  font-size: 14px;
  color: rgb(83, 83, 83);
  position: absolute;
  right: 30px;
}

.tips {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: rgb(158, 158, 158);
  margin: 20px 0;
}

.bottom {

  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;

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
.nav{
  background-image: url("../../assets/1111.png");
  background-size:cover;
  background-attachment:fixed;
}
</style>
