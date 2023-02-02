import { instanceMap } from "./instanceMap";
import { instantiate } from "./instantiate";

export default class CompositeComponent {
  constructor(element) {
    this.component = element.type;
    this.props = element.props;
  }

  mount () {
    this.instantiate();
    this.render();

    return this.toMount();
  }

  unmount() {
    this.renderedComponent?.unmount();
  }

  toMount() {
    let result = null;

    if (this.renderedElement) {
      this.renderedComponent = instantiate(this.renderedElement);
      result = this.renderedComponent.mount();
    }

    return result;
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

      instanceMap[this.instance] = this;

    } else {
      this.instance = null; // 函数组件不需要实例化
    }
  }

  getHostNode() {
    return this.renderedComponent?.getHostNode();
  }

  update(state) {
    
    // 更新state
    this.instance.state = {
        ...this.instance.state,
        ...state
    }

    // 找到当前叶子节点Dom，并销毁重建 
    const hostNode = this.getHostNode();
    
    this.render();
    console.log(this.renderedElement)
  }
}