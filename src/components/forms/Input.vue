<template>
  <div class="form-control">
    <label class="label" v-if="title">
      <span class="label-text">{{ title }}</span>
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="watchInput($event.target.value)"
      class="input input-info input-bordered"
      :class="{ 'input-success': isSuccess, 'input-error': hasError }">
    <label class="label" v-if="!!validationMsg">
      <span class="label-text-alt">{{ $t(validationMsg.label, validationMsg.context) }}</span>
    </label>
  </div>
</template>

<script>
import { hasErrors } from './validator'

export default {
  name: 'FormsInput',
  props: {
    title: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    value: {
      required: true
    },
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isSuccess: false,
    hasError: false,
    validationMsg: null,
  }),
  methods: {
    checkErrors (value) {
      const field = {
        value,
        validate: this.validations
      }
      const errors = hasErrors(field)
      this.hasError = !!errors
      this.validationMsg = this.hasError ? errors : null
      this.isSuccess = this.validationMsg === null
    },
    watchInput (value) {
      this.checkErrors(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>