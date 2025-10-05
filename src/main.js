import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/* add icons to the library */
library.add(fas, far, fab)


import BaseButton from './components/layout/BaseButton.vue'
import BaseModal from './components/layout/BaseModal.vue'

import Income from '@/components/Income.vue';
import Expanse from '@/components/Expanse.vue';

const app = createApp(App)

app.component('base-button', BaseButton);
app.component('base-modal', BaseModal)
app.component('income', Income);
app.component('expanse', Expanse);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router).use(PrimeVue).use(createPinia()).mount('#app')
