import './assets/main.css'
import * as dotenv from 'dotenv'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

//Paquete para la impresion excel
import JsonExcel from 'vue-json-excel3'
app.component('downloadExcel', JsonExcel)


app.use(router)
app.mount('#app')
