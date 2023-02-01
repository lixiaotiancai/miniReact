import { instantiate } from "./instantiate";

export default class CompositeComponent {
  constructor(element) {
    this.component = element.type;
  }

  mount () {
    this.render();

    this.renderedComponent = instantiate(this.renderedElement);

    return this.renderedComponent.mount();
  }

  render () {
    this.renderedElement = this.component();
  }
}