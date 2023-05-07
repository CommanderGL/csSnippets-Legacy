export function Link(options, cancel) {
    let link_elem = document.createElement("a");
    link_elem.href = options.props?.url;
    if (options.props?.newtab)
        link_elem.target = "_blank";
    link_elem.textContent = options.text;
    if (options.html != null)
        link_elem.innerHTML = options.html;
    return link_elem;
}
