var gl;

var dx = 0.0;
var dy = 0.0;

var deltax = 0.1;
var deltay = 0.1;

var dxLoc;
var dyLoc;

var numberofvertex = 64;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
   
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    var circle_vertices2 = circleVertex(0.5, 0.5, 0.1, numberofvertex)
    var circle_vertices = circleVertex(0, 0, 0.1, numberofvertex)
    
    var x = 0;
    var y = 0;
    //gl.clear( gl.COLOR_BUFFER_BIT );
    
    drawCircleObject(program, 0.5, 0, numberofvertex, -0.01, 0.01);
    drawCircleObject(program, 0.5, 0, numberofvertex, -0.01, -0.01);
    drawCircleObject(program, 0.5, 0, numberofvertex, 0.01, 0.01);
    console.log(1);
   
    
};

function drawCircleObject(program, cx, cy, numberofvertex, dx, dy){
    
    
    
    if(cy + dy  > 0.9 || cy + dy < -0.7)
    {
    	dy = -dy;
    }
    
    if(cx + dx  > 0.9 || cx + dx < -0.9)
    {
    	dx = -dx;
    }
    
    cx = cx + dx;
    cy = cy + dy;
    
    
    var cricle_vertices = circleVertex(cx, cy, 0.1, numberofvertex)
    
    var vertexbuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexbuff);
    gl.bufferData(gl.ARRAY_BUFFER, cricle_vertices, gl.STATIC_DRAW);
   

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vPosition);
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numberofvertex);
    //drawCircleObject(program, cx, cy, numberofvertex);
    setTimeout(
        function () {drawCircleObject(program, cx, cy, numberofvertex, dx, dy);},
        30
    );
 
}

function circleVertex(cx, cy, r, n)
{
    var temp = [];
    
    for(var i = 0; i < n; i++)
    {
        var theta = 2.0 * 3.1415926 / n * i;//get the current angle

        var x = cx + r * Math.cos(theta);//calculate the x component
        var y = cy + r * Math.sin(theta);//calculate the y component

        //glVertex2f(x + 1, y + 1);//output vertex
        temp.push(x);
        temp.push(y);
    }
    
    return new Float32Array(temp);

}

function bounce()
{

    if(dy  > 0.7 || dy < -0.7)
    {
    	deltay = -deltay;
    }
    
    if(dx  > 0.7 || dx < -0.7)
    {
    	deltax = -deltax;
    }
    dy = dy + deltay;
    dx = dx + deltax;
}
