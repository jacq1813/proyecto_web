<template>
    <section>
        <div class="botones">
            <button @click.prevent="imprimirCompraPDF" class="btn btn-primary">Imprimir</button>
        </div>
    </section>
    <div class="container mt-5" v-if="compras[0]">
        <div class="card" id="carta">
            <div class="card-header">
                <h4>Compra</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" :value="compras[0].id" disabled />
                </div>
                <div class="mb-3">
                    Clave Artículo
                    <input type="text" class="form-control" :value="compras[0].id_articulo" disabled />
                </div>
                <div class="mb-3">
                    Cantidad
                    <input type="text" class="form-control" :value="compras[0].cantidad" disabled />
                </div>
                <div class="mb-3">
                    Precio
                    <input type="text" class="form-control" :value="compras[0].precio" disabled />
                </div>
                <div class="mb-3">
                    Iva
                    <input type="text" class="form-control" :value="compras[0].iva" disabled />
                </div>
                <div class="mb-3">
                    Fecha
                    <input type="text" class="form-control" :value="compras[0].fecha_compra" disabled />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import html2PDF from 'jspdf-html2canvas';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCompras } from '../controladores/useCompras';

const { traeComprasId, compras } = useCompras();

let IdCompra = 0;
const route = useRoute();

onMounted(async () => {
    IdCompra = Number(route.params.id);
    await traeComprasId(IdCompra);
});

const imprimirCompraPDF = async () => {
    let contenedor = document.getElementById('carta');
    await html2PDF(contenedor, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'compra.pdf',
    });
};


</script>

<style scoped>
.botones{
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    width: 82%;
}
button{
        margin: 5px;
        transition: all 0.3s;
    }
    button:hover{
        transform: scale(1.1);
        transition: all 0.3s;
    }

h4{
    color: black;
}
</style>