<template>
    <div class="contenedor">
        <form @submit.prevent="entradaUsuario" class="formulario">
            <h2>validacion de usuario</h2>
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
                Ingresar
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import '../../../firebase/config'

    const correo = ref('')
    const clave = ref('')
    const error = ref(null)
    const router = useRouter()

    const entradaUsuario = async() =>{
        error.value = null;
        try {
            const auth = getAuth()
            await signInWithEmailAndPassword(auth, correo.value, clave.value)
            router.push({name: 'personal'})
        } catch (err) {
            switch(err.code){
                case 'auth/user-not-found':
                    error.value = "El usuario no existe"
                    break;
                case 'auth/wrong-password':
                    error.value = 'La contraseña es incorrecta'
                    break;
                default:
                    console.log(err.code)
                    error.value = 'Ocurrió un error al ingresar'
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