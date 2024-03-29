export const importUtils = {
    css: (filePath: string) => {
        let tmp = document.createElement("link");

        tmp.rel = "stylesheet";
        tmp.type = "text/css";
        tmp.href = filePath;
        
        document.head.appendChild(tmp);
    },

    js: (filePath: string, defer: boolean, module: boolean, async: boolean) => {
        let tmp = document.createElement("script");

        tmp.src = filePath;
        tmp.defer = defer;
        if (module) tmp.type = "module";
        tmp.async = async;

        document.head.appendChild(tmp);
    }
}

export const isClass = (c: any) => {
    return typeof c === "function" && Object.getOwnPropertyDescriptor(c, "prototype")?.writable === false;
}