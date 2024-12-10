import { ref } from "vue"
import type { Venta, VentaAgregar } from "../interfaces/ventas-interfaces"
import ventasApi from "../api/ventasAPI"

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
        if(respuesta.data.affectedRows >= 1) {
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