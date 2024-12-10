<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar compra</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ComprasSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Clave Articulo
                        <Field name="id_articulo" type="number" class="form-control" v-model="compra.id_articulo" />
                        <ErrorMessage name="id_articulo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad
                        <Field name="cantidad" type="number" class="form-control" v-model="compra.cantidad" />
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="compra.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Iva
                        <Field name="iva" type="number" class="form-control" v-model="compra.iva" disabled />
                        <ErrorMessage name="iva" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha
                        <Field name="fecha" type="date" class="form-control" v-model="compra.fecha_compra" />
                        <ErrorMessage name="fecha" class="errorValidacion" />
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
import { ref } from 'vue';
import type { CompraAgregar } from '../interfaces/compras-interfaces';
import { useCompras } from '../controladores/useCompras';

const { agregarCompra,mensaje } = useCompras();
import { ComprasSchema } from '../schemas/ComprasSchema';
import {Field,Form,ErrorMessage} from 'vee-validate';

    let compra = ref<CompraAgregar>({
        id_articulo: 0,
        cantidad: 0,
        precio: 0,
        iva: 0.16,
        fecha_compra: ''
    })

    const onTodoBien = async () => {
        await agregarCompra(compra.value);
    }
</script>

<style scoped>
    .errorValidacion {
        color: red;
    }
</style>