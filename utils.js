export const importUtils = {
    css: (filePath) => {
        let tmp = document.createElement("link");
        tmp.rel = "stylesheet";
        tmp.type = "text/css";
        tmp.href = filePath;
        document.head.appendChild(tmp);
    },
    js: (filePath, defer, module, async) => {
        let tmp = document.createElement("script");
        tmp.src = filePath;
        tmp.defer = defer;
        if (module)
            tmp.type = "module";
        tmp.async = async;
        document.head.appendChild(tmp);
    }
};
