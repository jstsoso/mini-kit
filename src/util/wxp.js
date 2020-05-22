// https://github.com/wechat-miniprogram/miniprogram-api-promise
const API = [
  'canvasGetImageData',
  'canvasPutImageData',
  'canvasToTempFilePath',
  'setEnableDebug',
  'startAccelerometer',
  'stopAccelerometer',
  'getBatteryInfo',
  'getClipboardData',
  'setClipboardData',
  'startCompass',
  'stopCompass',
  'addPhoneContact',
  'startGyroscope',
  'stopGyroscope',
  'startBeaconDiscovery',
  'stopBeaconDiscovery',
  'getBeacons',
  'startLocalServiceDiscovery',
  'stopLocalServiceDiscovery',
  'startDeviceMotionListening',
  'stopDeviceMotionListening',
  'getNetworkType',
  'makePhoneCall',
  'scanCode',
  'getSystemInfo',
  'vibrateShort',
  'vibrateLong',
  'getExtConfig',
  'chooseLocation',
  'getLocation',
  'openLocation',
  'chooseMessageFile',
  'loadFontFace',
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'saveImageToPhotosAlbum',
  'compressImage',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'downloadFile',
  'request',
  'connectSocket',
  'closeSocket',
  'sendSocketMessage',
  'uploadFile',
  'login',
  'checkSession',
  'chooseAddress',
  'authorize',
  'addCard',
  'openCard',
  'chooseInvoice',
  'chooseInvoiceTitle',
  'getUserInfo',
  'requestPayment',
  'getWeRunData',
  'showModal',
  'showToast',
  'hideToast',
  'showLoading',
  'hideLoading',
  'showActionSheet',
  'pageScrollTo',
  'startPullDownRefresh',
  'stopPullDownRefresh',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'showTabBar',
  'hideTabBar',
  'setTabBarStyle',
  'setTabBarItem',
  'setTopBarText',
  'saveFile',
  'openDocument',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'getFileInfo',
  'getStorage',
  'setStorage',
  'removeStorage',
  'clearStorage',
  'getStorageInfo',
  'closeBLEConnection',
  'closeBluetoothAdapter',
  'createBLEConnection',
  'getBLEDeviceCharacteristics',
  'getBLEDeviceServices',
  'getBluetoothAdapterState',
  'getBluetoothDevices',
  'getConnectedBluetoothDevices',
  'notifyBLECharacteristicValueChange',
  'openBluetoothAdapter',
  'readBLECharacteristicValue',
  'startBluetoothDevicesDiscovery',
  'stopBluetoothDevicesDiscovery',
  'writeBLECharacteristicValue',
  'getHCEState',
  'sendHCEMessage',
  'startHCE',
  'stopHCE',
  'getScreenBrightness',
  'setKeepScreenOn',
  'setScreenBrightness',
  'connectWifi',
  'getConnectedWifi',
  'getWifiList',
  'setWifiList',
  'startWifi',
  'stopWifi',
  'getBackgroundAudioPlayerState',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'seekBackgroundAudio',
  'stopBackgroundAudio',
  'getAvailableAudioSources',
  'startRecord',
  'stopRecord',
  'setInnerAudioOption',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'getSetting',
  'openSetting',
  'getShareInfo',
  'hideShareMenu',
  'showShareMenu',
  'updateShareMenu',
  'checkIsSoterEnrolledInDevice',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'navigateBackMiniProgram',
  'navigateToMiniProgram',
  'setNavigationBarTitle',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'setNavigationBarColor',
  'redirectTo',
  'reLaunch',
  'navigateTo',
  'switchTab',
  'navigateBack',
]

function promisifyAll(wx, wxp) {
  for (const api of API) {
    const isFn = typeof wx[api] === 'function'
    if (isFn) wxp[api] = (args = {}) => new Promise((resolve, reject) => wx[api]({ ...args, success: resolve, fail: reject }))
    else console.log(`注意：wx.${api} 不是函数，已跳过`) // eslint-disable-line no-console
  }
}

const wxp = {}
promisifyAll(wx, wxp)
export default wxp

