import ArticulosAgregarVue from '@/modulos/articulos/vistas/ArticulosAgregarVue.vue'
import ArticulosBorrarVue from '@/modulos/articulos/vistas/ArticulosBorrarVue.vue'
import ArticulosEditarVue from '@/modulos/articulos/vistas/ArticulosEditarVue.vue'
import ArticulosVue from '@/modulos/articulos/vistas/ArticulosVue.vue'
import SiginVue from '@/modulos/autentica/vistas/SiginVue.vue'
import SignupVue from '@/modulos/autentica/vistas/SignupVue.vue'
import ClientesAgregarVue from '@/modulos/clientes/vistas/ClientesAgregarVue.vue'
import ClientesBorrarVue from '@/modulos/clientes/vistas/ClientesBorrarVue.vue'
import ClientesEditarVue from '@/modulos/clientes/vistas/ClientesEditarVue.vue'
import ClientesVue from '@/modulos/clientes/vistas/ClientesVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalBorrarVue from '@/modulos/personal/vistas/PersonalBorrarVue.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import BienvenidaVue from '@/modulos/principal/vistas/BienvenidaVue.vue'
import RegistroAgregarVue from '@/modulos/registro/vistas/RegistroAgregarVue.vue'
import RegistroVue from '@/modulos/registro/vistas/RegistroVue.vue'
import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      }
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/bienvenida',
      name: 'bienvenida',
      component: BienvenidaVue,
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: SignupVue,
    },
    {
      path: '/validacion',
      name: 'validacion',
      component: SiginVue,
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: ArticulosVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/articulos/agregar',
      name: 'articulosagregar',
      component: ArticulosAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/articulos/:id/editar',
      name: 'articuloseditar',
      component: ArticulosEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/articulos/:id/borrar',
      name: 'articulosborrar',
      component: ArticulosBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/clientes/agregar',
      name: 'clientesagregar',
      component: ClientesAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      }
    },
    {
      path: '/clientes/:id/editar',
      name: 'clienteseditar',
      component: ClientesEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
      path: '/clientes/:id/borrar',
      name: 'clientesborrar',
      component: ClientesBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    },
    {
        path: '/registro',
        name: 'registro',
        component : RegistroVue,
        beforeEnter: (to, from, next) => {
          const auth = getAuth()
          const usuario = auth.currentUser
          if (usuario) {
            next()
          } else {
            next({ name: 'validacion' })
          }
        },
    },
    {
      path: '/registro/agregar',
      name: 'registroagregar',
      component : RegistroAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const usuario = auth.currentUser
        if (usuario) {
          next()
        } else {
          next({ name: 'validacion' })
        }
      },
    }

  ],
})

export default router
