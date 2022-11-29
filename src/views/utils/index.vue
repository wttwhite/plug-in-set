<template>
  <div ref="utilsDom" class="a"></div>
</template>
<script>
import {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  getWeather,
  hideSensitiveText,
  getOrigin,
} from '../../../packages/utils/lib/index.esm'
export default {
  name: 'utils',
  mounted() {
    console.log('utils', hasClass(this.$refs.utilsDom, 'a'))
    // addClass(this.$refs.utilsDom, 'b')
    // addClass(this.$refs.utilsDom, 'c d')
    // removeClass(this.$refs.utilsDom, 'b')
    // removeClass(this.$refs.utilsDom, 'c d')
    // toggleClass(this.$refs.utilsDom, 'b')
    // console.log(getWeather())
    console.log(hideSensitiveText('330480184578523698', 5, 14))
    console.log(getOrigin())
  },
}
</script>
