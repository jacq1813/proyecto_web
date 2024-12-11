<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Agregar empleado</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="personal.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" type="text" class="form-control" v-model="personal.direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="personal.telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="estatus" type="number" class="form-control" v-model="personal.estatus" />
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)">Agregar</button> -->
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
import { usePersonal } from '../controladores/usePersonal';
import type { PersonalAgregar } from '../interfaces/personal-interface';
import { PersonalSchema } from '../schemas/PersonalSchema';

const { agregarPersonal, mensaje } = usePersonal();

let personal = ref<PersonalAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    estatus: 0
})

const onTodoBien = async () => {
    await agregarPersonal(personal.value); //todo lo que este asignado con ref se accede con .value
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