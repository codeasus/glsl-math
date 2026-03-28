#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

vec3 color_bg = vec3(1.0);
vec3 circle_color = vec3(0.0, 0.0, 0.0);
float circle_radius = 0.05;
float speed = 1.0;

void circle(float radius, vec2 pos, vec2 view) {
    gl_FragColor = vec4(color_bg, 1.0);
    float aspect_ratio = u_resolution.x / u_resolution.y;
    float circle_radius = sqrt(pow((view.x * aspect_ratio - pos.x * aspect_ratio), 2.0) + pow((view.y - pos.y), 2.0));   
    if(circle_radius <= radius) {
        gl_FragColor = vec4(circle_color, 1.0);
    }
}

void main() {
    vec2 normalized_view = gl_FragCoord.xy/u_resolution;
    vec2 normalized_mouse = u_mouse.xy/u_resolution;

    vec2 circle_position = vec2(0.5, 0.5);

    float min_x = circle_radius;
    float max_x = 1.0 - circle_radius;
    float range = max_x - min_x;

    float bounce_factor =  abs(fract(u_time * speed / 7.0) * 2.0 - 1.0);

    circle_position.x = min_x + (bounce_factor * range);

    circle(circle_radius, circle_position, normalized_view);
}