<template>
    <section>
        <div class="botones">
            <RouterLink :to="{ path: '/ventas/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Realizar venta <i class="fa fa-cart-plus"></i>
                </button>
            </RouterLink>
            <button @click.prevent="imprimirVentasPDF" class="btn btn-sm btn-outline-primary" v-if="ventas.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <button class="btn btn-sm btn-outline-primary" v-if="ventas.length > 0">
                <download-excel :data="ventas" type="xlsx" name="clientes.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaVentas">
        <caption>
            <h3>Ventas</h3>
        </caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Clave Articulo</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Iva</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th>Fecha venta</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="ventas.length == 0">
                <td class="centrado" colspan="8">Sin ventas registradas</td>
            </tr>
            <tr v-for="venta in ventas" :key="venta.id">
                <td>{{ venta.id }}</td>
                <td>{{ venta.id_articulo }}</td>
                <td>{{ venta.cantidad }}</td>
                <td>{{ venta.precio }}</td>
                <td>{{ venta.iva }}</td>
                <td>{{ venta.subtotal }}</td>
                <td>{{ venta.total }}</td>
                <td>{{ formatDate(venta.fecha_venta) }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <!-- un botones para imprimir por cada venta -->
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/ventas/' + venta.id + '/imprimir' }"><i
                                    class="fa fa-print"></i></RouterLink>
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
import { useVentas } from '../controladores/useVentas';
const { traeVentas, ventas } = useVentas();

onMounted(() => {
    traeVentas();
});


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');  // que el día tenga dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  //  que el mes tenga dos dígitos
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

const imprimirVentasPDF = async () => {
    let tabla = document.getElementById('tablaVentas');
    await html2PDF(tabla, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'compras.pdf',
    });
}

</script>

<style scoped>
.botones {
    display: flex;
    flex-flow: row wrap;
    max-width: 600px;
}

.centrado {
    text-align: center;
}

#tablaVentas {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 5px 5px #ccc;
}

button {
    margin: 5px;
    transition: all 0.3s;
}

button:hover {
    transform: scale(1.1);
    transition: all 0.3s;
}

section {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    margin-top: 20px;
    width: 90%;
}

caption {
    caption-side: top;
    text-align: center;
    padding-bottom: 10px;
    font-weight: bold;
    color: black;
}

tr {
    text-align: center;
    font-size: 1.2em;
    transition: all 0.3s;
}

tr:hover {
    background-color: #9afaa2;
    transition: all 0.3s;
}

td {
    padding: 2px;
    font-size: 0.9em;
}
</style>