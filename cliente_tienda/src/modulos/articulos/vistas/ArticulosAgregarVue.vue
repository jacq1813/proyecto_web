<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Agregar venta</h4>
                <!-- Botón de Regresar -->
                <button class="btn btn-secondary" @click="goBack">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ArticulosSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Descripción
                        <Field name="descripcion" type="text" class="form-control" v-model="articulo.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="articulo.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad en almacen
                        <Field name="cantidad_almacen" type="number" class="form-control"
                            v-model="articulo.cantidad_almacen" />
                        <ErrorMessage name="cantidad_almacen" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha de caducidad
                        <Field name="fecha_caducidad" type="date" class="form-control" v-model="articulo.fecha_caducidad" />
                        <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <!-- <button class="btn btn-primary" @click="agregarArticulo(articulo)">Agregar</button> -->
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
import { useArticulos } from '../controladores/useArticulos';
import type { ArticuloAgregar } from '../interfaces/articulos-interfaces';
import { ArticulosSchema } from '../schemas/ArticulosSchema';

const { agregarArticulo, mensaje } = useArticulos();

let articulo = ref<ArticuloAgregar>({
    descripcion: '',
    precio: 0,
    cantidad_almacen: 0,
    fecha_caducidad: ''
})

const onTodoBien = async () => {
    await agregarArticulo(articulo.value); //todo lo que este asignado con ref se accede con .value
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