<template>
    <section>
        <h3></h3>
        <h3>
            <!-- Articulos -->
        </h3>
        <div class="botones">
            <RouterLink :to="{ path: '/registro/agregar' }">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus>"></i>
                </button>

            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirRegistrosPDF" class="btn btn-sm btn-outline-primary"
                v-if="registros.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <!-- Agregamos un voton nuevo -->
            <button class="btn btn-sm btn-outline-primary" v-if="registros.length > 0">
                <download-excel :data="registros" type="xlsx" name="registros.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
            </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaRegistros">
        <caption>
            <h3>Registros de personal</h3>
        </caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Personal</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Movimiento</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="registros.length == 0">
                <td class="centrado" colspan="6">Sin articulos registrados</td>
            </tr>
            <tr v-else v-for="(registro, index) in registros" :key="registro.id">
                <td>{{ registro.id }}</td>
                <td>{{ registro.id_personal }}</td>
                <td>{{ registro.fecha }}</td>
                <td>{{ registro.hora }}</td>
                <td>{{ registro.movimiento }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + registro.id + '/editar' }"><i
                                    class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{ path: '/articulos/' + registro.id + '/borrar' }"><i
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
import { useRegistro } from '../controladores/useRegistro';
const { traeRegistros, registros } = useRegistro();

onMounted(async () => {
    await traeRegistros();
})

const imprimirRegistrosPDF = async () => {
    let pagina = document.getElementById('tablaRegistros');
    await html2PDF(pagina, {
        jsPDF: {
            format: 'a4',
        },
        imageType: 'image/jpeg',
        output: 'registros.pdf'
    });
}
</script>

<style scoped>
.botones {
    display: flex;
    flex-flow: row wrap;
    max-width: 600px
}

#tablaRegistros {
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
    justify-content: space-around;
    margin-top: 20px;
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

.centrado {
    text-align: center;
}

caption {
    caption-side: top;
    text-align: center;
    padding-bottom: 10px;
    font-weight: bold;
    color: black;
}
</style>