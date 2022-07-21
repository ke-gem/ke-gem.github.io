d3.csv('https://raw.githubusercontent.com/ke-gem/ke-gem.github.io/master/docs/sample-data/isa-xyz.csv', function(err, rows){
//console.log(rows);
var header_group = ['surf_src', 'surf_rec', 'sub_surf'];
var header_append = ['_x','_y','_z'];
var z_data = [];
var l_data = [];

var headers = header_group.map((hg)=>{
	return header_append.map((ha)=>{
		return hg+ha;
	});
});

var headers_links = header_append.map((ha)=>{
	return header_group.map((hg)=>{
		return hg+ha;
	});
});


function unpack(rows, keys) {
	return keys.map((key)=>{
		return rows.map(function(row) { return row[key]; });
	})
}

function unpack_header_links(rows, keys) {
	return keys.map((key)=>{
		return rows[key];
	})
}

for (i = 0;i < headers.length;i++)
{
  z_data.push(unpack(rows,headers[i]));
}


console.log(headers);
console.log(z_data);


var data_z1 = {x: z_data[0][0],y: z_data[0][1],z: z_data[0][2], mode: 'markers', type: 'scatter3d', marker: {color: 'rgb(23, 190, 207)',size: 2}};
var data_z2 = {x: z_data[1][0],y: z_data[1][1],z: z_data[1][2], mode: 'markers', type: 'scatter3d',marker: {color: 'rgb(190, 23, 207)',size: 2}};
var data_z3 = {x: z_data[2][0],y: z_data[2][1],z: z_data[2][2], mode: 'markers', type: 'scatter3d',marker: {color: 'rgb(207, 190, 23)',size: 2}};


for (j = 0; j < rows.length; j++){
	for (k = 0; k < headers_links.length; k++){
		if (typeof l_data[j]=='undefined'){
			l_data[j] = [];
		}
		l_data[j].push(unpack_header_links(rows[j],headers_links[k]));
	}
}



var data_links = [data_z1, data_z2, data_z3];

for (m = 0; m < l_data.length; m++){
	data_links.push({x: l_data[m][0], y: l_data[m][1],z: l_data[m][2],  opacity: 0.2,  mode: 'lines', type: 'scatter3d' });
	data_links.push({x: l_data[m][0], y: l_data[m][1],z: l_data[m][2],  opacity: 0.05,  type:'mesh3d', color:'rgb(100,100,100)'})
		
}

var layout = {
  autosize: false,
  width: 1600,
  height: 1000,
  hovermode: 'closest',
  scene: {camera: {
        center: {
              x: 0, y: 0, z: 0}, 
        eye: { 
              x:0.1, y:0.1, z:-2.5}, 
        up: {
              x: 0, y: 0, z: 1}
    }
  }
};


Plotly.newPlot('myDiv',data_links,layout);

var gd = document.getElementById('myDiv');
var activeColor = '#ff7f00';
var d3 = Plotly.d3;
d3.selectAll('button')
    .data(z_data)
  .enter()
    .append('button')
    .attr('type', 'button')
    .on('click', function(d, i) {
      var button = d3.select(this);
      var active = button.attr('value');
      Plotly.restyle(gd, 'marker.size', 2);
      Plotly.restyle(gd, 'marker.size', 8, [i]);
      button.attr('value', active ? null : 'true');
    })
    .append('div')
    .text(function(d, i) { 
		return headers[i].join(' | '); 
     })
});