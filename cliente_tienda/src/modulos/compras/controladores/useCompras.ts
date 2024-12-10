import { ref } from "vue"
import type { Compra, CompraAgregar } from "../interfaces/compras-interfaces"
import comprasApi from "../api/comprasAPI"

export const useCompras = () => {
    const compras = ref<Compra[]>([])
    let mensaje = ref(0);

    const traeCompras = async () => {
        const respuesta = await comprasApi.get<Compra[]>('/')
        compras.value = respuesta.data
        console.log(compras.value)
    }

    const traeComprasId = async (id: number) => {
        const respuesta = await comprasApi.get<Compra[]>('/'+id)
        compras.value = respuesta.data
        console.log(compras.value)
    }

    const agregarCompra = async (compra: CompraAgregar) => {
        const respuesta = await comprasApi.post('/', compra)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    return{
        compras,
        traeCompras,
        traeComprasId,
        agregarCompra,
        mensaje,
    }
}