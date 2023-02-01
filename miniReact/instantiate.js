import DomComponent from "./domComponent";

export function instantiate(element) {
    console.log('🔥', element);

    if (typeof element.type === 'string') {
        return new DomComponent(element);
    }

    return null;
}