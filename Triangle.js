class Triangle{
    constructor(){
      this.type = "triangle";
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0];
      this.size = 5.0;
    }
  
    render() {
      var xy = this.position;
      var rgba = this.color;
      var size = this.size;
      var d = this.size/200.0

      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniform1f(u_Size, size);
      drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d])
    }
}

function drawTriangle(vertices) {

    var n = 3; // The number of vertices
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawGob() {
    gl.uniform4f(u_FragColor, 0, 1, 0, 1);
    //face
    drawTriangle([0, 0, -0.32, 0, 0, -0.32])
    drawTriangle([0, 0, 0.32, 0, 0, -0.32])
    drawTriangle([0, 0, 0.32, 0, 0, 0.32])
    drawTriangle([0, 0, -0.32, 0, 0, 0.32])
    drawTriangle([0.32, 0, 0, 0.32, 0.32, 0.32])
    drawTriangle([0.32, 0, 0, -0.32, 0.32, -0.32])
    drawTriangle([0.32, 0, 0, -0.32, 0.32, -0.32])
    drawTriangle([-0.32, 0, 0, -0.32, -0.32, -0.32])
    drawTriangle([-0.32, 0, 0, 0.32, -0.32, 0.32])
    //neck
    drawTriangle([0, -0.32, 0, -0.48, 0.16, -0.32])
    drawTriangle([0, -0.48, 0.16, -0.32, 0.16, -0.48])
    drawTriangle([0, -0.32, 0, -0.48, -0.16, -0.32])
    drawTriangle([0, -0.48, -0.16, -0.32, -0.16, -0.48])
    //ears
    drawTriangle([-0.32, 0.08, -0.48, 0.08, -0.32, -0.08])
    drawTriangle([0.32, 0.08, 0.48, 0.08, 0.32, -0.08])
    gl.uniform4f(u_FragColor, 0.94, 0.90, 0.54, 1);
    //hat
    drawTriangle([0, 0.32, 0, 0.8, 0.48, 0.32])
    drawTriangle([0, 0.32, 0, 0.8, -0.48, 0.32])
    gl.uniform4f(u_FragColor, 0, 0, 0, 1);
    //eyes
    drawTriangle([0.16, 0.16, 0.16, 0.24, 0.24, 0.24])
    drawTriangle([0.16, 0.16, 0.24, 0.24, 0.24, 0.16])
    drawTriangle([-0.16, 0.16, -0.16, 0.24, -0.24, 0.24])
    drawTriangle([-0.16, 0.16, -0.24, 0.24, -0.24, 0.16])
    gl.uniform4f(u_FragColor, 0.13, 0.55, 0.13, 1);
    //nose
    drawTriangle([0, 0, 0, 0.08, 0.08, 0])
    drawTriangle([0, 0, 0, 0.08, -0.08, 0])
    gl.uniform4f(u_FragColor, 1, 1, 1, 1);
    //mouth
    drawTriangle([0, -0.16, 0.08, -0.16, 0.08, -0.24])
    drawTriangle([0, -0.16, -0.08, -0.16, -0.08, -0.24])
    drawTriangle([0, -0.16, -0.08, -0.24, 0, -0.24])    
    drawTriangle([0, -0.16, 0.08, -0.24, 0, -0.24])  
    drawTriangle([-0.08, -0.16, -0.16, -0.16, -0.08, -0.24])  
    drawTriangle([0.08, -0.16, 0.16, -0.16, 0.08, -0.24])  
}