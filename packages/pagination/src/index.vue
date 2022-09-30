<template>
  <el-pagination
    :current-page="pageNo"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    background
    :layout="layout"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
  />
</template>

<script>
export default {
  name: 'HsjaPagination',
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, slot, prev, pager, next, jumper'
    }
  },
  methods: {
    sizeChangeHandle(val) {
      this.$emit('update:pageSize', val)
      // 防止父组件的pageSize和pageNo没更新
      this.$nextTick(() => {
        this.$emit('refresh', val, 'pageSize')
      })
    },
    currentChangeHandle(val) {
      this.$emit('update:pageNo', val)
      // 防止父组件的pageSize和pageNo没更新
      this.$nextTick(() => {
        this.$emit('refresh', val, 'pageNo')
      })
    },
  },
}
</script>
