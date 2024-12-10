<template>
    <nav class="navbar navbar-expand-lg bg-body-dark" id="logo">
        <div class="container-fluid">
            <a class="navbar-brand" href="/bienvenida" id="Tienda">Tienda</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/clientes">Clientes</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/personal">Personal</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/articulos">Articulos</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/ventas">Ventas</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/login">Compras</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item">
                            <RouterLink class="nav-link item" to="/registro">Registro</RouterLink>
                        </li>
                        <li class="nav-item margin" id="item" v-if="usuarioAutenticado">
                            <button @click.prevent="cerrarSesion" class="link btn" id="btnSalir">
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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const usuarioAutenticado = ref(false)
const auth = getAuth()
const router = useRouter()
onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        usuarioAutenticado.value = !!user
        if (user) {
            usuarioAutenticado.value = true
        } else {
            usuarioAutenticado.value = false
        }
    })
})

const cerrarSesion = async () => {
    try {
        await signOut(auth)
        router.push({ name: '/bienvenida' })
    } catch (error) {
        console.log('Error al cerrar sesión', error)
    }
}
</script>

<style scoped>
#navbarNavAltMarkup {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}

#logo {
    background-color: #d8f8d9;

}

#Tienda {
    font-size: 1.4em;
    font-family: 'Roboto', sans-serif;
    transition: 0.40s;
}

#Tienda:hover {
    color: #4CAF50;
    transition: 0.25s;
}


#item {
    font-size: 1.2em;
    font-family: 'Roboto', sans-serif;
    transition: 0.40s;
    margin: 0 10px;
}

.item:hover {
    color: #4CAF50;
    transition: 0.25s;
}

#btnSalir {
    font-size: 1em;
    font-family: 'Roboto', sans-serif;
    transition: 0.40s;
    color: #fa453f;
}

#btnSalir:hover {
    color: #4e76c0;
    transition: 0.25s;
}</style>