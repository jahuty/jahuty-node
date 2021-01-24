export default class SnippetContainer {
  constructor(element) {
    this.element = element;
  }

  static all() {
    const containers = [];

    const elements = document.querySelectorAll('[data-snippet-id]');

    elements.forEach((element) => {
      containers.push(new SnippetContainer(element));
    });

    return containers;
  }

  getSnippetId() {
    return +this.element.getAttribute('data-snippet-id');
  }

  setContent(content) {
    this.element.innerHTML = content;
  }
}
