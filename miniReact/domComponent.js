export default class DomComponent {
  constructor(element) {
    this.tag = element.type;
  }

  mount() {
    this.createElement();

    return this.node;
  }

  createElement() {
    this.node = document.createElement(this.tag);
  }
}
