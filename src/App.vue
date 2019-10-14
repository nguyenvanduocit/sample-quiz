<template>
  <div :class="$style.app">
    <AppInner>
      <template slot="main">
        <div class="loading" v-if="ui.loading">loading...</div>
        <QuizContainer v-else-if="currentQuestion">
          <template slot="question">{{ currentQuestion.question }}</template>
          <template slot="answerInput">
            <textarea autofocus rows="3" v-model="answer" :disabled="canNext"></textarea>
          </template>
        </QuizContainer>
        <div :class="$style.result" v-show="result">
          <b>Result:</b>
          <p v-html="result"></p>
        </div>
      </template>
      <template slot="footer">
        <button class="btn" v-show="!canNext" :disabled="!canSubmit" @click.prevent="checkAnswer">Submit</button>
        <button class="btn" v-show="canNext" @click.prevent="next">Next</button>
        <div :class="$style.legend">
          <span>Legend: </span><ins>thiếu</ins> <del>dư</del>
        </div>
      </template>
    </AppInner>
  </div>
</template>
<script>
import QuizContainer from '@/components/QuizContainer'
import AppInner from '@/components/AppInner'
import { diffAnswer, prettyHtmlDiff } from '@/services/diff'
const getQuestionList = () => import('@/assets/data.json').then(m => m.default || m)
export default {
  name: 'App',
  components: {
    AppInner,
    QuizContainer
  },
  data () {
    return {
      ui: {
        loading: false
      },
      answer: '',
      result: '',
      questionList: [],
      currentQuestionIndex: 0
    }
  },
  computed: {
    hasNext () {
      return this.currentQuestionIndex < this.questionList.length
    },
    canSubmit () {
      return this.answer !== '' && this.result === ''
    },
    canNext () {
      return this.hasNext && this.answer !== '' && this.result !== ''
    },
    currentQuestion () {
      if (this.currentQuestionIndex < 0 || this.currentQuestionIndex >= this.questionList.length) {
        return null
      }
      return this.questionList[this.currentQuestionIndex]
    }
  },
  methods: {
    checkAnswer () {
      let bestDiff = []
      for (let answerIndex = 0; answerIndex < this.currentQuestion.answers.length; answerIndex++) {
        let currentAnswer = this.currentQuestion.answers[answerIndex]
        let diff = diffAnswer(currentAnswer.content, this.answer)
        if (bestDiff.length === 0 || bestDiff.length > diff.length) {
          bestDiff = diff
        }
        if (bestDiff.length === 1) {
          break
        }
      }
      if (bestDiff.length === 1) {
        this.result = 'Correct!'
      } else {
        this.result = prettyHtmlDiff(bestDiff)
      }
    },
    next () {
      this.answer = ''
      this.result = ''
      if (this.hasNext) {
        this.currentQuestionIndex++
      }
    }
  },
  async mounted () {
    this.questionList = await getQuestionList()
  }
}
</script>
<style lang="stylus" module>
.app
  width 100vw
  height 100vh
  overflow hidden
  display flex
  flex-direction column
  justify-content center
  align-items center
  position relative
.result
  margin-top 10px
.legend
  font-size 12px
  position absolute
  right 10px
  bottom 10px
  ins, del
    display inline-block
    border-radius 2px
    padding 0 3px
</style>
