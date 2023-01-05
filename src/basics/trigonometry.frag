#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

void main() {
    vec2 normalized_canvas = gl_FragCoord.xy/u_resolution;
    vec3 background_color  = vec3(0.1, 0.45, 0.92);
    gl_FragColor = vec4(background_color, 1.0); 
}