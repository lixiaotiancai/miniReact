import { instanceMap } from "./instanceMap";

export class Component {
    static isClassComponent = true;

    constructor(props) {
        this.props = props;
    }

    setState(state) {
        const controller = instanceMap[this];
        console.log('🍎', controller)
        controller.update(state);
    }
}