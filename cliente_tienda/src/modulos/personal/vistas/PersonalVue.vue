<template>
    <section>
        <h3></h3>
        <h3>
            <!-- Personal -->
        </h3>
        <div>
            <RouterLink :to="{path:'/personal/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus>"></i>
                </button>

            </RouterLink>
            &nbsp;
            <button @click.prevent="imprimirPersonalPDF" class="btn btn-sm btn-outline-primary" v-if="personal.length > 0">
                Imprimir <i class="fa fa-print"></i>
            </button>
            <!-- Agregamos un voton nuevo -->
             <button class="btn btn-sm btn-outline-primary"  v-if="personal.length > 0">
                <download-excel :data="personal" type="xlsx" name="personal.xlsx">
                    Exportar a Excel <i class="fa fa-file-excel-o"></i>
                </download-excel>
             </button>
        </div>
    </section>
    <table class="table table-striped" id="tablaPersonal">
        <caption><h3>Personal</h3></caption>
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="personal.length == 0">
                <td class="centrado" colspan="6">Sin personal registrado</td>
            </tr>
            <tr v-else v-for="(persona,index) in personal" :key="persona.id">
                <td>{{persona.id}}</td>
                <td>{{persona.nombre}}</td>
                <td>{{persona.direccion}}</td>
                <td>{{persona.telefono}}</td>
                <td>{{persona.estatus}}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to ="{path: '/personal/'+persona.id+'/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to ="{path: '/personal/'+persona.id+'/borrar'}"><i class="fa fa-trash"></i></RouterLink>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import html2PDF from 'jspdf-html2canvas'
    import { onMounted } from 'vue'
    import { usePersonal } from '../controladores/usePersonal'
    const { traePersonal, personal } = usePersonal()
    //Cuando la pagina es visible y esta cargada
    onMounted(async () => {
        await traePersonal()
    })

    const imprimirPersonalPDF = async () => {
        let pagina = document.getElementById('tablaPersonal')
        await html2PDF(pagina, {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './reporte_personal.pdf'
        });
    }

    // load <--- carga, en memoria
    // mounted <--- cargada y se ve en la pantalla
</script>

<style scoped>
    section{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-top: 20px;
    }
    .centrado{
        text-align: center;
    }
    caption{
        caption-side: top;
        text-align: center;
        padding-bottom: 10px;
        font-weight: bold;
    }
</style>