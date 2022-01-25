import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from './en.json'

export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: {
    en: messages
  } // set locale messages
})

const loadedLanguages = ['en']

function setI18nLanguage (lang) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang
  } else {
    i18n.global.locale.value = lang
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang) {
  // If the same language
  
  if (i18n.global.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  const messages = await import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${lang}.json`)
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  await nextTick()
  return setI18nLanguage(lang)
}
