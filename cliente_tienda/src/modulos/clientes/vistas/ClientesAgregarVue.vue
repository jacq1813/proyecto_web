<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Agregar cliente</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ClientesSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="direccion" type="text" class="form-control" v-model="cliente.direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="cliente.telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Correo electronico
                        <Field name="correo_electronico" type="text" class="form-control"
                            v-model="cliente.correo_electronico" />
                        <ErrorMessage name="correo_electronico" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <Field name="ciudad" type="text" class="form-control" v-model="cliente.ciudad" />
                        <ErrorMessage name="ciudad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useClientes } from '../controladores/useClientes';
import type { ClienteAgregar } from '../interfaces/clientes-interfaces';
import { ClientesSchema } from '../schemas/ClientesSchema';

const { agregarCliente, mensaje } = useClientes();

let cliente = ref<ClienteAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    ciudad: ''
})

const onTodoBien = async () => {
    await agregarCliente(cliente.value); //todo lo que este asignado con ref se accede con .value
}

const goBack = () => {
    router.go(-1);
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>