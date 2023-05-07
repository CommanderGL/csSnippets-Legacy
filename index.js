export default class Scar {
    element = document.createElement("div");
    children = [];
    #root = document.body;
    constructor(options) {
        let cancelChildren = false;
        let cancelProps = false;
        if (options.root != null) {
            if (options.root instanceof Scar) {
                this.#root = options.root.element;
            }
            else {
                this.#root = options.root;
            }
        }
        else {
            console.warn("You did not provide a root element for your Scar! Will be using body (may conflict with extensions.) -> " + options.tag);
        }
        if (typeof options.tag == "function") {
            this.element = options.tag(options, {
                children: () => { cancelChildren = true; },
                props: () => { cancelProps = true; }
            });
            this.#root.appendChild(this.element);
        }
        else {
            this.element = document.createElement(options.tag);
        }
        if (options.props != null && !cancelProps) {
            Object.entries(options.props).forEach(([key, value]) => {
                this.element.setAttribute(key, value);
            });
        }
        if (options.children != null && !cancelChildren) {
            this.addChildren(options.children);
        }
        if (options.text != null && !(typeof options.tag == "function"))
            this.text = options.text;
        if (options.html != null && !(typeof options.tag == "function"))
            this.html = options.html;
        this.#root.appendChild(this.element);
    }
    get root() {
        return this.#root;
    }
    set root(v) {
        this.element.remove();
        if (v instanceof Scar) {
            this.#root = v.element;
        }
        else {
            this.#root = v;
        }
        this.#root.appendChild(this.element);
    }
    set text(v) {
        if (v == null) {
            this.element.textContent = "";
            return;
        }
        this.element.textContent = String(v);
    }
    get text() {
        return this.element.textContent;
    }
    set html(v) {
        if (v == null) {
            this.element.innerHTML = "";
            return;
        }
        this.element.innerHTML = String(v);
    }
    get html() {
        return this.element.innerHTML;
    }
    addEvent(event, cb) {
        this.element.addEventListener(event, cb);
    }
    addChild(child) {
        if (child instanceof Scar) {
            child.#root = this.element;
            this.children.push(child);
            this.element.appendChild(child.element);
        }
        else {
            let tmpScar = new Scar(child);
            tmpScar.#root = this.element;
            this.children.push(tmpScar);
            this.element.appendChild(tmpScar.element);
        }
    }
    addChildren(children) {
        children.forEach(child => {
            this.addChild(child);
        });
    }
    setProp(key, value) {
        this.element.setAttribute(key, value);
    }
    setProps(props) {
        Object.entries(props).forEach(([key, value]) => this.setProp(key, value));
    }
    setChildren(children) {
        this.html = null;
        this.addChildren(children);
    }
}
