class Paintbrush{
    constructor(){
      this.type = "paintbrush";
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
      drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0]+d, xy[1]+.5*d])
      drawTriangle([xy[0], xy[1], xy[0]-d, xy[1], xy[0]-d, xy[1]+.5*d])
      drawTriangle([xy[0], xy[1], xy[0]+d/2, xy[1], xy[0]+d/2, xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]-d/2, xy[1], xy[0]-d/2, xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]+d/4, xy[1], xy[0]+d/4, xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]-d/4, xy[1], xy[0]-d/4, xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]+(3*d/4), xy[1], xy[0]+(3*d/4), xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]-(3*d/4), xy[1], xy[0]-(3*d/4), xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]+(5*d/4), xy[1], xy[0], xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]-(5*d/4), xy[1], xy[0], xy[1]+d])
      drawTriangle([xy[0], xy[1], xy[0]+(5*d/4), xy[1], xy[0], xy[1]-d])
      drawTriangle([xy[0], xy[1], xy[0]-(5*d/4), xy[1], xy[0], xy[1]-d])
      drawTriangle([xy[0], xy[1], xy[0]-d, xy[1]-0.5*d, xy[0]-d, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]+d, xy[1]-0.5*d, xy[0]+d, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]-d/2, xy[1]-d, xy[0]-d/2, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]+d/2, xy[1]-d, xy[0]+d/2, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]-d/4, xy[1]-d, xy[0]-d/4, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]+d/4, xy[1]-d, xy[0]+d/4, xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]-(3*d/4), xy[1]-d, xy[0]-(3*d/4), xy[1]])
      drawTriangle([xy[0], xy[1], xy[0]+(3*d/4), xy[1]-d, xy[0]+(3*d/4), xy[1]])
    }
}