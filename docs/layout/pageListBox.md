### 列表布局

<div>
  <pageListBoxDemo/>
</div>

::: details 点击查看代码

<<< @/docs/.vuepress/components/pageListBoxDemo.vue

:::

**Slot**
| name        | 作用           |
| :------------- |:-------------|
| search     | 搜索框位置  |
| btnLine      | 表格上方按钮位置   |
| default（默认） | 默认内容区域，一般为表格    |
| footer | 页码位置    |
| other | 如外层就是template，可在此位置放置其他弹框组件  |

**prop**
| name        | 值           |         作用      |
| :------------- |:-------------|:-------------|
| hasSearch     | true/false  |   是否展示搜索内容区域  |
