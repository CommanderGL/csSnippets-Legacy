import Scar, { ScarOptions, CancelType } from './index.ts';

interface LinkOptions extends ScarOptions {
    props?: {
        url: string,
        newtab?: boolean
    }
}

export function Link(options: LinkOptions, cancel: CancelType) {
    let link_elem = document.createElement("a");
    link_elem.classList.add("Link");

    link_elem.href = <string>options.props?.url;
    if (options.props?.newtab) link_elem.target = "_blank"

    link_elem.textContent = <string>options.text;
    if (options.html != null) link_elem.innerHTML = <string>options.html;

    return {
        element: link_elem
    };
}

interface SelectOptions extends ScarOptions {
    props?: {
        options: string[],
        multiselect?: boolean
    }
}

export class Select {
    open: boolean = false;
    selected: string | string[] | null = null;
    selected_elem: HTMLSpanElement | undefined;
    wrapper: HTMLDivElement;
    btn: HTMLButtonElement;
    options_wrapper: HTMLDivElement;
    #onChange: () => void = () => {};
    multiselect: boolean = false;

    constructor(options: SelectOptions, cancel: CancelType) {
        cancel.all();

        if (options.props?.multiselect) this.multiselect = true;

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("select-wrapper");

        this.btn = document.createElement("button");
        this.btn.textContent = "Select an option!";
        this.btn.classList.add("select-btn");
        this.wrapper.appendChild(this.btn);

        this.options_wrapper = document.createElement("div");
        this.options_wrapper.classList.add("select-options-wrapper");
        this.options_wrapper.style.display = "none";
        this.wrapper.appendChild(this.options_wrapper);

        options.props?.options.forEach(option => {
            let option_elem = document.createElement("span");
            option_elem.textContent = option;
            option_elem.tabIndex = 0;
            option_elem.role = "button";
            option_elem.classList.add("select-option");

            option_elem.addEventListener("keypress", e => {
                if (e.code == "Enter" || e.code == "Space") {
                    if (this.multiselect) {
                        option_elem.classList.toggle("select-option-selected");
                        if (!Array.isArray(this.selected)) this.selected = [];
                        if (this.selected.includes(option)) {
                            this.selected = this.selected.filter(o => o !== option);
                            return;
                        }
                        this.selected.push(option);
    
                        return;
                    }

                    option_elem.classList.add("select-option-selected");
                    this.selected = option;
                    if (this.selected_elem != null && this.selected_elem != option_elem) this.selected_elem.classList.remove("select-option-selected");
                    this.selected_elem = option_elem;
                    this.#onChange();
                }
            });

            option_elem.addEventListener("click", () => {
                if (this.multiselect) {
                    option_elem.classList.toggle("select-option-selected");
                    if (!Array.isArray(this.selected)) this.selected = [];
                    if (this.selected.includes(option)) {
                        this.selected = this.selected.filter(o => o !== option);
                        return;
                    }
                    this.selected.push(option);

                    return;
                }

                option_elem.classList.add("select-option-selected");
                this.selected = option;
                if (this.selected_elem != null && this.selected_elem != option_elem) this.selected_elem.classList.remove("select-option-selected");
                this.selected_elem = option_elem;
                this.#onChange();
            });

            this.options_wrapper.appendChild(option_elem);
        });

        this.btn.addEventListener("click", () => {
            this.open = !this.open;
            if (this.open) {
                this.options_wrapper.style.display = "flex";
                return;
            }
            this.options_wrapper.style.display = "none";
        });
    }

    get element() {
        return this.wrapper;
    }

    onChange(cb: () => void) {
        this.#onChange = cb;
    }
}