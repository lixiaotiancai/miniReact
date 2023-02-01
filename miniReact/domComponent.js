export default class DomComponent {

  mount() {
    this.createElement();
    return this.node;
  }

  createElement() {
    this.node = document.createElement(this.tag);
  }
}
