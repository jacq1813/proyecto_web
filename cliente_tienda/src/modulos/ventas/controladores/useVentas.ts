import { ref } from "vue"
import ventasApi from "../api/ventasAPI"
import type { Venta, VentaAgregar } from "../interfaces/ventas-interfaces"

export const useVentas = () => {
    const ventas = ref<Venta[]>([])
    let mensaje = ref(0);

    const traeVentas = async () => {
        const respuesta = await ventasApi.get<Venta[]>('/')
        ventas.value = respuesta.data
        console.log(ventas.value)
    }

    const traeVentasId = async (id: number) => {
        const respuesta = await ventasApi.get<Venta[]>('/'+id)
        ventas.value = respuesta.data
        console.log(ventas.value)
    }

    const traeVentasIdCliente = async (id: number) => {
        const respuesta = await ventasApi.get<Venta[]>('/cliente/'+id)
        ventas.value = respuesta.data
        console.log(ventas.value)
    }

    const traeVentasIdArticulo = async (id: number) => {
        const respuesta = await ventasApi.get<Venta[]>('/articulo/'+id)
        ventas.value = respuesta.data
        console.log(ventas.value)
    }

    const agregarVenta = async (venta: VentaAgregar) => {

        const respuesta = await ventasApi.post('/', venta)
        console.log(respuesta.data)
        if(respuesta.data.affectedRows >= 1) {
            console.log("aqui ya no entra")
            mensaje.value = 1
        }
    }
    return{
        ventas,
        traeVentas,
        traeVentasId,
        traeVentasIdCliente,
        traeVentasIdArticulo,
        agregarVenta,
        mensaje,
    }
}