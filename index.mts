export type TAler9Config = {
  logLevel: string
  logDestinations: string[]
  logFile: string
  readTimeout: string
  writeTimeout: string
  readBufferCount: number
  externalAuthenticationURL: string
  api: boolean
  apiAddress: string
  metrics: boolean
  metricsAddress: string
  pprof: boolean
  pprofAddress: string
  runOnConnect: string
  runOnConnectRestart: boolean
  rtspDisable: boolean
  protocols: string[]
  encryption: string
  rtspAddress: string
  rtspsAddress: string
  rtpAddress: string
  rtcpAddress: string
  multicastIPRange: string
  multicastRTPPort: number
  multicastRTCPPort: number
  serverKey: string
  serverCert: string
  authMethods: string[]
  rtmpDisable: boolean
  rtmpAddress: string
  rtmpEncryption: string
  rtmpsAddress: string
  rtmpServerKey: string
  rtmpServerCert: string
  hlsDisable: boolean
  hlsAddress: string
  hlsEncryption: boolean
  hlsServerKey: string
  hlsServerCert: string
  hlsAlwaysRemux: boolean
  hlsVariant: string
  hlsSegmentCount: 7
  hlsSegmentDuration: string
  hlsPartDuration: string
  hlsSegmentMaxSize: string
  hlsAllowOrigin: string
  hlsTrustedProxies: []
  webrtcDisable: boolean
  webrtcAddress: string
  webrtcEncryption: boolean
  webrtcServerKey: string
  webrtcServerCert: string
  webrtcAllowOrigin: string
  webrtcTrustedProxies: string[]
  webrtcICEServers: string[]
  paths: {
    [x: string]: {
      source: string
      sourceProtocol: string
      sourceAnyPortEnable: boolean
      sourceFingerprint: string
      sourceOnDemand: boolean
      sourceOnDemandStartTimeout: string
      sourceOnDemandCloseAfter: string
      sourceRedirect: string
      disablePublisherOverride: boolean
      fallback: string
      rpiCameraCamID: number
      rpiCameraWidth: number
      rpiCameraHeight: number
      rpiCameraHFlip: boolean
      rpiCameraVFlip: boolean
      rpiCameraBrightness: number
      rpiCameraContrast: number
      rpiCameraSaturation: number
      rpiCameraSharpness: number
      rpiCameraExposure: string
      rpiCameraAWB: string
      rpiCameraDenoise: string
      rpiCameraShutter: number
      rpiCameraMetering: string
      rpiCameraGain: number
      rpiCameraEV: number
      rpiCameraROI: string
      rpiCameraTuningFile: string
      rpiCameraMode: string
      rpiCameraFPS: number
      rpiCameraIDRPeriod: number
      rpiCameraBitrate: number
      rpiCameraProfile: string
      rpiCameraLevel: string
      publishUser: string
      publishPass: string
      publishIPs: []
      readUser: string
      readPass: string
      readIPs: []
      runOnInit: string
      runOnInitRestart: boolean
      runOnDemand: string
      runOnDemandRestart: boolean
      runOnDemandStartTimeout: string
      runOnDemandCloseAfter: string
      runOnReady: string
      runOnReadyRestart: boolean
      runOnRead: string
      runOnReadRestart: boolean
    }
  }
}

export type TAler9PathAddOrEdit = {
  source: string
  sourceProtocol: string
  sourceAnyPortEnable: boolean
  sourceFingerprint: string
  sourceOnDemand: boolean
  sourceOnDemandStartTimeout: string
  sourceOnDemandCloseAfter: string
  sourceRedirect: string
  disablePublisherOverride: boolean
  fallback: string
  rpiCameraCamID: number
  rpiCameraWidth: number
  rpiCameraHeight: number
  rpiCameraHFlip: boolean
  rpiCameraVFlip: boolean
  rpiCameraBrightness: number
  rpiCameraContrast: number
  rpiCameraSaturation: number
  rpiCameraSharpness: number
  rpiCameraExposure: string
  rpiCameraAWB: string
  rpiCameraDenoise: string
  rpiCameraShutter: number
  rpiCameraMetering: string
  rpiCameraGain: number
  rpiCameraEV: number
  rpiCameraROI: string
  rpiCameraTuningFile: string
  rpiCameraMode: string
  rpiCameraFPS: number
  rpiCameraIDRPeriod: number
  rpiCameraBitrate: number
  rpiCameraProfile: string
  rpiCameraLevel: string
  publishUser: string
  publishPass: string
  publishIPs: string[]
  readUser: string
  readPass: string
  readIPs: string[]
  runOnInit: string
  runOnInitRestart: boolean
  runOnDemand: string
  runOnDemandRestart: boolean
  runOnDemandStartTimeout: string
  runOnDemandCloseAfter: string
  runOnReady: string
  runOnReadyRestart: boolean
  runOnRead: string
  runOnReadRestart: boolean
}

export type TPathList = {
  items: {
    [x: string]: {
      confName: string
      conf: TAler9PathAddOrEdit
      source: {
        type: string
        id: string
      }
      sourceReady: true
      tracks: string[]
      bytesReceived: number
      readers: {
        type: string
        id: string
      }[]
    }
  }
}

export type TConnections = {
  items: {
    [x: string]: {
      created: string
      remoteAddr: string
      bytesReceived: number
      bytesSent: number
    }
  }
}

export type TRTSPSessions = {
  items: {
    [x: string]: {
      created: string
      remoteAddr: string
      bytesReceived: number
      bytesSent: number
      state: string
    }
  }
}
const Base64 = {
  // private property
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode: function (input: string) {
    let output = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0

    input = Base64._utf8_encode(input)

    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)

      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63

      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }

      output =
        output +
        Base64._keyStr.charAt(enc1) +
        Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) +
        Base64._keyStr.charAt(enc4)
    }

    return output
  },

  // private method for UTF-8 encoding
  _utf8_encode: function (string: string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''

    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n)

      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }

    return utftext
  },
}

export default class Aler9StreamServer {
  uri: string = ''
  auth?: { type: 'basic'; username: string; password: string }
  constructor(cfg: { uri: string; auth?: { type: 'basic'; username: string; password: string } }) {
    if (cfg.uri) this.uri = cfg.uri
    else throw new Error('uri is required')
    if (cfg.auth) this.auth = cfg.auth
  }

  async getConfig() {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const config = await fetch(this.uri + '/v1/config/get', {
      method: 'GET',
      headers,
    })
    const data: TAler9Config = await config.json()
    return data
  }
  async getPaths() {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const pathList = await fetch(this.uri + '/v1/paths/list', {
      method: 'GET',
      headers,
    })
    const data: TPathList = await pathList.json()
    return data
  }
  async addPath(pathName: string, path: Partial<TAler9PathAddOrEdit>) {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const addPathToServer = await fetch(this.uri + '/v1/config/paths/add/' + pathName, {
      method: 'POST',
      headers,
      body: JSON.stringify(path),
    })
    const data = await addPathToServer.json()
    return data
  }
  async editPath(pathName: string, path: Partial<TAler9PathAddOrEdit>) {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const editPathOnServer = await fetch(this.uri + '/v1/config/paths/edit/' + pathName, {
      method: 'POST',
      headers,
      body: JSON.stringify(path),
    })
    const data = await editPathOnServer.json()
    return data
  }
  async deletePath(pathName: string) {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const deletePathFromServer = await fetch(this.uri + '/v1/config/paths/remove/' + pathName, {
      method: 'POST',
      headers,
    })
    const data = await deletePathFromServer.json()
    return data
  }
  async getRtspConnections() {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const rtspConnections = await fetch(this.uri + '/v1/rtspconns/list', {
      method: 'GET',
      headers,
    })
    const data: TConnections = await rtspConnections.json()
    return data
  }

  async getRtspSessions() {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const rtspSessions = await fetch(this.uri + '/v1/rtspsessions/list', {
      method: 'GET',
      headers,
    })
    const data: TRTSPSessions = await rtspSessions.json()
    return data
  }
  async getWebrtcConnections() {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/list', {
      method: 'GET',
      headers,
    })
    const data: TConnections = await webrtcConnections.json()
    return data
  }
  async kickRtspSession(kick_id: string) {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const webrtcConnections = await fetch(this.uri + '/v1/rtspsessions/kick/' + kick_id, {
      method: 'POST',
      headers,
    })
    const data = await webrtcConnections.json()
    return data
  }
  async kickWebrtcConnection(kick_id: string) {
    const headers: any = {
      'Content-Type': 'application/json',
    }
    if (this.auth) headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password)
    const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/kick/' + kick_id, {
      method: 'POST',
      headers,
    })
    const data = await webrtcConnections.json()
    return data
  }
}
