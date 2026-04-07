#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 wave(vec2 uv, float angle, float frequency, float amplitude);

// Rotating the SIN wave by just rotating the wave
void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution; 

    float aspect = u_resolution.x / u_resolution.y;

    vec2 uv_corrected = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    vec4 wave1_c1 = vec4(0.6784, 0.7804, 0.9137, 1.0);
    vec4 wave1_c2 = vec4(0.2196, 0.3608, 0.5725, 1.0);

    vec4 wave2_c1 = vec4(0.4392, 0.5647, 0.7333, 1.0);
    vec4 wave2_c2 = vec4(0.1216, 0.251, 0.4431, 1.0);

    vec2 wave_one = wave(uv_corrected, 135.0, 12.0, 0.05);

    vec2 wave_two = wave(uv_corrected, 135.0, 14.0, 0.03);  

    vec2 wave_three = wave(uv_corrected, 135.0, 16.0, 0.04);  

    vec2 wave_four = wave(uv_corrected, 135.0, 12.0, 0.04);  

    if(wave_one.x > wave_one.y + 0.4) {
        float blend_factor = mix(-0.5, -0.2, (uv_corrected.y - uv_corrected.x) * 5.5);    
        vec4 gradient_color = mix(wave1_c1, wave1_c2, blend_factor);
        gl_FragColor = gradient_color;
    }
    else if(wave_two.x > wave_two.y + 0.2){
        float blend_factor = mix(-0.5, -0.2, (uv_corrected.y - uv_corrected.x) * 5.5);    
        vec4 gradient_color = mix(wave2_c1, wave2_c2, blend_factor);
        gl_FragColor = gradient_color;
    }
    else if(wave_three.x < wave_three.y - 0.45) {
        float blend_factor = mix(-0.1, 0.3, (uv_corrected.x - uv_corrected.y) * 3.5);    
        vec4 gradient_color = mix(wave1_c1, wave1_c2, blend_factor);
        gl_FragColor = gradient_color;
    } 
    else if(wave_four.x < wave_four.y - 0.15) {
        float blend_factor = mix(-0.1, 0.5, (uv_corrected.x - uv_corrected.y) * 2.5);    
        vec4 gradient_color = mix(wave2_c1, wave2_c2, blend_factor);
        gl_FragColor = gradient_color;
    }
    else {
        vec3 color = vec3(0.5961, 0.7059, 0.8471);
        gl_FragColor = vec4(color, 1.0);
    }
}

vec2 wave(vec2 uv, float angle, float frequency, float amplitude) {
    float rad_angle = radians(angle);

    float si_n = sin(rad_angle);
    float co_s = cos(rad_angle);

    float y = uv.y * co_s + uv.x * si_n;
    float x = uv.x * co_s - uv.y * si_n;

    float wave = sin(x * frequency) * amplitude;

    return vec2(wave, y);
}

// Rotating the SIN wave by rotating the UNIT plane(UV)

// void main() {
//     vec2 uv = gl_FragCoord.xy/u_resolution; 

//     float aspect = u_resolution.x / u_resolution.y;

//     vec2 uv_corrected = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

//     vec3 c;
//     vec3 wave1_c = vec3(0.749, 0.349, 0.349);
//     vec3 wave1_c2 = vec3(0.8588, 0.6784, 0.4588);

//     float wave = 0.5 + 0.03 * sin(uv.x * 50.0);

//     float amplitude = .05;
//     float frequency = 20.0;
//     float angleInRadian = radians(45.0); 

//     float si_n = sin(angleInRadian);
//     float co_s = cos(angleInRadian);

//     vec2 rotated_uv;
//     rotated_uv.y = uv_corrected.y * co_s + uv_corrected.x * si_n;
//     rotated_uv.x = uv_corrected.x * co_s - uv_corrected.y * si_n;

//     float rotated_wave = sin(rotated_uv.x * frequency) * amplitude;

//     if(rotated_uv.y > rotated_wave) {
//         c = wave1_c;
//     } else {
//         c = wave1_c2;
//     }

//     gl_FragColor = vec4(c, 1.0);
// }