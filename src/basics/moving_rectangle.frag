#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

vec4 rectangle(vec2 ref_canvas, vec2 pos, vec2 scale);

//TODO: Aspect ratio is still an issue, should check it later
void main() {
    vec2 normalized_canvas    = gl_FragCoord.xy/u_resolution;
    vec2 normalized_mouse_pos = u_mouse.xy/u_resolution;

    gl_FragColor              = rectangle(normalized_canvas, normalized_mouse_pos, vec2(0.2, 0.2));
}

vec4 rectangle(vec2 ref_canvas, vec2 pos, vec2 scale) {
    bool w = ref_canvas.x > pos.x-scale.x/2.0 && ref_canvas.x<pos.x+scale.x/2.0;
    bool h = ref_canvas.y > pos.y-scale.y/2.0 && ref_canvas.y<pos.y+scale.y/2.0;
    return vec4(vec3(!(w && h)), 1.0);
}