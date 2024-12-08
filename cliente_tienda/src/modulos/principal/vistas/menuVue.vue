<template>
    <nav class="navbar navbar-expand-lg bg-body-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/bienvenida">Tienda</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item margin">
                        <RouterLink class="nav-link item" to="/clientes">Clientes</RouterLink>
                    </li>
                    <li class="nav-item margin">
                        <RouterLink class="nav-link item" to="/personal">Personal</RouterLink>
                    </li>
                    <li class="nav-item margin">
                        <RouterLink class="nav-link item" to="/articulos">Articulos</RouterLink>
                    </li>
                    <li class="nav-item margin">
                        <RouterLink class="nav-link item" to="/ventas">Ventas</RouterLink>
                    </li>
                    <li class="nav-item margin">
                        <RouterLink class="nav-link item" to="/registro">Registro</RouterLink>
                    </li>
                    <li class="nav-item margin" v-if="usuarioAutenticado">
                        <button @click.prevent="cerrarSesion" class="nav    -link btn btn-link">
                            Salir
                        </button>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

    const usuarioAutenticado = ref(false)
    const auth = getAuth()
    const router = useRouter()
    onMounted (() => {
        onAuthStateChanged(auth, (user) => {
            usuarioAutenticado.value = !!user
            if(user){
                usuarioAutenticado.value = true
            }else{
                usuarioAutenticado.value = false
            }
        })
    })

    const cerrarSesion = async() =>{
        try {
            await signOut(auth)
            router.push({name: '/bienvenida'})
        } catch (error) {
            console.log('Error al cerrar sesión',error)
        }
    }
</script>

<style scoped>

</style>