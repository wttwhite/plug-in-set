<template>
  <div style="height: 400px">
    <page-list-box hasSearch>
      <el-form
        slot="search"
        class="page-search"
        :inline="true"
        :model="searchForm"
        ref="searchFormRef"
        label-width="90px">
        <el-form-item label="test">
          <el-input v-model.trim="searchForm.test" maxlength="100" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetClick" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="page-list-btn" slot="btnLine">
        <div>
          <el-button @click="addClick" type="primary">新增</el-button>
        </div>
        <div>
          右侧
        </div>
      </div>
      <el-table
        :data="tableList"
        height="100%"
        stripe
        ref="tableRef">
        <el-table-column prop="sortNum" label="序号" width="80"></el-table-column>
        <el-table-column prop="caseNo" label="案件编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="detailClick(scope.row)" type="text">详情</el-button>
          <el-button @click="editClick(scope.row)" type="text">编辑</el-button>
          <el-button @click="delClick(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <!-- <CPagination
      slot="footer"
      :page-no.sync="searchForm.pageNo"
      :page-size.sync="searchForm.pageSize"
      :total="total"
      @update:pageNo="(val) => paginationChangeHandler(val, 'pageNo')"
      @update:pageSize="(val) => paginationChangeHandler(val, 'pageSize')"
    /> -->
  </page-list-box>
  </div>
</template>
<script>
  const InitSearchForm = () => {
  return {
    test: '',
    pageNo: 1,
    pageSize: 10,
  }
}
export default {
  name: 'pageListBoxDemo',
  data () {
    return {
      searchForm: InitSearchForm(),
      tableList: [{ id: 1 }],
      total: 1
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    addClick() {},
    detailClick() {},
    editClick() {},
    delClick() {},
    resetClick () {},
    paginationChangeHandler () {},
    getDataList () {
      this.tableList = [{ id: 1 }]
      this.$nextTick(() => {
        this.$refs.tableRef.doLayout()
      })
    }
  }
}
</script>
