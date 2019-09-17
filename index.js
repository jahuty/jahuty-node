'use strict'

const Get  = require('./lib/service/get');
const Load = require('./lib/service/load');

module.exports = class Snippet
{
    static get(id) {
        if (Snippet._key == undefined) {
            throw new Error("Key is undefined. Did you set it?");
        }

        if (Snippet._get == undefined) {
            Snippet._get = new Get(Snippet._key);
        }

        return Snippet._get(id);
    }

    static init() {
        if (Snippet._initialized) return;

        if (Snippet._key == undefined) {
            throw new Error("Key is undefined. Did you set it?");
        }

        if (Snippet._get == undefined) {
            Snippet._get = new Get(Snippet._key);
        }

        addEventListener("DOMContentLoaded", () => (new Load())());
        Snippet._initialized = true;
    }

    static set key(key) {
        Snippet._key = key;
    }

    static get VERSION() {
        return "0.1.0";
    }
}
