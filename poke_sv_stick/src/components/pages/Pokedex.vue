<template>
    <q-page>
        <div class="q-pa-md">
            <q-table
                title="図鑑データ"
                :rows="pokedex"
                :columns="columns"
                row-key="name"
                :filter="filter"
                style="max-width: 350px;"
                :rows-per-page-options="[10, 20, 50, 100, 0]"
            >
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            </q-table>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import pokedex from "../../assets/data/pokedex.json"

type ColumnType = {
    name: string
    label: string
    field: string
    align: 'left' | 'center' | 'right'
}
const columns: ColumnType[] = [
    {name: "name", label: "名前", field: "name", align: "left"},
    {name: "type1", label: "タイプ１", field: "type1", align: "left"},
    {name: "type2", label: "タイプ２", field: "type2", align: "left"},
]

const filter = ref('')

</script>