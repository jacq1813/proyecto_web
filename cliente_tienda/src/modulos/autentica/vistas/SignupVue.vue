<template>
    <div class="contenedor">
        <form @submit.prevent="registrarUsuario" class="formulario">
            <h2 class="h">Registro de usuario</h2>
            <div class="grupo">
                <label class="eti">Correo:</label>
                <input type="email" required v-model="correo">
            </div>
            <div class="grupo">
                <label class="eti">Contraseña:</label>
                <input type="password" required v-model="clave">
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <button type="submit">
                Registrarse
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../../../firebase/config';

const correo = ref('')
const clave = ref('')
const error = ref(null)
const router = useRouter()

const registrarUsuario = async () => {
    error.value = null;
    try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, correo.value, clave.value)
        router.push({ name: 'bienvenida' })
    } catch (err) {
        switch (err.code) {
            case 'auth/email-already-in-use':
                error.value = "El correo ya está en uso"
                break;
            case 'auth/weak-password':
                error.value = 'La contraseña debe tener al menos 6 caracteres'
                break;
            default:
                error.value = 'Ocurrió un error al registrar el usuario'
                break;
        }
    }
}
</script>
<style>
.eti{
    font-size: 1.2em;
    transition: 0.40s;
}
.eti:hover{
    color: #4CAF50;
    transition: 0.25s;
}
.contenedor{
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
.formulario{
    display: flex;
    flex-direction: column;
    gap: 1em;
    border: 1px solid #DDD;
    padding: 20px;
    border-radius: 5px;
    justify-content: center;
    margin: 10px auto;
    width: 100%;

}
.grupo{
    display: flex;
    flex: column;
    gap: 0.5em;
    justify-content: space-between;
}
.h{
    text-align: center;
    transition: 0.40s;
}
.h:hover{
    color: #4CAF50;
    transition: 0.25s;
}
input{
    padding: 5px;
    border: 1px solid #DDD;
    border-radius: 5px;
    transition: 0.5s;
}
input:hover{
    border: 1px solid #4CAF50;
    transition: 0.5s;
}
button{
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s;
}
button:hover{
    background-color: #45a049;
    transition: 0.5s;
}
.error{
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
}
</style>