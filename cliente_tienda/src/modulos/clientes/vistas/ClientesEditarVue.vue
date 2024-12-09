<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar cliente</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                    <div class="mb-3">
                        Id
                        <input type="text" class="form-control" v-model="clientes[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <input type="text" class="form-control" v-model="clientes[0].nombre">
                    </div>
                    <div class="mb-3">
                        Direccion
                        <input type="text" class="form-control" v-model="clientes[0].direccion">
                    </div>
                    <div class="mb-3">
                        Telefono
                        <input type="text" class="form-control" v-model="clientes[0].telefono">
                    </div>
                    <div class="mb-3">
                        Correo electronico
                        <input type="text" class="form-control" v-model="clientes[0].correo_electronico">
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <input type="text" class="form-control" v-model="clientes[0].ciudad">
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" @click="actualizarCliente(clientes[0])">Actualizar</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientes } from '../controladores/useClientes';
const { traeClientesId,mensaje,clientes,actualizarCliente } = useClientes();

import { ClientesSchema } from '../schemas/ClientesSchema';
import {Field,Form,ErrorMessage} from 'vee-validate';

let IdCliente = 0;
const route = useRoute();
onMounted(async() => {
    IdCliente = Number(route.params.id);
    await traeClientesId(IdCliente);
})
</script>

<style scoped>

</style>