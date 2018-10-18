import 'roboto-fontface/css/roboto-slab/sass/roboto-slab-fontface.scss';

import App from '@/App.vue';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
