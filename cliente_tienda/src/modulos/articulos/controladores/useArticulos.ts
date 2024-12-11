import { ref } from "vue"
import articulosApi from "../api/articulosAPI"
import type { Articulo, ArticuloAgregar } from "../interfaces/articulos-interfaces"

export const useArticulos = () => {
    const articulos = ref<Articulo[]>([])
    let mensaje = ref(0);

    const traeArticulos = async () => {
        const respuesta = await articulosApi.get<Articulo[]>('/')
        articulos.value = respuesta.data
        console.log(articulos.value)
    }
    const traeArticulosId = async (id: number) => {
        const respuesta = await articulosApi.get<Articulo[]>('/'+id)
        articulos.value = respuesta.data
        console.log(articulos.value)
    }
    
    const agregarArticulo = async (articulo: ArticuloAgregar) => {
        const respuesta = await articulosApi.post('/', articulo)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const actualizarArticulo = async (articulo: Articulo) => {
        const respuesta = await articulosApi.put('/',articulo) 
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarArticulo = async (articulo: Articulo) => {
        const respuesta = await articulosApi.delete('/',{data: {id: articulo.id}})
        if(respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return {
        articulos,
        traeArticulos,
        agregarArticulo,
        mensaje,
        traeArticulosId,
        actualizarArticulo,
        borrarArticulo
    }
}

