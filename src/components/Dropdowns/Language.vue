<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-6/12 md:w-4/12 px-4">
      <div class="relative inline-flex align-middle w-full">
        <button class="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 ease-linear transition-all duration-150" type="button" ref="btnDropdownRef" v-on:click="toggleDropdown()">
          {{ currentLocale }}
        </button>
        <div ref="popoverDropdownRef" class="bg-emerald-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48" v-bind:class="{hidden: !dropdownPopoverShow,block: dropdownPopoverShow,}">
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li v-for="lang of availableLocales" :key="lang.val">
              <a @click.prevent="setLocale(lang.value)">{{ $t(lang.label) }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <!-- <div tabindex="0" class="btn btn-ghost rounded-btn">{{ currentLocale }}</div> 
    <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
      <li v-for="lang of availableLocales" :key="lang.val">
        <a @click.prevent="setLocale(lang.value)">{{ $t(lang.label) }}</a>
      </li>
    </ul>
  </div> -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { createPopper } from "@popperjs/core";

export default {
  name: 'LanguageDropdown',
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  computed: {
    ...mapGetters(['availableLocales', 'currentLocale'])
  },
  methods: {
    ...mapMutations(['setLocale']),
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  }
}
</script>