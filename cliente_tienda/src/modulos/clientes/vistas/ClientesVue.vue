<template>
    <section>
        <h3></h3>
        <h3>
            <!-- Clientes -->
        </h3>
        <div class="botones">
            <RouterLink :to="{ path: '/clientes/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus>"></i>
                </button>
            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirClientesPDF" class="btn btn-sm btn-outline-primary" v-if="clientes.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <!-- Agregamos un voton nuevo -->
            <button class="btn btn-sm btn-outline-primary" v-if="clientes.length > 0">
                <download-excel :data="clientes" type="xlsx" name="clientes.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaClientes">
        <caption>
            <h3>Clientes</h3>
        </caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Ciudad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="clientes.length == 0">
                <td class="centrado" colspan="6">Sin clientes registrados</td>
            </tr>
            <tr v-else v-for="(cliente, index) in clientes" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.correo_electronico }}</td>
                <td>{{ cliente.ciudad }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/clientes/' + cliente.id + '/editar' }"><i
                                    class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{ path: '/clientes/' + cliente.id + '/borrar' }"><i
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
import { useClientes } from '../controladores/useClientes';
const { traeClientes, clientes } = useClientes();

onMounted(() => {
    traeClientes();
});

const imprimirClientesPDF = async () => {
    let tabla = document.getElementById('tablaClientes');
    await html2PDF(tabla, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'clientes.pdf',
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
    #tablaClientes{
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