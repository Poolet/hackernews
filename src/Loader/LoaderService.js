class LoaderService {

    constructor() {
        this.loaderCache = new Set();
    }

    _register(loader) {
        this.loaderCache.add(loader);
    }

    _unregister(loaderToRemove) {
        this.loaderCache.forEach(loader => {
            if (loader === loaderToRemove) {
                this.loaderCache.delete(loader);
            }
        });
    }

    _unregisterGroup(loaderGroup) {
        this.loaderCache.forEach(loader => {
            if (loader.group === loaderGroup) {
                this.loaderCache.delete(loader);
            }
        });
    }

    _unregisterAll() {
        this.loaderCache.clear();
    }

    show(loaderName) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                loader.show = true;
            }
        });
    }

    hide(loaderName) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                loader.show = false;
            }
        });
    }

    showGroup(loaderGroup) {
        this.loaderCache.forEach(loader => {
            if (loader.group === loaderGroup) {
                loader.show = true;
            }
        });
    }

    hideGroup(loaderGroup) {
        this.loaderCache.forEach(loader => {
            if (loader.group === loaderGroup) {
                loader.show = false;
            }
        });
    }

    showAll() {
        this.loaderCache.forEach(loader => loader.show = true);
    }

    hideAll() {
        this.loaderCache.forEach(loader => loader.show = false);
    }

    isShowing(loaderName) {
        let showing;
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                showing = loader.show;
            }
        });
        return showing;
    }
}

const loaderService = new LoaderService();
export { loaderService }