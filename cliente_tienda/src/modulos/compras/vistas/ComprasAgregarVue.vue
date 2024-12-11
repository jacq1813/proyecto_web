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
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ComprasSchema" @submit="onTodoBien">
                    <!-- Sección de Datos de Compra -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="id_articulo">Clave Articulo</label>
                                <Field name="id_articulo" type="number" class="form-control" v-model="compra.id_articulo" />
                                <ErrorMessage name="id_articulo" class="errorValidacion" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="cantidad">Cantidad</label>
                                <Field name="cantidad" type="number" class="form-control" v-model="compra.cantidad"
                                    @input="calcularIVA" />
                                <ErrorMessage name="cantidad" class="errorValidacion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="precio">Precio</label>
                                <Field name="precio" type="number" class="form-control" v-model="compra.precio"
                                    @input="calcularIVA" />
                                <ErrorMessage name="precio" class="errorValidacion" />
                            </div>
                        </div>
                    </div>

                    <!-- Sección de Cuenta -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="iva">IVA</label>
                                <!-- Usamos v-model para vincular el valor de IVA -->
                                <input type="number" class="form-control" :value="iva.toFixed(2)" disabled />
                                <ErrorMessage name="iva" class="errorValidacion" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="subtotal">Subtotal</label>
                                <input type="number" class="form-control" :value="compra.cantidad * compra.precio"
                                    disabled />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="total">Total</label>
                                <input type="number" class="form-control" :value="(compra.cantidad * compra.precio) + iva"
                                    disabled />
                            </div>
                        </div>
                    </div>

                    <!-- Fecha (con valor por defecto de la fecha actual) -->
                    <div class="mb-3">
                        <label for="fecha">Fecha</label>
                        <Field name="fecha" type="date" class="form-control" v-model="compra.fecha_compra"
                            :value="fechaActual" />
                        <ErrorMessage name="fecha" class="errorValidacion" />
                    </div>

                    <!-- Botón Agregar -->
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCompras } from '../controladores/useCompras';
import type { CompraAgregar } from '../interfaces/compras-interfaces';
import { ComprasSchema } from '../schemas/ComprasSchema';

const iva = ref(0);
const { agregarCompra, mensaje } = useCompras();
const router = useRouter();
let compra = ref<CompraAgregar>({
    id_articulo: 0,
    cantidad: 0,
    precio: 0,
    iva: 0.16,
    fecha_compra: ''
});

// Obtener la fecha actual en formato YYYY-MM-DD
const fechaActual = new Date().toISOString().split('T')[0];

// Calcular IVA dinámicamente cuando cambian cantidad o precio
const calcularIVA = () => {
    iva.value = compra.value.cantidad * compra.value.precio * 0.16;
};

// Observadores para actualizar automáticamente el IVA
watch(() => compra.value.cantidad, calcularIVA);
watch(() => compra.value.precio, calcularIVA);

// Enviar compra al backend
const onTodoBien = async () => {
    await agregarCompra(compra.value);
};

// Función para regresar a la página anterior
const goBack = () => {
    router.go(-1); // Regresar a la página anterior en el historial
};
</script>

<style scoped>
.errorValidacion {
    color: red;
}
</style>
