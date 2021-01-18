/**
 * A snippet's render.
 */
export default class Render {
  constructor({ content }) {
    this.content = content;
  }

  toString() {
    return `${this.content}`;
  }
}
