module.exports = class Snippet
{
    constructor(id, content) {
        this.id      = id;
        this.content = content;
    }

    static from(payload) {
        if (!('id' in payload)) {
            throw new Error("Missing 'id' key");
        }

        if (!('content' in payload)) {
            throw new Error("Missing 'content' key");
        }

        return new Snippet(payload.id, payload.content);
    }

    toString() {
        return `${this.content}`;
    }
}
