import { BrowserView, screen, shell } from 'electron'
import { DPR, overlayWindow, handleExtraCommands, overlayOnEvent } from './overlay-window'
import { PoeWindow } from './PoeWindow'
import { logger } from './logger'
import { config } from './config'

const WIDTH_96DPI = 460 / 16

let browserViewExternal: BrowserView | undefined

export function setupBuiltinBrowser () {
  overlayOnEvent('OVERLAY->MAIN::show-browser', (_, opts) => {
    logger.debug('Show', { source: 'builtin-browser', opts })
    if (!browserViewExternal) {
      browserViewExternal = new BrowserView()
      browserViewExternal.webContents.on('did-navigate', () => {
        browserViewExternal!.webContents.zoomFactor = config.get('fontSize') / 16
      })
      // hopefully someday this will enable subpixel AA
      // browserViewExternal.setBackgroundColor('#2d3748') // gray-800
      browserViewExternal.webContents.on('before-input-event', handleExtraCommands)
    }

    overlayWindow!.setBrowserView(browserViewExternal)
    let browserBounds = {
      x: 0,
      y: 0,
      width: PoeWindow.bounds.width - Math.floor(WIDTH_96DPI * DPR * config.get('fontSize')),
      height: PoeWindow.bounds.height
    }
    if (process.platform === 'win32') {
      browserBounds = screen.screenToDipRect(overlayWindow!, browserBounds)
    }
    browserViewExternal.setBounds(browserBounds)
    if (opts.url) {
      browserViewExternal.webContents.loadURL(opts.url)
    }
  })

  overlayOnEvent('OVERLAY->MAIN::hide-browser', (_, opts) => {
    logger.debug('Hide', { source: 'builtin-browser', close: opts.close || false })
    if (browserViewExternal) {
      overlayWindow!.removeBrowserView(browserViewExternal)
      // uncomment to trade performance for less memory usage (1 process & 13 MB)
      // browserViewExternal.destroy()
      // browserViewExternal = undefined
      if (opts.close) {
        browserViewExternal.webContents.loadURL('about:blank')
      }
    }
  })
}
