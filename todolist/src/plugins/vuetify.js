import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1E88E5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
})
console.log(vuetify)
Vue.use(Vuetify);


export default new Vuetify({
    icons: {
        
        iconfont: 'md'
    },
});

