import { instantiate } from "./instantiate";

export default class DomComponent {
  constructor(element) {
    this.tag = element.type;
    this.props = element.props;
  }

  mount() {
    this.createElement();
    this.mountChildren();

    return this.node;
  }

  unmount() {
    this.childComponents.forEach((child) => {
      child.unmount();
    });

    this.node = null;
  }

  getHostNode() {
    return this.node;
  }

  createElement() {
    this.node = document.createElement(this.tag);
  }

  formatChildren(children) {
    children = children || [];

    if (!Array.isArray(children)) {
      children = [children];
    }

    return children;
  }

  mountChildren() {
    const children = this.formatChildren(this.props.children);

    const nodeList = [];
    const childComopnents = [];

    children.forEach((childElement) => {
      const component = instantiate(childElement);
      if (component) {
        childComopnents.push(component);
      }

      const node = component.mount();

      if (node) {
        nodeList.push(node);
      }
    });

    this.childComponents = childComopnents;

    // 挂载子节点
    nodeList.forEach((node) => {
      this.node.appendChild(node);
    });
  }

  receive(nextElement) {
    this.updateChildren(nextElement.props);

    this.element = nextElement;
    this.tag = nextElement.type;
    this.props = nextElement.props;
  }

  updateChildren(nextProps) {
    const prevChildren = this.formatChildren(this.props.children);
    const nextChildren = this.formatChildren(nextProps.children);

    for (let i = 0; i < nextChildren.length; i++) {
      const prevChild = prevChildren[i];
      const nextChild = nextChildren[i];
      const prevComponent = this.childComponents[i];
      const nextComponent = instantiate(nextChild);

      if (prevChild == null) {
        // 旧的child不存在，说明是新增的场景
        this.node.appendChild(nextComponent.mount());
  
      } else if (prevChild.type === nextChild.type) {
        // 相同类型的元素，可以直接更新
        prevComponent.receive(nextChild);
    
      } else {
        // 销毁重建
        const prevNode = prevComponent.getHostNode();
        prevComponent.unmount();
        this.node.replaceChild(nextComponent.mount(), prevNode);
      }
    }

    for (let i = nextChildren.length; i < prevChildren.length; i++) {
      // next里面不存在的，要删除
      const prevComponent = this.childComponents[i];
      const prevNode = prevComponent.getHostNode();
      prevComponent.unmount();
      this.node.removeChild(prevNode);
    }
  }
}
