#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec4 rotated_wave(vec2 uv, float angle, float frequency, float amplitude);

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution; 

    float aspect_ratio = u_resolution.x / u_resolution.y;

    vec2 uv_corrected = vec2((uv.x - 0.5) * aspect_ratio, uv.y - 0.5);

    vec4 c1 = vec4(1.0, 0.9, 0.0, 1.0);
    vec4 c2 = vec4(1.0, 0.0, 0.0, 1.0);

    float rotation_angle = 135.0;
    float amplitude = .07;
    float frequency = 20.0;

    gl_FragColor = rotated_wave(uv_corrected, rotation_angle, frequency, amplitude);

}


vec4 rotated_wave(vec2 uv, float angle, float frequency, float amplitude) {
    float rad_angle = radians(angle);

    float si_n = sin(rad_angle);
    float co_s = cos(rad_angle);

    float y = uv.y * co_s + uv.x * si_n;
    float x = uv.x * co_s - uv.y * si_n;

    float rotated_wave = sin(x * frequency) * amplitude;

    if(y < rotated_wave) {
        return vec4(1.0);
    } else {
        return vec4(1.0, 0.0, 0.0, 1.0);
    }
}