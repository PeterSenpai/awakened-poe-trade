<template>
  <ui-popover :delay="[80, null]" placement="bottom-start" boundary="#price-window">
    <template #target>
      <button class="text-gray-500 rounded mr-1 px-2 truncate">
        <span><i class="fas fa-history"></i> {{ t(filters.trade.offline ? 'Offline' : 'Online') }}</span>
        <span v-if="showLeagueName">, {{ filters.trade.league }}</span>
      </button>
    </template>
    <template #content>
      <div class="flex gap-x-8 p-2 bg-gray-800 text-gray-400">
        <div class="flex flex-col gap-y-1">
          <div class="mb-1">
            <ui-toggle v-model="filters.trade.offline">{{ t('Offline & Online') }}</ui-toggle>
          </div>
          <template v-if="byTime">
            <ui-radio v-model="filters.trade.listed" :value="undefined">{{ t('Listed: Any Time') }}</ui-radio>
            <ui-radio v-model="filters.trade.listed" value="1day">{{ t('1 Day Ago') }}</ui-radio>
            <ui-radio v-model="filters.trade.listed" value="3days">{{ t('3 Days Ago') }}</ui-radio>
            <ui-radio v-model="filters.trade.listed" value="1week">{{ t('1 Week Ago') }}</ui-radio>
            <ui-radio v-model="filters.trade.listed" value="2weeks">{{ t('2 Weeks Ago') }}</ui-radio>
            <ui-radio v-model="filters.trade.listed" value="1month">{{ t('1 Month Ago') }}</ui-radio>
          </template>
        </div>
        <div class="flex flex-col gap-y-1">
          <div class="mb-1 h-6">
            <ui-toggle v-if="!filters.trade.offline"
              v-model="filters.trade.onlineInLeague">{{ t('In League') }}</ui-toggle>
          </div>
          <ui-radio v-for="league of tradeLeagues" :key="league.id"
            v-model="filters.trade.league" :value="league.id">{{ league.id }}</ui-radio>
        </div>
      </div>
    </template>
  </ui-popover>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ItemFilters } from '../filters/interfaces'
import { selected as defaultLeague, tradeLeagues } from '../../background/Leagues'

export default defineComponent({
  props: {
    filters: {
      type: Object as PropType<ItemFilters>,
      required: true
    },
    byTime: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { t } = useI18n()

    return {
      t,
      tradeLeagues,
      showLeagueName: computed(() => defaultLeague.value !== props.filters.trade.league)
    }
  }
})
</script>

<i18n>
{
  "ru": {
    "Offline & Online": "Офлайн и Онлайн",
    "In League": "В лиге",
    "Listed: Any Time": "Любое время",
    "1 Day Ago": "До 1-го дня",
    "3 Days Ago": "До 3-х дней",
    "1 Week Ago": "До 1-й недели",
    "2 Weeks Ago": "До 2-х недель",
    "1 Month Ago": "До 1-го месяца"
  },
  "taiwan": {
    "Offline & Online": "離線與上線",
    "In League": "在聯盟",
    "Listed: Any Time": "任何時間",
    "1 Day Ago": "1 天前",
    "3 Days Ago": "3 天前",
    "1 Week Ago": "1 週前",
    "2 Weeks Ago": "2 週前",
    "1 Month Ago": "1 月前"
  }
}
</i18n>
