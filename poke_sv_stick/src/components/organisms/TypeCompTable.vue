<template>
    <table border="0">
    <tr>
        <th style="min-width: 30px; min-height: 30px;" colspan="2"></th>
        <th style="min-width: 30px; min-height: 30px;" :colspan="def_poke_types.length" class="bg-secondary">防 御 側</th>
    </tr>
    <tr>
        <th style="min-width: 30px; min-height: 30px;" colspan="2"></th>
        <th style="min-width: 30px; min-height: 30px;" v-for="type in def_poke_types" :class="'bg-'+type.color">{{ type.short }}</th>
    </tr>
    <tr v-for="atk_type in atk_poke_types">
        <th style="min-width: 30px; min-height: 30px;" :rowspan="atk_poke_types.length" v-if="atk_type == atk_poke_types[0]" class="bg-primary">攻<br/>撃<br/>側</th>
        <th style="min-width: 30px; min-height: 30px;" :class="'bg-'+atk_type.color">{{ atk_type.short }}</th>
        <td v-for="def_type in def_poke_types" style="min-width: 30px; min-height: 30px; text-align: center; user-select: none;" :class="'bg-'+def_type.color">{{ getCompMark(atk_type.name, def_type.name) }}<q-tooltip v-if="getCompMark(atk_type.name, def_type.name) != ''">攻撃：{{ atk_type.name }}<br/>防御：{{ def_type.name }}<br/>相性：{{ getCompMark(atk_type.name, def_type.name) }}</q-tooltip></td>
    </tr>
</table>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import poke_weak from "../../assets/data/poke_weak.json"
import poke_strong from "../../assets/data/poke_strong.json"
import poke_noeffect from "../../assets/data/poke_noeffect.json"

type PokeType = {
    name: string
    short: string
    color: string
}

const props = defineProps<{
    atk_poke_types: PokeType[]
    def_poke_types: PokeType[]
}>()

const getCompMark = (atk_type: string, def_type: string): string => {
    // @ts-ignore
    const weak: string[] | undefined = poke_weak[def_type]
    if (weak != undefined && weak.includes(atk_type)) {
        return "●"
    }
    // @ts-ignore
    const strong: string[] | undefined = poke_strong[def_type]
    if (strong != undefined && strong.includes(atk_type)) {
        return "▲"
    }
    // @ts-ignore
    const noeffect: string[] | undefined = poke_noeffect[def_type]
    if (noeffect != undefined && noeffect.includes(atk_type)) {
        return "×"
    }
    
    return ""
}
</script>
