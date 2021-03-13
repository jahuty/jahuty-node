/**
 * A snippet's render.
 */
export default class Render {
  constructor({ content, snippetId }) {
    this.content = content;
    this.snippetId = snippetId;
  }

  static from(payload) {
    if (!('content' in payload)) {
      throw new Error("Payload missing 'content' key");
    }

    if (!('snippet_id' in payload)) {
      throw new Error("Payload missing 'snippet_id' key");
    }

    return new Render({
      content: payload.content,
      snippetId: payload.snippet_id,
    });
  }

  toString() {
    return `${this.content}`;
  }
}
