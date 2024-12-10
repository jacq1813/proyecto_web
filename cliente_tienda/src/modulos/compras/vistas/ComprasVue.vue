<template>
    <section>
        <div>
            <button @click.prevent="imprimirComprasPDF" class="btn btn-sm btn-outline-primary" v-if="compras.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <button class="btn btn-sm btn-outline-primary" v-if="compras.length > 0">
                <download-excel :data="compras" type="xlsx" name="clientes.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table id="tablaCompras">
        <caption><h3>Compras</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Clave Articulo</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>iva</th>
                <th>subtotal</th>
                <th>total</th>
                <th>fecha_compra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="compras.length == 0">
                <td class="centrado" colspan="8">Sin compras registradas</td>
            </tr>
            <tr v-for="compra in compras" :key="compra.id">
                <td>{{ compra.id }}</td>
                <td>{{ compra.id_articulo }}</td>
                <td>{{ compra.cantidad }}</td>
                <td>{{ compra.precio }}</td>
                <td>{{ compra.iva }}</td>
                <td>{{ compra.subtotal }}</td>
                <td>{{ compra.total }}</td>
                <td>{{ compra.fecha }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <!-- un botones para imprimir por cada compra -->
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/compras/' + compra.id + '/imprimir' }"><i class="fa fa-print"></i></RouterLink>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import html2PDF from 'jspdf-html2canvas';
import { onMounted } from 'vue';
import { useCompras } from '../controladores/useCompras';
const { traeCompras, compras } = useCompras();

onMounted(() => {
    traeCompras();
});

const imprimirComprasPDF = () => {
    let tabla = document.getElementById('tablaCompras');
    html2PDF(tabla, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'compras.pdf',
    });
};
</script>

<style scoped>

</style>