import { ref } from "vue";
import registroApi from "../api/registroAPI";
import type { Registro } from '../interfaces/registro-interface';

export const useRegistro = () => {
    const mensaje = ref(0);
    const registros = ref<Registro[]>([])

    const traeRegistros = async () => {
        const respuesta = await registroApi.get<Registro[]>('/')
        registros.value = respuesta.data
        console.log(registros.value)
    }
    
    const registrarUsuario = async (usuario: any) => {
        const respuesta = await registroApi.post('/', usuario)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    return {
        registrarUsuario,
        traeRegistros,
        mensaje,
        registros
    }
}

