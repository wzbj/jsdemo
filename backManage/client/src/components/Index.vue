<template>
  <div class="index">
      <!-- {{$store.state.userinfo}} -->
    <el-container style="height:100%;border: 1px solid #eee">
      <!-- 左侧导航 -->
      <el-aside width="200px" style="">
        <div class="top-text">
          <h1>vue Manage</h1>
        </div>
        <el-menu :default-openeds="['1']" router background-color="#545c64" text-color="#fff">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
              <el-menu-item index="userlist">账号列表</el-menu-item>
              <el-menu-item index="useradd">添加账号</el-menu-item>
              <el-menu-item index="passwordedit">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        data: '2016-05-02',
        name: '王小虎',
        address: '北京市朝阳区望京soho'
      }]
    }
  }
}
</script>
<style>
  html,body,#app,.index{
    height: 100%;    
  }
  .el-container{
    height: 100%!important;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-menu {
    border-right: 0;
  }
  .el-aside {
    color: #333;
    background-color: #545c64;
  }
  .top-text{
    text-align: center;
    padding:20px 0;
    background-color: #545c64;
    border-bottom: 1px solid #333;
    
  }
  .top-text h1{
    color:#fff;
    font-weight: bold;
  }

</style>
