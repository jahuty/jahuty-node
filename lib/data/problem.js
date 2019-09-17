module.exports = class Problem
{
    constructor(status, type, detail) {
        this.status = status;
        this.type   = type;
        this.detail = detail;
    }

    static from(payload) {
        if (!('status' in payload)) {
            throw new Error("Missing 'status' key");
        }

        if (!('type' in payload)) {
            throw new Error("Missing 'type' key");
        }

        if (!('detail' in payload)) {
            throw new Error("Missing 'detail' key");
        }

        return new Problem(payload.status, payload.type, payload.detail);
    }
}
