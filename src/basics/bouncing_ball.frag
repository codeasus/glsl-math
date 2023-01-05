#ifdef GL_ES
precision highp float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

vec2 center = vec2(0.5, 0.5);

vec4 circle(vec2 ref_canvas, vec2 pos, float radius);

void main() {
    vec2 normalized_canvas    = gl_FragCoord.xy/u_resolution;
    vec2 normalized_mouse_pos = u_mouse.xy/u_resolution;

    gl_FragColor              = circle(normalized_canvas, center*u_time*0.005, 0.05);
}


vec4 circle(vec2 ref_canvas, vec2 pos, float radius) {
    float _radius = sqrt(pow(ref_canvas.x-pos.x, 2.0)+pow(ref_canvas.y-pos.y, 2.0));

    return vec4(vec3(_radius >= radius), 1.0);
}