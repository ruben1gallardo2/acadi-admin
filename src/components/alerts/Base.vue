<template>
  <div
    v-show="value"
    class="alert"
    :class="{
      'alert-success': alertType === 'success',
      'alert-error': alertType === 'error',
      'alert-infor': alertType === 'info',
      'alert-warning': alertType === 'warning'
    }"
  >
    <div class="flex-1">
      <slot name="icon"></slot>
      <label class="mx-3">{{ message }}</label>
    </div>
    <div class="flex-none" v-show="dismissable">
      <button class="btn btn-sm btn-ghost mr-2" @click.prevent="dismiss">{{ $t('layout.close') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertBase',
  props: {
    message: {
      type: String,
      required: true
    },
    alertType: {
      type: String,
      default: () => ''
    },
    dismissable: {
      type: Boolean,
      default: () => true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    dismiss () {
      this.$emit('input', false)
    }
  }
}
</script>