
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform float       u_time;

#include "../glsl/lygia/space/ratio.glsl"
#include "../glsl/lygia/draw/digits.glsl"
#include "../glsl/lygia/draw/rect.glsl"
#include "../glsl/lygia/distort/chromaAB.glsl"
#include "../glsl/lygia/distort/stretch.glsl"
#include "../glsl/lygia/distort/barrel.glsl"

void main (void) {
    //vec4 color = vec4(0.0);
    vec3 color = vec3(0.0);

    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    //color = texture2D(u_tex0, st);
    //color = chromaAB(u_tex0, st, sin(u_time*.1)/2.);
    //color = stretch(u_tex0, st, vec2(cos(u_time)*.002, sin(u_time*.9)*.002));
    color = barrel(u_tex0, st);
    color.rgb *= rect(st, 1.0);
    
    gl_FragColor = vec4(color,1.0);
    //gl_FragColor = color;
}
