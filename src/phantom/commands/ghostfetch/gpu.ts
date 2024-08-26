let canvas = document.createElement("canvas");
let gl: WebGLRenderingContext | null = null;
let debugInfo: any = null;
let vendor: string | null = null;
let renderer: string | null = null;

try {
  gl =
    (canvas.getContext("webgl") as WebGLRenderingContext) ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
} catch (e) {}

if (gl) {
  debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  }
}

export { debugInfo, vendor, renderer };
