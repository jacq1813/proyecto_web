<template>
    <section>
        <div class="botones">
            <RouterLink :to="{path:'/compras/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar Compra <i class="fa fa-plus>"></i>
                </button>
            </RouterLink>
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
    <table class="table table-striped" id="tablaCompras">
        <caption><h3>Compras</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Clave Articulo</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Iva</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th>Fecha compra</th>
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
                <td>{{ compra.fecha_compra }}</td>
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

const imprimirComprasPDF =async () => {
    let tabla = document.getElementById('tablaCompras');
    await html2PDF(tabla, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'compras.pdf',
    });
};
</script>

<style scoped>
    .botones{
        display: flex;
        flex-flow: row wrap;
        max-width: 600px;
    }

    .centrado{
        text-align: center;
    }
    #tablaCompras{
        width: 90%;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 2px 5px 5px #ccc;
    }
    button{
        margin: 5px;
        transition: all 0.3s;
    }
    button:hover{
        transform: scale(1.1);
        transition: all 0.3s;
    }
    section{
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        margin-top: 20px;
        width: 90%;
    }
    caption{
        caption-side: top;
        text-align: center;
        padding-bottom: 10px;
        font-weight: bold;
        color: black;
    }
    tr{
        text-align: center;
        font-size: 1.2em;
        transition: all 0.3s;
    }
    tr:hover{
        background-color: #9afaa2;
        transition: all 0.3s;
    }
    td{
        padding: 2px;
        font-size: 0.9em;
    }
</style>