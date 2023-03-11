<template>
    <q-page>
        <div class="q-pa-md">
            <q-card class="my-card">
                <q-card-section>
                    <q-select style="max-width: 200px;" outlined v-model="teraType" :options="typeList" stack-label label="テラスタルタイプ">
                        <template v-if="teraType" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="teraType = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section>
                    <q-input style="max-width: 200px;" outlined stack-label label="ポケモン絞り込み" v-model="teraNameFilter" />
                    <q-select style="max-width: 200px;" outlined v-model="teraName" :options="showNameList" stack-label label="ポケモン名">
                        <template v-if="teraName" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="teraName = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section>
                    <q-select style="max-width: 160px;" outlined v-model="baseType1" :options="typeList" stack-label label="通常タイプ１">
                        <template v-if="baseType1" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="baseType1 = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                    <q-select style="max-width: 160px;" outlined v-model="baseType2" :options="typeList" stack-label label="通常タイプ２">
                        <template v-if="baseType2" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="baseType2 = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section>
                    <q-select style="max-width: 160px;" outlined v-model="subType1" :options="typeList" stack-label label="サブ技タイプ１">
                        <template v-if="subType1" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="subType1 = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                    <q-select style="max-width: 160px;" outlined v-model="subType2" :options="typeList" stack-label label="サブ技タイプ２">
                        <template v-if="subType2" v-slot:append>
                            <q-icon name="cancel" @click.stop.prevent="subType2 = ''" class="cursor-pointer" />
                        </template>
                    </q-select>
                </q-card-section>
            </q-card>
            <q-card class="my-card">
                <q-card-section v-if="goodTypes.length > 0">
                    <div class="text-subtitle1">推奨タイプ</div>
                    <q-list style="max-width: 600px;">
                        <q-item v-for="type in goodTypes">
                            <q-item-section :class="'bg-'+type.color">
                                <q-item-label>{{ type.name }}</q-item-label>
                                <q-item-label caption>{{ getGoodDesc(type.name) }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-section v-if="goodPokes.length > 0">
                    <div class="text-subtitle1">推奨ポケモン({{ goodPokes.length }})</div>
                    <div class="text-caption">タイプ相性のみ考慮しています。特性、進化段階、種族値などは考慮できていません。</div>
                    <q-scroll-area style="height: 200px; max-width: 300px;">
                        <q-list bordered separator>
                            <q-item v-for="poke in goodPokes" :class="'bg-'+poke_types.find(v => v.name == poke.type1)?.color">
                                <q-item-section>
                                    <q-item-label>{{ poke.name }}</q-item-label>
                                    <q-item-label caption>{{ poke.type1 }}</q-item-label>
                                    <q-item-label caption v-if="poke.type2 != ''">{{ poke.type2 }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-scroll-area>
                </q-card-section>
                <q-card-section v-if="guardTypes.length > 0">
                    <div class="text-subtitle1">耐久できるタイプ</div>
                    <q-list style="max-width: 120px;">
                        <q-item v-for="type in guardTypes">
                            <q-item-section :class="'bg-'+type.color">{{ type.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-section v-if="effectiveTypes.length > 0">
                    <div class="text-subtitle1">弱点を突けるタイプ</div>
                    <q-list style="max-width: 120px;">
                        <q-item v-for="type in effectiveTypes">
                            <q-item-section :class="'bg-'+type.color">{{ type.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-section v-if="weakTypes.length > 0">
                    <div class="text-subtitle1">弱点を突かれるタイプ</div>
                    <q-list style="max-width: 120px;">
                        <q-item v-for="type in weakTypes">
                            <q-item-section :class="'bg-'+type.color">{{ type.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
            <q-card class="my-card" v-if="tableAttackTypes.length > 0 && tableDefenseTypes.length > 0">
                <q-card-section>
                    <TypeCompTable :atk_poke_types="tableAttackTypes" :def_poke_types="tableDefenseTypes" />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import pokedex from "../../assets/data/pokedex.json"
import poke_types from "../../assets/data/poke_types.json"
import poke_weak from "../../assets/data/poke_weak.json"
import poke_strong from "../../assets/data/poke_strong.json"
import poke_noeffect from "../../assets/data/poke_noeffect.json"
import poke_subtypes from "../../assets/data/poke_raid_subtypes.json"
import TypeCompTable from "../organisms/TypeCompTable.vue";

const teraType = ref('')
const teraName = ref('')
const teraNameFilter = ref('')
const baseType1 = ref('')
const baseType2 = ref('')
const subType1 = ref('')
const subType2 = ref('')
const typeList = poke_types.map(v => v.name)
const nameList = pokedex.map(v => v.name)


const effectiveTypes = computed(() => {
    if (teraType.value == '') return []
    return poke_types.filter(v => {
        // @ts-ignore
        const weak: string[] | undefined = poke_weak[teraType.value]
        if (weak == undefined) return false
        // ポケモン名が指定されている場合は特性を考慮する
        if (teraName.value != '') {
            // @ts-ignore
            const subData = poke_subtypes[teraName.value]
            if (subData != undefined) {
                // 無効または半減特性の対象タイプは弾いておく
                if (subData.noeffect != undefined && subData.noeffect.includes(v.name)) return false
                if (subData.strong != undefined && subData.strong.includes(v.name)) return false
            }
        }
        return weak.includes(v.name)
    })
})

const attackTypes = computed((): string[] => {
    let types: string[] = []
    if (baseType1.value != '') types.push(baseType1.value)
    if (baseType2.value != '') types.push(baseType2.value)
    if (subType1.value != '') types.push(subType1.value)
    if (subType2.value != '') types.push(subType2.value)
    return types
})
const weakTypes = computed(() => {
    return poke_types.filter(v => {
        for (const key in attackTypes.value) {
            const attackType = attackTypes.value[key]
            // @ts-ignore
            if (poke_weak[v.name].includes(attackType)) {
                return true
            }
        }
        return false
    })
})

const guardTypes = computed(() => {
    if (attackTypes.value.length == 0) return []

    return poke_types.filter(v => {
        // 攻撃タイプに対して一つでも弱点を持っているタイプはNG
        for (const key in attackTypes.value) {
            const attackType = attackTypes.value[key]
            // @ts-ignore
            if (poke_weak[v.name].includes(attackType)) {
                return false
            }
        }
        // 弱点がなく、半減以上のタイプがあれば推奨
        for (const key in attackTypes.value) {
            const attackType = attackTypes.value[key]
            // @ts-ignore
            if (poke_noeffect[v.name].includes(attackType)) {
                return true
            }
            // @ts-ignore
            if (poke_strong[v.name].includes(attackType)) {
                return true
            }
        }
        return false
    })
})
const bestTypes = computed(() => {
    if (effectiveTypes.value.length == 0 || guardTypes.value.length == 0) return []

    return poke_types.filter(v => {
        // 弱点を突けて、かつ半減以上を有していればベスト
        if (!effectiveTypes.value.map(v => v.name).includes(v.name)) return false
        if (!guardTypes.value.map(v => v.name).includes(v.name)) return false
        // テラスタルタイプが元タイプと一致している場合はそれに対して半減できないとNG
        if (teraType.value == baseType1.value || teraType.value == baseType2.value) {
            // @ts-ignore
            if (poke_noeffect[v.name].includes(teraType.value)) {
                return true
            }
            // @ts-ignore
            if (poke_strong[v.name].includes(teraType.value)) {
                return true
            }
            return false
        }
        // 不一致ならそのままtrue
        return true
    })
})
const goodTypes = computed(() => {
    if (effectiveTypes.value.length == 0 || guardTypes.value.length == 0) return []

    // 理想タイプがあればそのまま返却
   if (bestTypes.value.length != 0) return bestTypes.value
    // なければガード可能を優先
    return guardTypes.value
})
const goodPokes = computed(() => {
    if (effectiveTypes.value.length == 0 || attackTypes.value.length == 0) return []

    return pokedex.filter((dex => {
        // 攻撃NG判定、弱点タイプを保有してないポケモンは全て弾く
        if (!effectiveTypes.value.map(v => v.name).includes(dex.type1) && !effectiveTypes.value.map(v => v.name).includes(dex.type2)) {
            return false
        }
        // 防御判定、弱点を突かれるポケモンは全て弾く
        let defFlag = false
        for (const key in attackTypes.value) {
            const attackType = attackTypes.value[key]
            // @ts-ignore
            if (poke_noeffect[dex.type1].includes(attackType)) {
                defFlag = true
                continue
            }
            // @ts-ignore
            if (dex.type2 != '' && poke_noeffect[dex.type2].includes(attackType)) {
                defFlag = true
                continue
            }
            let rate: number = 1.0
            // @ts-ignore
            if (poke_strong[dex.type1].includes(attackType)) {
                rate *= 0.5
            }
            // @ts-ignore
            if (dex.type2 != '' && poke_strong[dex.type2].includes(attackType)) {
                rate *= 0.5
            }
            // @ts-ignore
            if (poke_weak[dex.type1].includes(attackType)) {
                rate *= 2
            }
            // @ts-ignore
            if (dex.type2 != '' && poke_weak[dex.type2].includes(attackType)) {
                rate *= 2
            }
            // @ts-ignore
            const subData = poke_subtypes[dex.name]
            if (subData != undefined) {
                if (subData.noeffect != undefined && subData.noeffect.includes(attackType)) {
                    rate *= 0
                }
                if (subData.strong != undefined && subData.strong.includes(attackType)) {
                    rate *= 0.5
                }
            }
            // 1種類
            if (rate > 1.0) {
                return false
            }
            if (rate < 1.0) {
                defFlag = true
            } else if (bestTypes.value.length >= 1 && attackType == teraType.value && (attackType == dex.type1 || attackType == dex.type2)) {
                return false
            }
        }
        return defFlag
    }))
})
const getGoodDesc = (typeName: string): string => {
    let desc = ''
    if (effectiveTypes.value.map(v => v.name).includes(typeName)) {
        desc = teraType.value + 'に攻撃抜群。'
    }
    let strongTypes: string[] = []
    let noeffectTypes: string[] = []
    for (const key in attackTypes.value) {
        const attackType = attackTypes.value[key]
        // @ts-ignore
        if (poke_strong[typeName].includes(attackType)) {
            strongTypes.push(attackType)
        }
        // @ts-ignore
        if (poke_noeffect[typeName].includes(attackType)) {
            noeffectTypes.push(attackType)
        }
    }
    if (noeffectTypes.length > 0) {
        desc += noeffectTypes.join("、") + "の攻撃無効。"
    }
    if (strongTypes.length > 0) {
        desc += strongTypes.join("、") + "の攻撃半減。"
    }
    return desc
}
const hira2kata = (source: string) => {
    return source.replace(/[\u3041-\u3096]/g, function(match) {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr)
    })
}
const showNameList = computed(() => {
    const katakana = teraNameFilter.value.split('').map(char => {
        return hira2kata(char)
    }).join('')
    return nameList.filter(v => v.indexOf(katakana) != -1)
})
watch(showNameList, () => {
    if (showNameList.value.length != 1) return
    teraName.value = showNameList.value[0]
})
watch(teraName, () => {
    if (teraName.value == '') return
    const dexItem = pokedex.find(v => v.name == teraName.value)
    if (dexItem == undefined) return

    baseType1.value = dexItem.type1
    baseType2.value = dexItem.type2
    const subtypeData = poke_subtypes.find(v => v.name == teraName.value)
    subType1.value = ''
    subType2.value = ''
    if (subtypeData != undefined) {
        let subTypes = []
        if (subtypeData.types.length >= 1) subTypes.push(subtypeData.types[0])
        if (subtypeData.types.length >= 2) subTypes.push(subtypeData.types[1])
        if (subtypeData.hasBurst) subTypes.push(teraType.value)
        
        if (subTypes.length >= 1) subType1.value = subtypeData.types[0]
        if (subTypes.length >= 2) subType2.value = subtypeData.types[1]
        if (subTypes.length >= 3) console.error("Over subtypes", subTypes)
    }
})


const tableAttackTypes = computed(() => {
    return poke_types.filter(v => {
        if (attackTypes.value.includes(v.name)) return true
        return false
    })
})
const tableDefenseTypes = computed(() => {
    return poke_types.filter(v => {
        if (guardTypes.value.map(v => v.name).includes(v.name)) return true
        if (effectiveTypes.value.map(v => v.name).includes(v.name)) return true
        if (weakTypes.value.map(v => v.name).includes(v.name)) return true
        return false
    })
})
</script>
