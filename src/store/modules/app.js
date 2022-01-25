import { loadLanguageAsync } from "@/i18n";

const state = {
  // remote: BASE_URL,
  locale: "en",
  locales: [
    { value: "es", label: "languages.es" },
    { value: "en", label: "languages.en" },
  ],
  cart: [],
};

const getters = {
  currentLocale: (state) => state.locale,
  availableLocales: (state) => state.locales,
}

const mutations = {
  setLocale: (state, locale) => {
    localStorage.setItem("locale", locale);
    loadLanguageAsync(locale);
    state.locale = locale;
  }
}

export default {
  state,
  getters,
  mutations,
};