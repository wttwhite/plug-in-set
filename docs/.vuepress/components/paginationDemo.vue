<template>
  <hsja-pagination
      slot="footer"
      :page-no.sync="searchForm.pageNo"
      :page-size.sync="searchForm.pageSize"
      :total="total"
      @refresh="paginationChangeHandler"
    />
</template>
<script>
export default {
  name: 'PaginationDemo',
  data () {
    return {
      searchForm: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  methods: {
    paginationChangeHandler (val, key) {
      this.searchForm[key] = val
      // 再次请求刷新数据
      this.getDateList()
    },
    getDateList () {
      this.total = parseInt(Math.random() * 100)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>