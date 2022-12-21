#ifdef GL_ES
precision mediump float;
#endif

//in vec2 fragCoord;
uniform vec2 u_resolution;

void main()
{
    // normalize device coordinates
    vec2 uv = fragCoord/u_resolution.xy;
    
    // remap to [-2,2] range
    vec2 c = (uv - vec2(0.5)) * 4.0 - vec2(1.5,0);

    // iterate over the complex plane
    vec2 z = vec2(0.0);
    int i;
    for (i = 0; i < 256; i++)
    {
        z = vec2(
            z.x * z.x - z.y * z.y + c.x,
            z.y * z.x + z.x * z.y + c.y
        );

        if (dot(z,z) > 4.0)
        {
            break;
        }
    }

    // calculate color based on number of iterations
    float cc = float(i) / 256.0;
    gl_FragColor = vec4(cc,cc,cc,1);
}
