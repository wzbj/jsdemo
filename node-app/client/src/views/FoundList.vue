<template>
	<div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 按照时间筛选 -->
        <el-form-item label="按照时间筛选">
          <el-date-picker
              v-model="search_data.startTime"
              type="datetime"
              placeholder="选择开始时间">
          </el-date-picker> --
          <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">搜索</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small" 
            icon="view" 
            @click="handleAdd()"
            v-if="user.identity == 'manager'"
          >添加</el-button>
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
          label="操作"
          v-if="user.identity == 'manager'"
        >
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
      allTableData:[],
      filterTableData:[],
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
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
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
            this.allTableData = res.data;
            this.filterTableData = res.data;
            // 设置分页数据
            this.setPaginations();
          })
          .catch(err => console.log(err))
    },
    setPaginations(){
      // 分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size;
      })
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
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item,index) => {
        return index < page_size;
      })
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size*(page - 1);
      // 数据的总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];
      
      for(let i = index;i<nums;i++){
        if(this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables;
      }
    },
    handleSearch(){
      // 筛选
      if(!this.search_data.startTime || !this.search_data.endTime){
        this.$message({
          type:"warning",
          message:"请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime();
        return time >= sTime && time <= eTime;
        
      })
      this.setPaginations();

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
