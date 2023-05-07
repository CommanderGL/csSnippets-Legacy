import { ScarOptions, CancelType } from "./index.ts";

interface LinkOptions extends ScarOptions {
    props?: {
        url: string,
        newtab?: boolean
    }
}

export function Link(options: LinkOptions, cancel: CancelType) {
    let link_elem = document.createElement("a");

    link_elem.href = <string>options.props?.url;
    if (options.props?.newtab) link_elem.target = "_blank"

    link_elem.textContent = <string>options.text;
    if (options.html != null) link_elem.innerHTML = <string>options.html;

    return link_elem;
}