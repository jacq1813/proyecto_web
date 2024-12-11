<template>
    <div class="container mt-5" v-if="ventas[0]">
        <div class="card" id="cartaVenta">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4>Informacion de la venta</h4>

                <button @click.prevent="imprimirVentaPDF" class="btn btn-secondary justify-content-end">Imprimir</button>

            </div>
            <div class="card-body">
                <div class="mb-3">
                    Clave de venta
                    <input type="text" class="form-control" :value="ventas[0].id" disabled />
                </div>
                <div class="mb-3">
                    Artículo
                    <input type="text" class="form-control" :value="ventas[0].id_articulo" disabled />
                </div>
                <div class="mb-3">
                    Cantidad de unidades del artículo
                    <input type="text" class="form-control" :value="ventas[0].cantidad" disabled />
                </div>
                <div class="mb-3">
                    Precio del producto
                    <input type="text" class="form-control" :value="ventas[0].precio" disabled />
                </div>
                <div class="mb-3">
                    IVA total
                    <input type="text" class="form-control" :value="ventas[0].iva" disabled />
                </div>
                <div class="mb-3">
                    Subtotal
                    <input type="text" class="form-control" :value="ventas[0].subtotal" disabled />
                </div>
                <div class="mb-3">
                    Total de la venta
                    <input type="text" class="form-control" :value="ventas[0].total" disabled />
                </div>
                <div class="mb-3">
                    Fecha
                    <input type="text" class="form-control" :value="formatDate(ventas[0].fecha_venta)" disabled />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import html2PDF from 'jspdf-html2canvas';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVentas } from '../controladores/useVentas';
const { traeVentasId, ventas } = useVentas();


let idVenta = 0;
const route = useRoute();

onMounted(async () => {
    idVenta = Number(route.params.id);
    await traeVentasId(idVenta);
});

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');  // que el día tenga dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  //  que el mes tenga dos dígitos
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

const imprimirVentaPDF = async () => {
    let contenedor = document.getElementById('cartaVenta');
    await html2PDF(contenedor, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'venta.pdf',
    });
};
</script>

<style scoped>
.botones {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    width: 82%;
}

button {
    margin: 5px;
    transition: all 0.3s;
}

button:hover {
    transform: scale(1.1);
    transition: all 0.3s;
}

h4 {
    color: black;
}
</style>
