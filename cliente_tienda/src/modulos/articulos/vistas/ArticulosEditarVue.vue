<template>
    <div class="container mt-5" v-if="articulos[0]">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Agregar venta</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje === 1" class="alert alert-success" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ArticulosSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" type="text" class="form-control" :value="articulos[0].id" disabled />
                    </div>
                    <div class="mb-3">
                        Descripción
                        <Field name="descripcion" type="text" class="form-control" v-model="articulos[0].descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="articulos[0].precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad en almacén
                        <Field name="cantidad_almacen" type="number" class="form-control"
                            v-model="articulos[0].cantidad_almacen" />
                        <ErrorMessage name="cantidad_almacen" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha de caducidad
                        <Field name="fecha_caducidad" type="date" class="form-control"
                            v-model="articulos[0].fecha_caducidad" />
                        <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
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
import { ErrorMessage, Field, Form } from 'vee-validate';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
import { ArticulosSchema } from '../schemas/ArticulosSchema';

const { traeArticulosId, mensaje, articulos, actualizarArticulo } = useArticulos();

let IdArticulo = 0;
const route = useRoute();

onMounted(async () => {
    IdArticulo = Number(route.params.id);
    await traeArticulosId(IdArticulo);
});

const onTodoBien = async () => {
    await actualizarArticulo(articulos.value[0]);
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
