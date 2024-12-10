<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar venta</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="VentasSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Clave Articulo
                        <Field name="id_articulo" type="number" class="form-control" v-model="venta.id_articulo" />
                        <ErrorMessage name="id_articulo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Clave Cliente
                        <Field name="id_cliente" type="number" class="form-control" v-model="venta.id_cliente" />
                        <ErrorMessage name="id_cliente" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad
                        <Field name="cantidad" type="number" class="form-control" v-model="venta.cantidad" />
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="number" class="form-control" v-model="venta.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Iva
                        <Field name="iva" type="number" class="form-control" v-model="venta.iva" disabled />
                        <ErrorMessage name="iva" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha
                        <Field name="fecha" type="date" class="form-control" v-model="venta.fecha_venta" />
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
import type { VentaAgregar } from '../interfaces/ventas-interfaces';
import { useVentas } from '../controladores/useVentas';

const { agregarVenta,mensaje } = useVentas();
import { VentasSchema } from '../schemas/VentasSchema';
import {Field,Form,ErrorMessage} from 'vee-validate';

    let venta = ref<VentaAgregar>({
        id_articulo: 0,
        id_cliente: 0,
        cantidad: 0,
        precio: 0,
        iva: 0.16,
        fecha_venta: ''
    });

    const onTodoBien = async () => {
        await agregarVenta(venta.value);
    }
</script>

<style scoped>
.errorValidacion{
    color: red;
}
</style>