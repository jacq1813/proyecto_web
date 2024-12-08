<template>
    <div class="contenedor">
        <form @submit.prevent="registrarUsuario" class="formulario">
            <h2>Registro de usuario</h2>
            <div class="grupo">
                <label>Correo:</label>
                <input type="email" 
                    required
                    v-model="correo"
                > 
            </div>
            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" 
                    required
                    v-model="clave"
                > 
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
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import '../../../firebase/config'

    const correo = ref('')
    const clave = ref('')
    const error = ref(null)
    const router = useRouter()

    const registrarUsuario = async() =>{
        error.value = null;
        try {
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth, correo.value, clave.value)
            router.push({name: 'bienvenida'})
        } catch (err) {
            switch(err.code){
                case 'auth/email-already-in-use':
                    error.value = "El correo ya está en uso"
                    break;
                case 'auth/weak-password':
                    error.value = 'La contraseña debe tener al menos 6 caracteres'
                    break;
                default:
                    console.log(err.code)
                    error.value = 'Ocurrió un error al registrar el usuario'
                    break;
            }
        }
    }
</script>

<style scoped>
    .contenedor{
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
    }
    .formulario{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .grupo{
        display: flex;
        flex: column;
        gap: 0.5em;
    }
    input{
        padding: 8px;
        border: 1px solid #DDD;
        border-radius: 5px;
    }
    button{
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .error{
        color: red;
        font-size: 0.9em;
        margin-top: 0.5em;
    }

    
</style>