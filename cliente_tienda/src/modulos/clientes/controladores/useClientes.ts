import { ref } from "vue"
import type { Cliente, ClienteAgregar } from "../interfaces/clientes-interfaces"
import clientesApi from "../api/clientesAPI"

export const useClientes = () => {
    const clientes = ref<Cliente[]>([])
    let mensaje = ref(0);

    const traeClientes = async () => {
        const respuesta = await clientesApi.get<Cliente[]>('/')
        clientes.value = respuesta.data
        console.log(clientes.value)
    }
    const traeClientesId = async (id: number) => {
        const respuesta = await clientesApi.get<Cliente[]>('/'+id)
        clientes.value = respuesta.data
        console.log(clientes.value)
    }
    
    const agregarCliente = async (cliente: ClienteAgregar) => {
        const respuesta = await clientesApi.post('/', cliente)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const actualizarCliente = async (cliente: Cliente) => {
        const respuesta = await clientesApi.put('/',cliente) 
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarCliente = async (cliente: Cliente) => {
        const respuesta = await clientesApi.delete('/',{data: {id: cliente.id}})
        if(respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return {
        clientes,
        traeClientes,
        agregarCliente,
        mensaje,
        traeClientesId,
        actualizarCliente,
        borrarCliente
    }
}