import { createApp } from "vue";
import { router } from '@/routes'
import { i18n, loadLanguageAsync } from "./i18n";
import { store } from "@/store/index.js"

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
// mouting point for the whole app

import App from "@/App.vue";

router.beforeEach(async (to, from, next) => {
  // if (to && to.meta && to.meta.auth) {
  //   const continueRouting = await authenticationGuard(to);
  //   if (!continueRouting) {
  //     return;
  //   }
  // }

  const lang = localStorage.getItem("locale") || "en";
  await loadLanguageAsync(lang);
  next();
});

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .mount("#app");
