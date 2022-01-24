import { createStore } from 'vuex'
import app from './modules/app'

export const store = createStore({
    strict: true, // process.env.NODE_ENV !== 'production'
    modules: {
        app,
    },
    state: {},
    mutations: {},
})