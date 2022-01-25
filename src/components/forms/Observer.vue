<template>
  <form @submit.prevent="onSubmit">
    <alert-base v-model="isInvalid" alert-type="error" :message="$t('forms.validation.invalid')"/>
    <slot :valid="isValid"></slot>
    <slot name="submit">
      <div :class="submitContainerClass">
        <button
          type="submit"
          :class="submitBtnClassess"
          :disabled="loading"
        >
          {{ submitBtn }}
        </button>
      </div>
    </slot>
  </form>
</template>

<script>
const AlertBase = () => import(/* webpackPrefetch: true */ '@/components/alerts/Base')

export default {
  name: 'FormsObserver',
  components: {
    AlertBase
  },
  props: {
    submitBtn: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    checkValidity: {
      type: Boolean,
      default: () => true
    },
    submitContainerClass: {
      type: String,
      default: () => ''
    },
    submitBtnClass: {
      type: String,
      default: () => 'btn btn-block rounded-full'
    }
  },
  data: () => ({
    isInvalid: false
  }),
  computed: {
    submitBtnClassess () {
      const defaultClass = [this.submitBtnClass]
      if (this.loading) defaultClass.push('loading')
      return defaultClass
    }
  },
  methods: {
    isValid () {
      const forms = this.$children.map(x => ({valid: x.isSuccess}))
      return !forms.some(x => x.valid === false)
    },
    onSubmit () {
      const valid = this.isValid()
      if (this.checkValidity) {
        if (valid) this.$emit('submit', true)
        this.isInvalid = !valid
      }
      return this.isInvalid
    }
  }
}
</script>
