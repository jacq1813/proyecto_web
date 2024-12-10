<template>
    <section>
        <h3></h3>
        <h3>
            <!-- Articulos -->
        </h3>
        <div class="botones">
            <RouterLink :to="{ path: '/articulos/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus>"></i>
                </button>

            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirArticulosPDF" class="btn btn-sm btn-outline-primary"
                v-if="articulos.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <!-- Agregamos un voton nuevo -->
            <button class="btn btn-sm btn-outline-primary" v-if="articulos.length > 0">
                <download-excel :data="articulos" type="xlsx" name="articulos.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaArticulos">
        <caption>
            <h3>Articulos</h3>
        </caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad almacen</th>
                <th>Fecha Caducidad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="articulos.length == 0">
                <td class="centrado" colspan="6">Sin articulos registrados</td>
            </tr>
            <tr v-else v-for="(articulo, index) in articulos" :key="articulo.id">
                <td>{{ articulo.id }}</td>
                <td>{{ articulo.descripcion }}</td>
                <td>{{ articulo.precio }}</td>
                <td>{{ articulo.cantidad_almacen }}</td>
                <td>{{ articulo.fecha_caducidad }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + articulo.id + '/editar' }"><i
                                    class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + articulo.id + '/borrar' }"><i
                                    class="fa fa-trash"></i></RouterLink>
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
import { useArticulos } from '../controladores/useArticulos';
const { traeArticulos, articulos } = useArticulos();

onMounted(async () => {
    await traeArticulos();
})

const imprimirArticulosPDF = async () => {
    let pagina = document.getElementById('tablaArticulos');
    await html2PDF(pagina, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'articulos.pdf'
    });
}
</script>

<style scoped>
    .botones{
        display: flex;
        flex-flow: row wrap;
        max-width: 600px
    }
    .centrado{
        text-align: center;
        display: flex;
        justify-content: center;

    }
    #tablaArticulos{
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
        justify-content: space-around;
        margin-top: 20px;
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