import { instantiate } from "./instantiate";

export default class CompositeComponent {
  constructor(element) {
    this.component = element.type;
  }

  mount () {
    this.instantiate();
    this.render();

    this.renderedComponent = instantiate(this.renderedElement);

    return this.renderedComponent.mount();
  }

  render () {
    if (this.instance) {
        this.renderedElement = this.instance.render();
      } else {
        this.renderedElement = this.component();
      }
  }

  instantiate() {
    if (this.component.isClassComponent) {
      this.instance = new this.component();
    } else {
      this.instance = null; // 函数组件不需要实例化
    }
  }
}