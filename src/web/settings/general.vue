<template>
  <div class="max-w-md p-2">
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Font size') }} <span class="bg-gray-200 text-gray-900 rounded px-1">{{ t('Restart required') }}</span></div>
      <div class="mb-4 flex">
        <input v-model.number="fontSize" class="rounded bg-gray-900 px-1 block w-16 mb-1 font-fontin-regular text-center" />
        <span class="ml-1">px</span>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Clicking on background focuses game') }}</div>
      <div class="mb-4 flex">
        <ui-radio v-model="overlayBackgroundClose" :value="false" class="mr-4">{{ t('No') }}</ui-radio>
        <ui-radio v-model="overlayBackgroundClose" :value="true" class="mr-4">{{ t('Yes') }}</ui-radio>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Background, when APT window is clickable') }}</div>
      <div class="mb-1 flex">
        <input v-model="overlayBackground" class="rounded bg-gray-900 px-1 block w-48 mb-1 mr-4 font-fontin-regular text-center" />
        <ui-radio v-model="overlayBackground" value="rgba(255, 255, 255, 0)">{{ t('Transparent') }}</ui-radio>
      </div>
      <div class="mb-4" v-if="overlayBackground !== 'rgba(255, 255, 255, 0)'">
        <ui-radio v-model="overlayBackgroundExclusive" :value="true" class="mr-4">{{ t('Show for Overlay and Price Check') }}</ui-radio><br>
        <ui-radio v-model="overlayBackgroundExclusive" :value="false">{{ t('Show only for Overlay') }}</ui-radio>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('PoE log file') }}</div>
      <div class="mb-4 flex">
        <input v-model.trim="clientLog"
          class="rounded-l bg-gray-900 px-1 block w-full font-sans" placeholder="???/Grinding Gear Games/Path of Exile/logs/Client.txt">
        <input type="file" id="file-client-log" class="hidden" accept=".txt" @input="handleLogFile">
        <label class="text-gray-400 bg-gray-900 px-2 rounded-r ml-px cursor-pointer" for="file-client-log">{{ t('Browse') }}</label>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('PoE config file') }}</div>
      <div class="mb-4 flex">
        <input v-model.trim="gameConfig"
          class="rounded-l bg-gray-900 px-1 block w-full font-sans" placeholder="???/My Games/Path of Exile/production_Config.ini">
        <input type="file" id="file-client-config" class="hidden" accept=".ini" @input="handleGameConfigFile">
        <label class="text-gray-400 bg-gray-900 px-2 rounded-r ml-px cursor-pointer" for="file-client-config">{{ t('Browse') }}</label>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Language') }} <span class="bg-gray-200 text-gray-900 rounded px-1">{{ t('Restart required') }}</span></div>
      <div class="mb-4 flex">
        <ui-radio v-model="language" value="en" class="mr-4">English</ui-radio>
        <ui-radio v-model="language" value="ru" class="mr-4">Русский</ui-radio>
        <ui-radio v-model="language" value="taiwan" class="mr-4">taiwan</ui-radio>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex-1 mb-1">{{ t('Auto-download updates') }}</div>
      <div class="mb-4 flex">
        <ui-radio v-model="disableUpdateDownload" :value="false" class="mr-4">{{ t('Yes') }}</ui-radio>
        <ui-radio v-model="disableUpdateDownload" :value="true" class="mr-4">{{ t('No') }}</ui-radio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { configModelValue, configProp } from './utils'

export default defineComponent({
  props: configProp(),
  setup (props) {
    const { t } = useI18n()

    return {
      t,
      fontSize: configModelValue(() => props.config, 'fontSize'),
      overlayBackgroundClose: configModelValue(() => props.config, 'overlayBackgroundClose'),
      overlayBackground: configModelValue(() => props.config, 'overlayBackground'),
      overlayBackgroundExclusive: configModelValue(() => props.config, 'overlayBackgroundExclusive'),
      clientLog: configModelValue(() => props.config, 'clientLog'),
      gameConfig: configModelValue(() => props.config, 'gameConfig'),
      language: configModelValue(() => props.config, 'language'),
      disableUpdateDownload: configModelValue(() => props.config, 'disableUpdateDownload'),
      handleLogFile (e: InputEvent) {
        props.config.clientLog = (e.target as HTMLInputElement).files![0].path
      },
      handleGameConfigFile (e: InputEvent) {
        props.config.gameConfig = (e.target as HTMLInputElement).files![0].path
      }
    }
  }
})
</script>

<i18n>
{
  "ru": {
    "Font size": "Размер шрифта",
    "Background, when APT window is clickable": "Фон, когда окно APT кликабельно",
    "Transparent": "Прозрачный",
    "Show for Overlay and Price Check": "Показывать для оверлея и прайс-чека",
    "Show only for Overlay": "Показывать только для оверлея",
    "Clicking on background focuses game": "Нажатие по фону активирует окно игры",
    "Language": "Язык",
    "PoE log file": "Файл логов PoE",
    "PoE config file": "Файл настроек PoE",
    "Browse": "Выбрать",
    "Auto-download updates": "Автозагрузка обновлений"
  },
  "taiwan": {
    "Font size": "字體大小",
    "Background, when APT window is clickable": "當 APT 窗口可點擊時的背景",
    "Transparent": "透明",
    "Show for Overlay and Price Check": "顯示為 Overlay 和價格檢查",
    "Show only for Overlay": "只顯示為 Overlay",
    "Clicking on background focuses game": "點擊背景將焦點移至遊戲",
    "Language": "語言",
    "PoE log file": "PoE 日誌檔案",
    "PoE config file": "PoE 設定檔案",
    "Browse": "瀏覽",
    "Auto-download updates": "自動下載更新"
  }
}
</i18n>
