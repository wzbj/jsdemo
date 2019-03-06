<template>
	<div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%">
        <el-table-column
            type="index"
            label="序号"
            align='center'
            width="70">
        </el-table-column>
        <el-table-column
            prop="date"
            label="创建时间"
            align='center'
            width="250"
            sortable>
            <template slot-scope="scope">
                <el-icon name="time"></el-icon>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="type"
            label="收支类型"
            align='center'
            width="150">
        </el-table-column>
        <el-table-column
            prop="describe"
            label="收支描述"
            align='center'
            width="180">
        </el-table-column>
        <el-table-column
            prop="income"
            label="收入"
            align='center'
            width="170"> 
            <template slot-scope="scope">  
                <span style="color:#00d053">+ {{ scope.row.income }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="expend"
            label="支出"
            align='center'
            width="170">
            <template slot-scope="scope">  
                <span style="color:#f56767">- {{ scope.row.expend }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="cash"
            label="账户现金"
            align='center'
            width="170">
            <template slot-scope="scope">  
                <span style="color:#4db3ff">{{ scope.row.cash }}</span>
            </template>
        </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            align='center'
            width="220">
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          fixed="right"
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <DialogFound :dialog='dialog' :formData="formData" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from '../components/DialogFound'
export default {
  name:'foundList',
  components:{
    DialogFound
  },
  data() {
    return {
      paginations:{
        page_index:1,//当前页数
        total:0,//总数
        page_size:5,//每页显示条数
        page_sizes:[5,10,15,20],//每页显示多少条
        layout:"total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData:[],
      dialog:{
        show:false,
        title:"",
        option:"edit"
      },
      formData:{
        type:"",
        describe:"",
        income:"",
        expend:"",
        cash:"",
        remark:"",
        id:""
      }
    }
  },
  created() {
    this.getProfile();
  },
  methods:{
    getProfile(){
      // 获取表格数据
      this.$axios.get("/api/profiles")
          .then(res => {
            this.tableData = res.data;
          })
          .catch(err => console.log(err))
    },
    handleEdit(index, row){
      // console.log(index,row.cash);
      // 编辑
      this.dialog = {
        show: true,
        title:"修改资金信息",
        option:"edit"
      };
      this.formData = {
        type:row.type,
        describe:row.describe,
        income:row.income,
        expend:row.expend,
        cash:row.cash,
        remark:row.remark,
        _id:row._id
      }
    },
    handleDelete(index, row){
      this.$axios.delete(`/api/profiles/delete/${row._id}`)
        .then(res => {
          // 删除成功
          this.$message({
            message: "删除成功",
            type: "success"
          })
          // 重新请求数据
          this.getProfile();
        })
    },
    handleAdd(){
      this.dialog = {
        show: true,
        title:"增加资金信息",
        option:"add"
      };

      this.formData = {
        type:"",
        describe:"",
        income:"",
        expend:"",
        cash:"",
        remark:"",
        _id:""
      }
    },
    handleSizeChange(page_size){

    },
    handleCurrentChange(page) {

    }
  }
}
</script>


<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
