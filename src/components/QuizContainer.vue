<template>
  <div>
    <div :class="$style.question"><slot name="question" /></div>
    <div :class="$style.answerInput">
      <slot name="answerInput" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizContainer'
}
</script>

<style lang="stylus" module>
.question
  font-size 18px
.answerInput
  margin-top 25px
  textarea
    width 100%
    outline none
    padding 10px
    border-radius 4px
</style>
