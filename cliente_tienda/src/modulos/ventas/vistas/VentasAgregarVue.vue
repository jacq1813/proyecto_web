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
                <Form :validation-schema="VentasSchema" @submit="onTodoBien">
                    <!-- Sección de Datos de Venta -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="id_articulo">Articulo</label>
                                <Field name="id_articulo" as="select" class="form-control" v-model="venta.id_articulo"
                                    @change="actualizarPrecio">
                                    <option value="0">Seleccione un artículo</option>
                                    <option v-for="articulo in articulos" :key="articulo.id" :value="articulo.id">
                                        {{ articulo.descripcion }}
                                    </option>
                                </Field>
                                <ErrorMessage name="id_articulo" class="errorValidacion" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="id_cliente">Clave Cliente</label>
                                <Field name="id_cliente" type="number" class="form-control" v-model="venta.id_cliente" />
                                <ErrorMessage name="id_cliente" class="errorValidacion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="cantidad">Cantidad</label>
                                <Field name="cantidad" type="number" class="form-control" v-model="venta.cantidad"
                                    @input="calcularIVA" />
                                <ErrorMessage name="cantidad" class="errorValidacion" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="precio">Precio</label>
                                <input type="number" class="form-control" :value="venta.precio" disabled />
                            </div>
                        </div>
                    </div>

                    <!-- Sección de Cuenta -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="iva">IVA total</label>
                                <input type="number" class="form-control" :value="iva.toFixed(2)" disabled />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="subtotal">Subtotal</label>
                                <input type="number" class="form-control" :value="venta.cantidad * venta.precio" disabled />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="total">Total</label>
                                <input type="number" class="form-control" :value="(venta.cantidad * venta.precio) + iva"
                                    disabled />
                            </div>
                        </div>
                    </div>

                    <!-- Fecha -->
                    <div class="mb-3">
                        <label for="fecha">Fecha</label>
                        <Field name="fecha" type="date" class="form-control" v-model="venta.fecha_venta" />
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
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useArticulos } from '../../articulos/controladores/useArticulos';
import { useVentas } from '../controladores/useVentas';
import type { VentaAgregar } from '../interfaces/ventas-interfaces';
import { VentasSchema } from '../schemas/VentasSchema';

const iva = ref(0);
const { agregarVenta, mensaje } = useVentas();
const { articulos, traeArticulos } = useArticulos();

const router = useRouter();

let venta = ref<VentaAgregar>({
    id_articulo: 0,
    id_cliente: 0,
    cantidad: 0,
    precio: 0,
    fecha_venta: ''
});

// Cargar artículos al montar el componente
onMounted(async () => {
    await traeArticulos();
});

// Actualizar precio cuando cambia el artículo seleccionado
const actualizarPrecio = () => {
    const articulo = articulos.value.find((articulo) => articulo.id === venta.value.id_articulo);
    venta.value.precio = articulo ? Number(articulo.precio) : 0;
    calcularIVA();
};

// Calcular IVA dinámicamente cuando cambian cantidad o precio
const calcularIVA = () => {
    iva.value = venta.value.cantidad * venta.value.precio * 0.16;
};

// Observadores para actualizar automáticamente el IVA
watch(() => venta.value.cantidad, calcularIVA);
watch(() => venta.value.precio, calcularIVA);

// Enviar venta al backend
const onTodoBien = async () => {
    await agregarVenta(venta.value);
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
