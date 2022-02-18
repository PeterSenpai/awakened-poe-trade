<template>
  <div class="filter-name">
    <button class="px-2 rounded border"
      :class="{ 'border-gray-500': showAsActive, 'border-gray-900': !showAsActive }"
      @click="toggleAccuracy">{{ label }}</button>
    <button v-if="filters.corrupted" class="px-2" @click="corrupted = !corrupted">
      <span v-if="corrupted" class="text-red-500">{{ t('Corrupted') }}</span>
      <span v-else class="text-gray-600">{{ t('Not Corrupted') }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ParsedItem } from '@/parser'
import type { ItemFilters } from './interfaces'

export default defineComponent({
  name: 'FilterName',
  props: {
    filters: {
      type: Object as PropType<ItemFilters>,
      required: true
    },
    item: {
      type: Object as PropType<ParsedItem>,
      required: true
    }
  },
  setup (props) {
    const { t } = useI18n()

    const label = computed(() => {
      const { filters } = props
      const activeSearch = (filters.searchRelaxed && !filters.searchRelaxed.disabled)
        ? filters.searchRelaxed
        : filters.searchExact

      if (activeSearch.name) {
        return activeSearch.name
      }
      if (activeSearch.baseType) {
        return activeSearch.baseType
      }
      if (activeSearch.category) {
        return t(`Category: ${activeSearch.category}`)
      }

      return '??? Report if you see this text'
    })

    const showAsActive = computed(() => {
      const { filters } = props
      return filters.searchRelaxed?.disabled
    })

    function toggleAccuracy () {
      const { filters } = props
      if (filters.searchRelaxed) {
        filters.searchRelaxed.disabled = !filters.searchRelaxed.disabled
      }
    }

    const corrupted = computed<boolean>({
      get () { return props.filters.corrupted!.value },
      set (value) { props.filters.corrupted!.value = value }
    })

    return {
      t,
      label,
      showAsActive,
      toggleAccuracy,
      corrupted
    }
  }
})
</script>

<style lang="postcss">
.filter-name {
  @apply bg-gray-900 mb-2 rounded;
  line-height: 1.25rem;
  display: flex;
  justify-content: space-between;
}
</style>

<i18n>
{
  "ru": {
    "Corrupted": "Осквернен",
    "Not Corrupted": "Не осквернен",
    "Category: Abyss Jewel": "Категория: Самоцвет Бездны",
    "Category: Amulet": "Категория: Амулет",
    "Category: Belt": "Категория: Пояс",
    "Category: Body Armour": "Категория: Нательная броня",
    "Category: Boots": "Категория: Сапоги",
    "Category: Bow": "Категория: Лук",
    "Category: Claw": "Категория: Коготь",
    "Category: Dagger": "Категория: Кинжал",
    "Category: Fishing Rod": "Категория: Удочка",
    "Category: Flask": "Категория: Флакон",
    "Category: Gloves": "Категория: Перчатки",
    "Category: Helmet": "Категория: Шлем",
    "Category: Jewel": "Категория: Самоцвет",
    "Category: One-Handed Axe": "Категория: Одноручный топор",
    "Category: One-Handed Mace": "Категория: Одноручная булава",
    "Category: One-Handed Sword": "Категория: Одноручный меч",
    "Category: Quiver": "Категория: Колчан",
    "Category: Ring": "Категория: Кольцо",
    "Category: Rune Dagger": "Категория: Рунический кинжал",
    "Category: Sceptre": "Категория: Скипетр",
    "Category: Shield": "Категория: Щит",
    "Category: Staff": "Категория: Посох",
    "Category: Two-Handed Axe": "Категория: Двуручный топор",
    "Category: Two-Handed Mace": "Категория: Двуручная булава",
    "Category: Two-Handed Sword": "Категория: Двуручный меч",
    "Category: Wand": "Категория: Жезл",
    "Category: Warstaff": "Категория: Воинский посох",
    "Category: Cluster Jewel": "Категория: Кластерный самоцвет",
    "Category: Heist Blueprint": "Категория: Чертёж Кражи",
    "Category: Heist Contract": "Категория: Контракт Кражи",
    "Category: Heist Tool": "Категория: Разбойничий инструмент",
    "Category: Heist Brooch": "Категория: Разбойничья брошь",
    "Category: Heist Gear": "Категория: Разбойничьи принадлежности",
    "Category: Heist Cloak": "Категория: Разбойничья накидка",
    "Category: Trinket": "Категория: Украшение"
  },
  "taiwan":{
    "Corrupted": "破損",
    "Not Corrupted": "未破損",
    "Category: Abyss Jewel": "分類: 藍晶石",
    "Category: Amulet": "分類: 披風",
    "Category: Belt": "分類: 腰帶",
    "Category: Body Armour": "分類: 身體護甲",
    "Category: Boots": "分類: 靴子",
    "Category: Bow": "分類: 弓",
    "Category: Claw": "分類: 爪",
    "Category: Dagger": "分類: 匕首",
    "Category: Fishing Rod": "分類: 魚竿",
    "Category: Flask": "分類: 瓶子",
    "Category: Gloves": "分類: 手套",
    "Category: Helmet": "分類: 胸甲",
    "Category: Jewel": "分類: 珠寶",
    "Category: One-Handed Axe": "分類: 單手斧",
    "Category: One-Handed Mace": "分類: 單手錘",
    "Category: One-Handed Sword": "分類: 單手劍",
    "Category: Quiver": "分類: 箭袋",
    "Category: Ring": "分類: 戒指",
    "Category: Rune Dagger": "分類: 符文匕首",
    "Category: Sceptre": "分類: 杖",
    "Category: Shield": "分類: 盾牌",
    "Category: Staff": "分類: 杖",
  }
}
</i18n>
