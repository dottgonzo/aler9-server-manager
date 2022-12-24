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

export default class Aler9StreamServer {
  uri: string = ''
  constructor(cfg: { uri: string }) {
    if (cfg.uri) this.uri = cfg.uri
    else throw new Error('uri is required')
  }

  async getConfig() {
    const config = await fetch(this.uri + '/v1/config/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TAler9Config = await config.json()
    return data
  }
  async getPaths() {
    const pathList = await fetch(this.uri + '/v1/paths/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TPathList = await pathList.json()
    return data
  }
  async addPath(pathName: string, path: TAler9PathAddOrEdit) {
    const addPathToServer = await fetch(this.uri + '/v1/config/paths/add/' + pathName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(path),
    })
    const data = await addPathToServer.json()
    return data
  }
  async editPath(pathName: string, path: TAler9PathAddOrEdit) {
    const editPathOnServer = await fetch(this.uri + '/v1/config/paths/edit/' + pathName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(path),
    })
    const data = await editPathOnServer.json()
    return data
  }
  async deletePath(pathName: string) {
    const deletePathFromServer = await fetch(this.uri + '/v1/config/paths/remove/' + pathName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await deletePathFromServer.json()
    return data
  }
  async getRtspConnections() {
    const rtspConnections = await fetch(this.uri + '/v1/rtspconns/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TConnections = await rtspConnections.json()
    return data
  }

  async getRtspSessions() {
    const rtspSessions = await fetch(this.uri + '/v1/rtspsessions/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TRTSPSessions = await rtspSessions.json()
    return data
  }
  async getWebrtcConnections() {
    const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TConnections = await webrtcConnections.json()
    return data
  }
  async kickRtspSession(kick_id: string) {
    const webrtcConnections = await fetch(this.uri + '/v1/rtspsessions/kick/' + kick_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await webrtcConnections.json()
    return data
  }
  async kickWebrtcConnection(kick_id: string) {
    const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/kick/' + kick_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await webrtcConnections.json()
    return data
  }
}
