<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Agregar venta</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" type="text" class="form-control" :value="personal[0].id" disabled />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="personal[0].nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" type="text" class="form-control" v-model="personal[0].direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="personal[0].telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="estatus" type="number" class="form-control" v-model="personal[0].estatus" />
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Actualizar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
const { traePersonalId, mensaje, personal, actualizarPersonal } = usePersonal();

import { ErrorMessage, Field, Form } from 'vee-validate';
import { PersonalSchema } from '../schemas/PersonalSchema';

let IdPersona = 0;
const route = useRoute();

onMounted(async () => {
    IdPersona = Number(route.params.id);
    await traePersonalId(IdPersona);
});

const onTodoBien = async () => {
    await actualizarPersonal(personal.value[0]);
};

const goBack = () => {
    router.go(-1);
};

</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>
