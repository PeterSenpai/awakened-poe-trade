<template>
  <div class="max-w-md p-2">
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Log level') }} <span class="bg-gray-200 text-gray-900 rounded px-1">{{ t('Restart required') }}</span></div>
      <div class="mb-4 flex gap-x-4">
        <ui-radio v-model="logLevel" value="warn">Warn</ui-radio>
        <ui-radio v-model="logLevel" value="silly">Debug</ui-radio>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Hardware Acceleration') }} <span class="bg-gray-200 text-gray-900 rounded px-1">{{ t('Restart required') }}</span></div>
      <div class="mb-4 flex">
        <ui-radio v-model="hardwareAcceleration" :value="true" class="mr-4">{{ t('Enabled') }}</ui-radio>
        <ui-radio v-model="hardwareAcceleration" :value="false" class="mr-4">{{ t('Disabled (render on CPU)') }}</ui-radio>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('PoE window title') }} <span class="bg-gray-200 text-gray-900 rounded px-1">{{ t('Restart required') }}</span></div>
      <div class="mb-4">
        <input v-model="windowTitle" class="rounded bg-gray-900 px-1 block w-full mb-1 font-fontin-regular" />
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Restore clipboard') }}</div>
      <div class="mb-4 flex">
        <ui-radio v-model="restoreClipboard" :value="true" class="mr-4">{{ t('Yes') }}</ui-radio>
        <ui-radio v-model="restoreClipboard" :value="false" class="mr-4">{{ t('No') }}</ui-radio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { configProp, configModelValue } from './utils'

export default defineComponent({
  props: configProp(),
  setup (props) {
    const { t } = useI18n()

    return {
      t,
      logLevel: configModelValue(() => props.config, 'logLevel'),
      hardwareAcceleration: configModelValue(() => props.config, 'hardwareAcceleration'),
      windowTitle: configModelValue(() => props.config, 'windowTitle'),
      restoreClipboard: configModelValue(() => props.config, 'restoreClipboard')
    }
  }
})
</script>

<i18n>
{
  "ru": {
    "Log level": "Уровень логов",
    "Hardware Acceleration": "Аппаратное ускорение",
    "Disabled (render on CPU)": "Отключено (рендерить на CPU)",
    "PoE window title": "Заголовок окна игры",
    "Restore clipboard": "Восстанавливать буфер обмена"
  },
  "taiwan": {
    "Log level": "日誌等級",
    "Hardware Acceleration": "硬體加速",
    "Disabled (render on CPU)": "停用 (在 CPU 上渲染)",
    "PoE window title": "PoE 窗口標題",
    "Restore clipboard": "恢復剪貼板"
  },
}
</i18n>
