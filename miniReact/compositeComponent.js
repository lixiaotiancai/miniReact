import { instantiate } from "./instantiate";

export default class CompositeComponent {
  constructor(element) {
    this.component = element.type;
    this.props = element.props;
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
        this.renderedElement = this.component(this.props);
      }
  }

  instantiate() {
    if (this.component.isClassComponent) {
      this.instance = new this.component(this.props);
    } else {
      this.instance = null; // 函数组件不需要实例化
    }
  }
}