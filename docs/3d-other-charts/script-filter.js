//use for computing
var offset_dict = {'All':[]};
var rows = {};

var headers = ["X_location","Y_location","Z_location","velocity"];
 
function load_dataset(csv) {
  rows = d3.csv.parse(csv);
  offset_dict['All'] = rows;
  console.log(rows);

  var keys = d3.keys(rows[0]);

  var stats = d3.select("#stats")
    .html("")

  stats.append("div")
    .text("Columns: " + keys.length);

  stats.append("div")
    .text("Rows: " +  rows.length);

  stats.append("div")
    .text("Required Headers: " + headers.join(','));

  stats.append("div")
    .text("You Uploaded: " + keys.join(','));

  drawChart();
}


// handle upload button
function upload_button(el, callback) {
  var uploader = document.getElementById(el);  
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    callback(contents);
  };

  uploader.addEventListener("change", handleFiles, false);  

  function handleFiles() {
    var file = this.files[0];
    reader.readAsText(file);
  };
};


function unpack(rows, key) {
  return rows.map(function(row){
      if (key in row){
        if (key=='X_location' || key=='Y_location'){
          return parseFloat(row[key])/12.5;
        }
        else {
          return row[key];
        }
      } 
      else {
        return 0; //missing velocity, show gray scale
      } }); 
}

function drawChart(){
var x=unpack(rows, 'X_location'),
    y=unpack(rows, 'Y_location'),
    z=unpack(rows, 'Z_location'),
    c=unpack(rows , 'velocity');


Plotly.newPlot('myDiv', [{
  type: 'scatter3d',
  mode: 'lines',
  x: x,
  y: y,
  z: z,
  opacity: 1,
  line: {
    width: 6,
    color: c,
    reversescale: false
  }
}], {
  width: 1600,
  height: 1000,
  hovermode: 'closest',
  scene: {camera: {
        center: {
              x: 0, y: 0, z: 0}, 
        eye: { 
              x:-0.1, y:-0.1, z:-2.5}, 
        up: {
              x: -1, y: -1, z: -1}
    }
  }
});
 

var gd = document.getElementById('myDiv');

}