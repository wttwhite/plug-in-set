### 页码

<div>
  <paginationDemo/>
</div>

::: details 点击查看代码

<<< @/docs/.vuepress/components/paginationDemo.vue

:::

**prop**
| name        | 值类型           | 默认值 |       作用      |
| :------------- |:-------------|:-------------|:-------------|
| pageNo     | number  | 1  |  当前页码  |
| pageSize     | number  | 10  |  一页展示数量  |
| total     | number  | 0  |  总共数量  |
| pageSizes     | Array  | [10, 20, 50, 100]  |  当前页展示数量的选择  |
| layout     | String  | 'total, sizes, slot, prev, pager, next, jumper'  |  element页码布局设置  |

