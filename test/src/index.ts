import Scar from '../../index.ts';
import { Link, Select } from '../../components.ts';
import { importUtils } from '../../utils.ts';

const app = <HTMLElement>document.getElementById("app");

const select = new Scar({
    tag: Select,
    root: app,
    props: {
        options: [
            "Coding",
            "Is",
            "Cool"
        ]
    }
});

const autoChangeWrapper = new Scar({ tag: "div", root: app });
autoChangeWrapper.element.style.display = "flex";
autoChangeWrapper.element.style.flexDirection = "row";
const autoChange = new Scar({ tag: "input", root: autoChangeWrapper, props: { type: "checkbox" } });
new Scar({ tag: "h3", root: autoChangeWrapper, text: "Auto Change" });

const moveBtn = new Scar({ tag: "button", root: app, text: "Swap" });
const setBtn = new Scar({ tag: "button", root: app, text: "Set" });

const txt = new Scar({ tag: "h1", root: app, text: "Coding" });
const link = new Scar({
    tag: Link,
    root: app,
    props: {
        url: "https://example.com",
        newtab: true
    }
});

moveBtn.addEvent("click", () => {
    if (txt.root == app) {
        txt.root = link;
    } else {
        txt.root = app;
    }
});

setBtn.addEvent("click", () => {
    if (select.component.selected == null) {
        alert("You Must Select Something!");
        return;
    }

    txt.text = select.component.selected;
});

select.component.onChange(() => {
    if ((<HTMLInputElement>autoChange.element).checked) {
        if (select.component.selected == null) {
            alert("You Must Select Something!");
            return;
        }
    
        txt.text = select.component.selected;
    }
});


importUtils.css('./components.css');