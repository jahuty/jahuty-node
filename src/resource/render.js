/**
 * A snippet's render.
 */
export default class Render {
  constructor({ content }) {
    this.content = content;
  }

  static from(payload) {
    if (!('content' in payload)) {
      throw new Error("Payload missing 'content' key");
    }

    return new Render({ content: payload.content });
  }

  toString() {
    return `${this.content}`;
  }
}
