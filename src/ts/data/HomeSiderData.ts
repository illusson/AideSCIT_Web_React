export class HomeSiderData {
    public readonly icon: string;
    public readonly title: string;
    public readonly key: string;
    public readonly child: Array<HomeSiderChildData>;
    public readonly path: string;

    constructor(image: string, title: string, key: string, child: Array<HomeSiderChildData>, path: string) {
        this.icon = image;
        this.title = title;
        this.key = key;
        this.child = child;
        this.path = path;
    }
}

export class HomeSiderChildData {
    public readonly title: string;
    public readonly key: string;
    public readonly path: string;

    constructor(title: string, key: string, path: any) {
        this.title = title;
        this.key = key;
        this.path = path;
    }
}