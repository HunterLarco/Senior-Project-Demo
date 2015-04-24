(function(){
  
	function Flatten(point3d){
		return {
			x: point3d.x,
			y: point3d.y
		};
	}
	
	function GenRotMatrix(xrot, yrot){
		var rot_x = math.matrix([
					[1, 0             , 0              ],
					[0, Math.cos(xrot), -Math.sin(xrot)],
					[0, Math.sin(xrot),  Math.cos(xrot)]
				]),
				rot_y = math.matrix([
					[ Math.cos(yrot), 0, Math.sin(yrot)],
					[0               , 1, 0              ],
					[-Math.sin(yrot), 0, Math.cos(yrot)]
				]);
		return math.multiply(rot_x, rot_y);
	}
  
	function Rotate(point, xrot, yrot){
		var column_vector = math.matrix([[point.x],[point.y],[point.z]]),
				rotated = math.multiply(GenRotMatrix(xrot, yrot), column_vector);
		
		return {
			x: math.subset(rotated, math.index(0, 0)),
			y: math.subset(rotated, math.index(1, 0)),
			z: math.subset(rotated, math.index(2, 0))
		}
	}
  
  window.Point3 = {
    Flatten: Flatten,
    Rotate: Rotate
  }
  
})();