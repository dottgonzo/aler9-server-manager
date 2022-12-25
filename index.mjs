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
    async getConfig() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const config = await fetch(this.uri + '/v1/config/get', {
            method: 'GET',
            headers,
        });
        const data = await config.json();
        return data;
    }
    async getPaths() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const pathList = await fetch(this.uri + '/v1/paths/list', {
            method: 'GET',
            headers,
        });
        const data = await pathList.json();
        return data;
    }
    async addPath(pathName, path) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const addPathToServer = await fetch(this.uri + '/v1/config/paths/add/' + pathName, {
            method: 'POST',
            headers,
            body: JSON.stringify(path),
        });
        const data = await addPathToServer.json();
        return data;
    }
    async editPath(pathName, path) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const editPathOnServer = await fetch(this.uri + '/v1/config/paths/edit/' + pathName, {
            method: 'POST',
            headers,
            body: JSON.stringify(path),
        });
        const data = await editPathOnServer.json();
        return data;
    }
    async deletePath(pathName) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const deletePathFromServer = await fetch(this.uri + '/v1/config/paths/remove/' + pathName, {
            method: 'POST',
            headers,
        });
        const data = await deletePathFromServer.json();
        return data;
    }
    async getRtspConnections() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const rtspConnections = await fetch(this.uri + '/v1/rtspconns/list', {
            method: 'GET',
            headers,
        });
        const data = await rtspConnections.json();
        return data;
    }
    async getRtspSessions() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const rtspSessions = await fetch(this.uri + '/v1/rtspsessions/list', {
            method: 'GET',
            headers,
        });
        const data = await rtspSessions.json();
        return data;
    }
    async getWebrtcConnections() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/list', {
            method: 'GET',
            headers,
        });
        const data = await webrtcConnections.json();
        return data;
    }
    async kickRtspSession(kick_id) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const webrtcConnections = await fetch(this.uri + '/v1/rtspsessions/kick/' + kick_id, {
            method: 'POST',
            headers,
        });
        const data = await webrtcConnections.json();
        return data;
    }
    async kickWebrtcConnection(kick_id) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.auth)
            headers.Authorization = 'Basic ' + Buffer.from(this.auth?.username + ':' + this.auth?.password).toString('base64');
        const webrtcConnections = await fetch(this.uri + '/v1/webrtcconns/kick/' + kick_id, {
            method: 'POST',
            headers,
        });
        const data = await webrtcConnections.json();
        return data;
    }
}
//# sourceMappingURL=index.mjs.map