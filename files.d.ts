declare module "*.obj";
declare module "*.jpeg";

declare module "glslify" {
    function glsl(shader?: TemplateStringsArray): string;
    export = glsl;
}
