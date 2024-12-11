<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Registrar movimiento de empleado</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje === 1" class="alert alert-success" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="RegistroSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Clave del empleado
                        <Field name="id_personal" type="number" class="form-control" v-model="regUsuario.id_personal" />
                        <ErrorMessage name="id_personal" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha
                        <Field name="fecha" type="date" class="form-control" v-model="regUsuario.fecha" />
                        <ErrorMessage name="fecha" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Hora
                        <Field name="hora" type="time" class="form-control" v-model="regUsuario.hora" />
                        <ErrorMessage name="hora" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Movimiento
                        <Field as="select" name="movimiento" class="form-control" v-model="regUsuario.movimiento">
                            <option value="" disabled>Seleccione un movimiento</option>
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </Field>
                        <ErrorMessage name="movimiento" class="errorValidacion" />
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
import { useRegistro } from '../controladores/useRegistro';
import type { RegistroNuevo } from '../interfaces/registro-interface';
import { RegistroSchema } from '../schemas/RegistroSchema';

const { registrarUsuario, mensaje } = useRegistro();

let regUsuario = ref<RegistroNuevo>({
    id_personal: 0,
    fecha: '',
    hora: '',
    movimiento: 'entrada', // Valor inicial opcional
});

const onTodoBien = async () => {
    await registrarUsuario(regUsuario.value);
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
  