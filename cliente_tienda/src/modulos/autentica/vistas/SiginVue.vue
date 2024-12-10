<template>
    <div class="contenedor">
        <form @submit.prevent="entradaUsuario" class="formulario">
            <h2>Verifica tu usuario</h2>
            <div class="grupo">
                <label class="eti">Correo:</label>
                <input type="email" 
                    required
                    v-model="correo"
                > 
            </div>
            <div class="grupo">
                <label class="eti">Contraseña:</label>
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
    h2{
        text-align: center;
        transition: 0.40s;
    }
    h2:hover{
        color: #4CAF50;
        transition: 0.25s;
    }
    .error{
        color: red;
        font-size: 0.9em;
        margin-top: 0.5em;
    }

    
</style>