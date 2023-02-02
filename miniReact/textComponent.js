export default class TextComponent {
    constructor(element) {
      this.text = element;
    }
  
    mount() {
      this.createElement();
  
      return this.node;
    }

    unmount() {
      this.node = null;
    }

    getHostNode() {
      return this.node;
    }
  
    createElement() {
      this.node = document.createTextNode(this.text);
    }

    receive(nextElement) {
      this.text = nextElement;
      // 直接更改文本内容
      this.node.textContent = this.text;
    }
  }