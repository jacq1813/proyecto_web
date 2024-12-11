<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Eliminar cliente</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Estas seguro de borrar el cliente?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="clientes[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="clientes[0].nombre" disabled>
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="clientes[0].direccion" disabled>
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="clientes[0].telefono" disabled>
                </div>
                <div class="mb-3">
                    Correo electronico
                    <input type="text" class="form-control" v-model="clientes[0].correo_electronico" disabled>
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control" v-model="clientes[0].ciudad" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="borrarCliente(clientes[0])">Borrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientes } from '../controladores/useClientes';
const { traeClientesId, mensaje, clientes, borrarCliente } = useClientes();

let IdCliente = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value,
    newId => {
        routeRedirect.push({ path: '/clientes' });
    }
)

onMounted(async () => {
    IdCliente = Number(route.params.id);
    await traeClientesId(IdCliente);
})

const goBack = () => {
    router.go(-1);
}
</script>

<style scoped></style>