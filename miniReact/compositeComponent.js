import { instanceMap } from "./instanceMap";
import { instantiate } from "./instantiate";

export default class CompositeComponent {
  constructor(element) {
    this.component = element.type;
    this.props = element.props;
  }

  execHook(name, ...args) {
    if (this.instance?.[name]) {
        this.instance[name].call(this.instance, ...args);
    }
  }

  mount () {
    this.instantiate();
    this.execHook('componentWillMount');
    this.render();

    return this.toMount();
  }

  unmount() {
    this.execHook('componentWillUnmount');
    this.renderedComponent?.unmount();
  }

  toMount() {
    let result = null;

    if (this.renderedElement) {
      this.renderedComponent = instantiate(this.renderedElement);
      result = this.renderedComponent.mount();
    }

    this.execHook('componentDidMount');
    return result;
  }

  render () {
    if (this.instance) {
      this.renderedElement = this.instance.render();
    } else {
      this.renderedElement = this.component(this.props);
    }

    console.log('💧💧', this.renderedElement)
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

  receive(nextElement) {
    this.element = nextElement;
    this.component = nextElement.type;
    this.props = nextElement.props;
    this.instance.props = this.props; // 更新组件的props

    this.update({}); // 递归执行子组件更新
  }

  update(state) {
    
    // 更新state
    this.instance.state = {
        ...this.instance.state,
        ...state
    }

    const preElememt = this.renderedElement;
    this.render();
    const nextElement = this.renderedElement;

    if (preElememt.type === nextElement.type) {
      this.renderedComponent.receive(nextElement);
  
    } else {
      // 找到当前叶子节点Dom，并销毁重建 
      const hostNode = this.getHostNode();
      this.unmount();
      const newNode = this.toMount();
      // 替换DOM节点
      hostNode.parentNode.replaceChild(newNode, hostNode);
      console.log('🍊', hostNode);
      console.log('🍊🍊', newNode);
    }
  }
}