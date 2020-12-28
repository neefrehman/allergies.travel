declare module "*.obj";
declare module "*.jpeg";

declare module "react-spring/three";

declare module "glslify" {
    function glsl(shader?: TemplateStringsArray): string;
    export = glsl;
}

declare namespace Intl {
    class DisplayNames {
        constructor(locales: string | string[], options: { type: string });
        public of: (code: string) => string;
    }
}
