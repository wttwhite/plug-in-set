<template>
  <div class="page-list-box">
    <div class="page-top-search" v-if="hasSearch">
      <slot name="search"></slot>
    </div>
    <div class="page-container">
      <slot name="btnLine"></slot>
      <div class="page-container-second">
        <slot></slot>
      </div>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <slot name="other"></slot>
  </div>
</template>
<script>
export default {
  name: 'PageListBox',
  props: {
    hasSearch: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.page-list-box {
  width: 100%;
  height: 100%;
  border: 1px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  background: #f4f8fd;
}
.page-top-search {
  //   width: calc(100% - 64px);
  // margin: 16px 32px 0 32px;
  // margin-bottom: 16px;
  background: #ffffff;
  // box-shadow: 0px 0px 10px 0px rgba(8, 90, 213, 0.15);
  border-radius: 8px;
  padding: 36px 10px 18px 10px;
}
.page-container {
  flex: 1;
  width: calc(100% - 64px);
  height: 0;
  margin: 16px 32px 0 32px;
  overflow: auto;
  background: #f2f3f4;
  position: relative;
  display: flex;
  flex-direction: column;
  ::v-deep .page-list-btn {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-container-second {
    flex: 1;
    height: 0;
  }
}
.footer {
  width: 100%;
  height: 60px;
  padding-right: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: none;
}

.page-top-search {
  ::v-deep .el-form-item {
    margin-left: 32px;
  }
  ::v-deep .el-date-editor.el-input,
  ::v-deep .el-date-editor.el-input__inner,
  ::v-deep .el-input,
  ::v-deep .el-select,
  ::v-deep .el-date-picker {
    width: 240px;
  }
}
</style>
