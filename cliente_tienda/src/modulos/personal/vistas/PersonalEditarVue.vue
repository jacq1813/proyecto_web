<template>
    <div class="container mt-5" v-if="personal[0]"> 
        <div class="card">
            <div class="card-header">
                <h4>Editar personal</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-succes" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="personal[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre">
                </div>
                <div class="mb-3">
                    Dirección
                    <input type="text" class="form-control" v-model="personal[0].direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal[0].telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="actualizarPersonal(personal[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
const { traePersonalId,mensaje,personal,actualizarPersonal } = usePersonal();

import { PersonalSchema } from '../schemas/PersonalSchema';
import {Field,Form,ErrorMessage} from 'vee-validate';

let IdPersona = 0;
const route = useRoute();
onMounted(async() => {
    IdPersona = Number(route.params.id);
    await traePersonalId(Number(IdPersona));
})
</script>

<style scoped>

</style>