const Base64 = {
    // private property
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    // public method for encoding
    encode: function (input) {
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output =
                output +
                    Base64._keyStr.charAt(enc1) +
                    Base64._keyStr.charAt(enc2) +
                    Base64._keyStr.charAt(enc3) +
                    Base64._keyStr.charAt(enc4);
        }
        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, '\n');
        let utftext = '';
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
};
export default class Aler9StreamServer {
    constructor(cfg) {
        this.uri = '';
        if (cfg.uri)
            this.uri = cfg.uri;
        else
            throw new Error('uri is required');
        if (cfg.auth)
            this.auth = cfg.auth;
    }
    async setConfig(config) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/config/set';
        const setConfig = await fetch(uri, {
            method: 'POST',
            headers,
            body: JSON.stringify(config),
        });
        if (!setConfig.ok) {
            console.error('Error setting config from ' + uri, setConfig.statusText);
            throw new Error("Couldn't set config from " + uri);
        }
    }
    async getConfig() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/config/global/get';
        const config = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!config.ok) {
            console.error('Error getting config from ' + uri, config.statusText);
            throw new Error("Couldn't get config from " + uri);
        }
        const data = await config.json();
        return data;
    }
    async getPaths() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/paths/list';
        const pathList = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!pathList.ok) {
            console.error('Error getting path list from ' + uri, pathList.statusText);
            throw new Error("Couldn't get path list from " + uri);
        }
        const data = await pathList.json();
        return data;
    }
    async getPathsConfigs() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/config/paths/list';
        const pathList = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!pathList.ok) {
            console.error('Error getting path list from ' + uri, pathList.statusText);
            throw new Error("Couldn't get path list from " + uri);
        }
        const data = await pathList.json();
        return data;
    }
    async addPath(pathName, path) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const addPathToServer = await fetch(this.uri + '/v3/config/paths/add/' + pathName, {
            method: 'POST',
            headers,
            body: JSON.stringify(path),
        });
        if (addPathToServer.ok)
            return true;
        else
            throw new Error("Couldn't add path " + addPathToServer.statusText);
    }
    async editPath(pathName, path) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const editPathOnServer = await fetch(this.uri + '/v3/config/paths/edit/' + pathName, {
            method: 'POST',
            headers,
            body: JSON.stringify(path),
        });
        if (editPathOnServer.ok)
            return true;
        else
            throw new Error("Couldn't editPathOnServer " + editPathOnServer.statusText);
    }
    async deletePath(pathName) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const deletePathFromServer = await fetch(this.uri + '/v3/config/paths/delete/' + pathName, {
            method: 'DELETE',
            headers,
        });
        if (deletePathFromServer.ok)
            return true;
        else
            throw new Error("Couldn't add path " + deletePathFromServer.statusText);
    }
    async getRtspConnections() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/rtspconns/list';
        const rtspConnections = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!rtspConnections.ok) {
            console.error('Error rtspConnections from ' + uri, rtspConnections.statusText);
            throw new Error('Error rtspConnections from ' + uri);
        }
        const data = await rtspConnections.json();
        return data;
    }
    async getRtspSessions() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/rtspsessions/list';
        const rtspSessions = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!rtspSessions.ok) {
            console.error('Error rtspSessions from ' + uri, rtspSessions.statusText);
            throw new Error('Error rtspSessions from ' + uri);
        }
        const data = await rtspSessions.json();
        return data;
    }
    async getWebrtcConnections() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const uri = this.uri + '/v3/webrtcconns/list';
        const webrtcConnections = await fetch(uri, {
            method: 'GET',
            headers,
        });
        if (!webrtcConnections.ok) {
            console.error('Error webrtcConnections from ' + uri, webrtcConnections.statusText);
            throw new Error('Error webrtcConnections from ' + uri);
        }
        const data = await webrtcConnections.json();
        return data;
    }
    async kickRtspSession(kick_id) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const kickConn = await fetch(this.uri + '/v3/rtspsessions/kick/' + kick_id, {
            method: 'POST',
            headers,
        });
        if (kickConn.ok)
            return true;
        else
            throw new Error("Couldn't kickConn " + kickConn.statusText);
    }
    async kickWebrtcConnection(kick_id) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Base64.encode(this.auth?.username + ':' + this.auth?.password);
        const kickWebrtcConn = await fetch(this.uri + '/v3/webrtcconns/kick/' + kick_id, {
            method: 'POST',
            headers,
        });
        if (kickWebrtcConn.ok)
            return true;
        else
            throw new Error("Couldn't kickWebrtcConn " + kickWebrtcConn.statusText);
    }
}
//# sourceMappingURL=index.mjs.map