import Scar from '../../index.ts';
import { Link } from '../../components.ts';

const app = <HTMLElement>document.getElementById("app");

const btn = new Scar({ tag: "button", root: app, text: "Toggle" });
const moveBtn = new Scar({ tag: "button", root: app, text: "Swap" });

const txt = new Scar({ tag: "h1", root: app, text: "true" });
const link = new Scar({
    tag: Link,
    root: app,
    props: {
        url: "https://example.com",
        newtab: true
    }
});

btn.addEvent("click", () => {
    txt.text = !JSON.parse(<string>txt.text);
});

moveBtn.addEvent("click", () => {
    if (txt.root == app) {
        txt.root = link;
    } else {
        txt.root = app;
    }
});