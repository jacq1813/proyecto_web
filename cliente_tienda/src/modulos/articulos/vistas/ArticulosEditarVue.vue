<template>
    <div class="container mt-5" v-if="articulos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar articulo</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                    <div class="mb-3">
                        Id
                        <input type="text" class="form-control" v-model="articulos[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Descripción
                        <input type="text" class="form-control" v-model="articulos[0].descripcion">
                    </div>
                    <div class="mb-3">
                        Precio
                        <input type="text" class="form-control" v-model="articulos[0].precio">
                    </div>
                    <div class="mb-3">
                        Cantidad en almacen
                        <input type="text" class="form-control" v-model="articulos[0].cantidad_almacen">
                    </div>
                    <div class="mb-3">
                        Fecha de caducidad
                        <input type="text" class="form-control" v-model="articulos[0].fecha_caducidad">
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" @click="actualizarArticulo(articulos[0])">Actualizar</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
const { traeArticulosId,mensaje,articulos,actualizarArticulo } = useArticulos();

import { ArticulosSchema } from '../schemas/ArticulosSchema';
import {Field,Form,ErrorMessage} from 'vee-validate';

let IdArticulo = 0;
const route = useRoute();
onMounted(async() => {
    IdArticulo = Number(route.params.id);
    await traeArticulosId(IdArticulo);
})
</script>

<style scoped>

</style>