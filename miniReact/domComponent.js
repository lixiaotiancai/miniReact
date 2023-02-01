export default class DomComponent {
  constructor(element) {
    this.element = element;
    this.tag = element.type;
    this.props = element.props;
  }

  mount() {
    this.createElement();

    return this.node;
  }

  createElement() {
    this.node = document.createElement(this.tag);
  }
}
