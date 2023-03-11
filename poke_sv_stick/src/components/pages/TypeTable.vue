<template>
  <q-page>
    <div class="q-pa-md">
        <h4>タイプ相性表</h4>

        <TypeCompTable :atk_poke_types="poke_types" :def_poke_types="poke_types" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import poke_types from "../../assets/data/poke_types.json"
import TypeCompTable from "../organisms/TypeCompTable.vue";
</script>
