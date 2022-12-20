"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aler9StreamServer {
    constructor(cfg) {
        this.uri = '';
        if (cfg.uri)
            this.uri = cfg.uri;
    }
    async getConfig() {
        const config = await fetch(this.uri + '/v1/config/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await config.json();
        return data;
    }
    async addPath(pathName, path) {
        const addPathToServer = await fetch(this.uri + '/v1/config/paths/add/' + pathName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(path),
        });
        const data = await addPathToServer.json();
        return data;
    }
    async editPath(pathName, path) {
        const addPathToServer = await fetch(this.uri + '/v1/config/paths/edit/' + pathName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(path),
        });
        const data = await addPathToServer.json();
        return data;
    }
    async deletePath(pathName) {
        const addPathToServer = await fetch(this.uri + '/v1/config/paths/remove/' + pathName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await addPathToServer.json();
        return data;
    }
}
exports.default = Aler9StreamServer;
//# sourceMappingURL=index.js.map