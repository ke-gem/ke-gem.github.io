//use for computing
//var offset_dict = {'All':[]};
var rows = {};

var headers = ["x-location","y-location","z-location","velocity"];

function load_dataset(rows) {
  //rows = d3.csv.parse(csv);
  //offset_dict['All'] = rows;
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
    .text("Web Trace Returned: " + keys.join(','));

  //drawChart();
}


// handle upload button
// function upload_button(el, callback) {
//   var uploader = document.getElementById(el);  
//   var reader = new FileReader();

//   reader.onload = function(e) {
//     var contents = e.target.result;
//     callback(contents);
//   };

//   uploader.addEventListener("change", handleFiles, false);  

//   function handleFiles() {
//     var file = this.files[0];
//     reader.readAsText(file);
//   };
// };

d3.csv(localStorage.getItem("ray_trace_csv"), function(err, rows){
 	load_dataset(rows);
 })
function unpack(rows, key) {
  
  return rows.map(function(row){
      if (key in row){
        return row[key]
      } 
      else {
        return 0; //missing velocity, show gray scale
      } }); 
}

function drawChart(){
var x=unpack(rows, 'x-location'),
    y=unpack(rows, 'y-location'),
    z=unpack(rows, 'z-location'),
    c=unpack(rows , 'velocity');


Plotly.newPlot('myDiv', [{
  type: 'scatter3d',
  mode: 'lines',
  x: x,
  y: y,
  z: z,
  text: c,
  opacity: 1,
   yaxis: {
   autorange:"reversed"
  },
  hovertemplate:
    "<b>x and y value divided by 12.5</b><br>" +
    "x: %{x}<br>" +
    "y: %{y}<br>" +
    "z: %{z}<br>" +
    "velocity: %{text}" +
    "<extra></extra>",
  hovermode: 'closest',
  line: {
    width: 6,
    color: c,
    reversescale: false
  }
}], {
  width: 1600,
  height: 1000,
 
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