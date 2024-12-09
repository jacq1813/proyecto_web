<template>
    <div class="container mt-5" v-if="articulos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar articulo</h4>
            </div>
            <div  class="alert alert-warning" role="alert">
                ¿Estas seguro de borrar el articulo?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="articulos[0].id" disabled>
                </div>
                <div class="mb-3">
                    Descripción
                    <input type="text" class="form-control" v-model="articulos[0].descripcion" disabled>
                </div>
                <div class="mb-3">
                    Precio
                    <input type="text" class="form-control" v-model="articulos[0].precio" disabled>
                </div>
                <div class="mb-3">
                    Cantidad en almacen
                    <input type="text" class="form-control" v-model="articulos[0].cantidad_almacen" disabled>
                </div>
                <div class="mb-3">
                    Fecha de caducidad
                    <input type="text" class="form-control" v-model="articulos[0].fecha_caducidad" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="borrarArticulo(articulos[0])">Borrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
const { traeArticulosId,mensaje,articulos,borrarArticulo } = useArticulos();

let IdArticulo = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value,
    newId => {
        routeRedirect.push({path:'/articulos'});
    }
)

onMounted(async() => {
    IdArticulo = Number(route.params.id);
    await traeArticulosId(IdArticulo);
})
</script>

<style scoped>

</style>