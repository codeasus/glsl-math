#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec4 diagonal_split(vec2 uv);

vec2  hash(vec2 p);

float fbm(vec2 p);
float perlin(vec2 p);
float normalized_unit_time(float time);

vec4 COLOR_GRADIENT_LAYER_0 = vec4(0.851, 0.8745, 0.9882, 1.0);
vec4 COLOR_GRADIENT_LAYER_1 = vec4(0.6588, 0.6667, 0.8157, 1.0);
vec4 COLOR_GRADIENT_LAYER_2 = vec4(0.4275, 0.4353, 0.5804, 1.0);

// void main() {
//     vec2 uv = gl_FragCoord.xy / u_resolution;

//     float noise = fbm(uv);

//     float layer1Edge = smoothstep(0.1, 0.15, noise);
//     float layer2Edge = smoothstep(0.96, 0.99, noise);

//     vec4 color = mix(COLOR_GRADIENT_LAYER_0, COLOR_GRADIENT_LAYER_1, layer1Edge);
//     gl_FragColor = mix(color, COLOR_GRADIENT_LAYER_2, layer2Edge);
// }

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float noise = fbm(uv);

    vec4 color = COLOR_GRADIENT_LAYER_0;

    float mask1 = smoothstep(0.05, 0.3, noise);
    vec4 layer1 = mix(COLOR_GRADIENT_LAYER_1 * 0.9, COLOR_GRADIENT_LAYER_1, mask1);
    
    float mask2 = smoothstep(0.65, 0.95, noise);
    vec4 layer2 = mix(COLOR_GRADIENT_LAYER_2 * 0.9, COLOR_GRADIENT_LAYER_2, mask2);

    color = mix(color, layer1, step(0.05, noise));
    color = mix(color, layer2, step(0.65, noise));

    gl_FragColor = color;
}

float fbm(vec2 p) {
    float value = 0.9;
    float amplitude = 8.0;
    float frequency = 5.0;
    float lacunarity = 0.0;
    float gain = 0.0;

    for (int i = 0; i < 2; i++) {
        value += amplitude * perlin(p * frequency);
        p *= lacunarity;
        amplitude *= gain;
    }
    return value;
}

float perlin(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float normalized_unit_time() {
    return fract(u_time * 0.5) * 2.0 - 1.0;
}

vec4 diagonal_split(vec2 uv) { 
    if(uv.y / uv.x < uv.x/uv.y) { 
        return vec4(0.0, 0.0, 0.0, 1.0);
    }
    return vec4(1.0, 1.0, 1.0, 1.0);
}