declare module 'document-offset' {
    const offset: (el: HTMLElement) => undefined | { top: number, left: number };
    export = offset;
}
