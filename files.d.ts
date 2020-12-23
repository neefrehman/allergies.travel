declare module "*.obj";
declare module "*.jpeg";

declare module "react-spring/three";

declare module "glslify" {
    function glsl(shader?: TemplateStringsArray): string;
    export = glsl;
}
