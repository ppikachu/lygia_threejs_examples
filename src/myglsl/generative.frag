
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define EDGE_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.02), vec2(0.98))).r
#include "../glsl/lygia/filter/edge.glsl"
#include "../glsl/lygia/space/ratio.glsl"
#include "../glsl/lygia/generative/curl.glsl"
#include "../glsl/lygia/draw/circle.glsl"
#include "../glsl/lygia/draw/digits.glsl"
#include "../glsl/lygia/draw/rect.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);
    //float ani = sin(u_time)*.7+.3;
    float ani = fract(u_time * 0.25);
    
    float ix = floor(st.x * 19.0);
    float radius = max(0.1, ix * ani);

    //color.rgb += circle(st, sin(u_time*3.)*.2+.5);
    color += edgePrewitt(u_tex0, st, pixel * radius);
    color += digits(st, ani);
    color -= step(st.y, 0.05) * 0.5;
    color = clamp(color, vec3(0.1), vec3(0.9));
    gl_FragColor = vec4(color,1.0);
}
