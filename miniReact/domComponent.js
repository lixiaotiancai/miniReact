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
    this.childComponents.forEach(child => {
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
}
