<template>
  <div :class="$style.container">
    <slot name="main" />
    <div :class="$style.footer"></div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'AppInner'
}
</script>

<style lang="stylus" module>
.container
  display block
  width 100%
  max-width 600px
  background #ffffff
  border-radius 4px
  box-shadow 0 20px 40px rgba(0,0,0,.16)
  padding 30px
  position relative
.footer
  margin-top 10px
</style>
