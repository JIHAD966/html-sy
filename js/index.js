var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

//--------------------------------GMS  lat

        var z =latInput.value;

        var g =parseInt(latInput.value);

        var m =parseInt((latInput.value -parseInt(latInput.value))*60);

        var s =((z-g-(m/60))*3600).toFixed(3);

        glatInput.value =g;

        mlatInput.value=m;

        slatInput.value=s;

        //------------------------------------------------GMS lon

        var zn =lonInput.value;

        var gn =parseInt(lonInput.value);

        var mn =parseInt((lonInput.value -parseInt(lonInput.value))*60);

        var sn =((zn-gn-(mn/60))*3600).toFixed(3);

        glonInput.value =gn;

        mlonInput.value=mn;

        slonInput.value=sn;

        //--------------------------------



}

map.on('click', onMapClick);



function addMarker(){

  var lat = document.getElementById('latInput').value;

  var lon =document.getElementById('lonInput').value;

  var txt =document.getElementById('nameInput').value;

  var eu =document.getElementById('EInput').value;

  var nu =document.getElementById('NInput').value;

  //var erg ="<a href='img\\" + txt +"' target='_blank'><img src='img\\" + txt + "' style='width:300px'</a>"

  marker=L.marker([lat , lon]).addTo(drawnItems);

  map.closePopup(); 

  map.setView([lat , lon]);

  marker.bindPopup(txt).openPopup();

  

   // _____________________________________________________LIST

   var table = document.getElementById("myTable");

   var row = table.insertRow(1);

   var cell1 = row.insertCell(0);

   var cell2 = row.insertCell(1);

   var cell3 = row.insertCell(2);

   var cell4 = row.insertCell(3);

   var cell5 = row.insertCell(4);

   var cell6 = row.insertCell(5);

   var cell7 = row.insertCell(6);

   var cell8 = row.insertCell(7);

   var cell9 = row.insertCell(8);

    

   cell1.innerHTML = nameInput.value;

   cell2.innerHTML = lat;

   cell3.innerHTML = lon;

   cell4.innerHTML = glatInput.value +'°' +mlatInput.value +"'"+slatInput.value +'"';

   cell5.innerHTML = glonInput.value +'°' +mlonInput.value +"'"+slonInput.value +'"';

   cell6.innerHTML =xInput.value;

   cell7.innerHTML =yInput.value;

   cell8.innerHTML =eu;

   cell9.innerHTML =nu;
};
//----
     //=================================================================DRAG DROP====================================================================

var listP=[];
var listL=[];
var listG=[];	
//==============================================================================================================================================

    FileReader= new FileReader();

let element = document.getElementById("tab");

element.removeAttribute("hidden");
var fileName;
//===============================================

		var map2= document.getElementById("map");
		map2.addEventListener("drop", function(event) {

			event.preventDefault();
			const file = event.dataTransfer.files[0];
			const name = file.name;
			fileName=name;
		});
		
		map2.addEventListener("dragover", function(event) {
			event.preventDefault();
		});
//================================================DragDrop

        FileReader.onload=function(){
       
        var fileContent = FileReader.result;
	
        var geojson = JSON.parse(fileContent);

        var layer = L.geoJSON(geojson,{style:JihadStyle,

          onEachFeature: function(feature, layer){

           //layer.bindPopup(feature.properties.desc);
		  var properties = layer.feature.properties;
  // Add HTML TABLE
  var tableHTML = '<table><tr><th>Property</th><th>Value</th></tr>';
  for (var key in properties) {
    tableHTML += '<tr><td>' + key + '</td><td>' + properties[key] + '</td></tr>';
  }
  tableHTML += '</table>';

  //  Popup 
  layer.bindPopup(tableHTML , {maxHeight: 400}).openPopup();
 	
          }
        });
       
        layer.addTo(DragDropItem);//ADD 2
       
        var bounds = layer.getBounds();
			  map.fitBounds(bounds); 
             
var list =geojson.features.map(feature =>{return feature.geometry.coordinates[0]});
//======================================================================================================
//document.getElementById("mySpan").innerHTML= geojson.features.length +" Zeilen"//+geojson.features[0].geometry.type);
for (var i = 0; i < geojson.features.length; i++){
if(geojson.features[i].geometry.type=="Point" || geojson.features[i].geometry.type=="MultiPoint"){
    listP.push(list[i]);
}else if(geojson.features[i].geometry.type=="LineString" || geojson.features[i].geometry.type=="MultiLineString"){
    listL.push(list[i]);		
}else if(geojson.features[i].geometry.type=="Polygon" || geojson.features[i].geometry.type== "MultiPolygon"){
    listG.push(list[i]);
}else{
    alert('Error');
}
}       
document.getElementById('btnInfo').innerHTML = "Name: "+fileName +" - "+'<b><u>'+geojson.features.length+'</u></b>' +" :Rows ("+listP.length+" :Point , "+listL.length+" :Line , "+listG.length+" :Polygone ) "
//====================================================if(geojson.features[i].geometry.type=="Point")=============================================
const thead = myTable.createTHead();
const headerRow = thead.insertRow();

// Add the coordinate columns to the header

const properties = geojson.features[0].properties;
Object.keys(properties).forEach(propertyName => {
  const headerCell = document.createElement('th');
  headerCell.textContent = propertyName;
  headerRow.appendChild(headerCell);
});
// Create table body
const tbody = myTable.createTBody();
geojson.features.forEach((feature) => {
const row = tbody.insertRow();

const properties = feature.properties;
Object.keys(properties).forEach((key) => {
const value = properties[key];
const cell = row.insertCell();

cell.innerHTML = ` ${value}`;
});

 row.addEventListener('click', () => {
    flyToFeature(feature);

  });
});
// Fly to a feature on the map
function flyToFeature(feature) {
  const typeP = feature.geometry.type;
  const bounds = L.geoJSON(feature).getBounds();
//=========================================================================================

const obj =feature.properties;
const arr = Object.keys(obj);
console.log(arr[0]);
//============================================================================================
var sw = bounds.getSouthWest();
//var ne = bounds.getNorthEast();

if(typeP=="Point"){
map.flyTo([sw.lat, sw.lng],22,{
animate: true,
duration: 0.5});
}else{
map.flyToBounds(bounds,{
zoom: 22,
animate: true,
duration: 0.5});
}
}
};

              function onGetsuccses(){

          alert("Succses");

        };
        
        function onFiledragOver(e){

          e.stopPropagation();

          e.preventDefault();

          e.dataTransfer.dropEffect ='copy';

        }

        function onFileDrop(e){

          e.stopPropagation();

          e.preventDefault();

          var files = e.dataTransfer.files;
        
        var uploadeFile = files[0];

        FileReader.readAsText(uploadeFile);

        }

        var droDiv = document.getElementById('map');

        droDiv.addEventListener('dragover',onFiledragOver, false);

        droDiv.addEventListener('drop', onFileDrop, false);

      
     function exportTableToExcel(tableID, filename = ''){

        var downloadLink;

        var dataType = 'application/vnd.ms-excel';

        var tableSelect = document.getElementById(tableID);

        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        filename = filename?filename+'.xls':'excel_data.xls';

        downloadLink = document.createElement("a");  

        document.body.appendChild(downloadLink);        

        if(navigator.msSaveOrOpenBlob){

            var blob = new Blob(['\ufeff', tableHTML], {

                type: dataType

            });

            navigator.msSaveOrOpenBlob( blob, filename);

        }else{         

            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            downloadLink.download = filename;

            downloadLink.click();

        }

    }


     map.on('draw:created', function (event) {

        var layer = event.layer,

            feature = layer.feature = layer.feature || {};

        

        feature.type = feature.type || "Feature";

        var props = feature.properties = feature.properties || {};

        props.desc = null;

        props.image = null;

        drawnItems.addLayer(layer);

        addPopup(layer);

    });

    function addPopup(layer) {

        var content = document.createElement("textarea");

        content.addEventListener("keyup", function () {

            layer.feature.properties.desc = content.value;

        });

        layer.on("popupopen", function () {

            content.value = layer.feature.properties.desc;

          content.focus();

        });

        layer.bindPopup(content).openPopup();

    }
    
    document.getElementById("convert").addEventListener("click", function () {

        console.log(JSON.stringify(drawnItems.toGeoJSON(), null, 2));

    });

     function saveIdIW() {

       var sName = $('#shapeName').val();

       var sDesc = $('#shapeDesc').val();

       var drawings = drawnItems.getLayers(); 

       drawings[drawings.length - 1].title = sName;

       drawings[drawings.length - 1].content = sDesc;

       map.closePopup();

     };
 
     function myFunction() {

	    var x = document.getElementById("ddselect");

	    var i = x.selectedIndex;

	    if (i == 0) {

	    } else if (i==1) {

            xInput.value="";

            yInput.value="";

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:25832","+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:25832'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:#FF0000"> ETRS32:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:25832'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;   

}

map.on('click', onMapClick);

	    } else if (i==2) {	

            xInput.value="";

            yInput.value="";  

            var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

 proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:25833'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#800080"> ETRS33:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:25833'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

	    } else if (i==3) {	 

            xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:5520","+proj=tmerc +lat_0=0 +lon_0=3 +k=1 +x_0=1500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:5520'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FF6600"> G.Kruger z-1:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:5520'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

	    } else if (i==4) {	

            xInput.value="";

            yInput.value="";   

            var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:31466","+proj=tmerc +lat_0=0 +lon_0=6 +k=1 +x_0=2500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31466'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#33CCCC"> G.Kruger z-2:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31466'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

 	    } else if (i==5) {	

            xInput.value="";

            yInput.value="";   

            var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:31467","+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31467'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:#993366"> G.Kruger z-3:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31467'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

	    } else if (i==6) {	

            xInput.value="";

            yInput.value="";   

            var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:31468","+proj=tmerc +lat_0=0 +lon_0=12 +k=1 +x_0=4500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31468'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#993300"> G.Kruger z-4:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31468'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==7) {	 

    xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:31469","+proj=tmerc +lat_0=0 +lon_0=15 +k=1 +x_0=5500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31469'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FF00FF"> G.Kruger z-5:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:31469'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==8) {	

            xInput.value="";

            yInput.value="";  

            var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:320","+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=GRS80 +lowgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:320'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#800080"> LS320:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:320'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==9) {	  //                 7s32

            xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:102328","+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=2500000 +y_0=0 +ellps=GRS80 +lowgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:102328'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FF6600"> ETRS-7St.32:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:102328'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==10) {	 

            xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:102359","+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9996 +x_0=3500000 +y_0=0 +ellps=GRS80 +lowgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:102359'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FF6900"> ETRS-7St.33:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:102359'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==11) {	  

            xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:4647","+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=32500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:4647'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FFC600"> ETRS-8St.32:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:4647'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

} else if (i==12) {	  

            xInput.value="";

            yInput.value="";  

  var div = document.createElement('div');

  div.id = 'coordsDiv';

  div.style.position='absolute';

  div.style.bottom='0';

  div.style.right='0';

  div.style.zIndex='999';

  div.style.backgroundColor='#FEFFF4';

  document.getElementById('map').appendChild(div);

  proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");

  proj4.defs("EPSG:5650","+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9996 +x_0=33500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  map.on('mousemove', function(e){

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:5650'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

   document.getElementById('coordsDiv').innerHTML ='<b style="font-size:15px"><u style="color:blue">WGS 84: </u> ' + lat.toFixed(7) + ',' + lon.toFixed(7) +' :<u style="color:	#FF8600"> ETRS-8St.33:</u> '+x +','+ y+'</b>' ;

 });

 var popup = L.popup();

        function onMapClick(e) {

    popup

        .setLatLng(e.latlng)

        .setContent(e.latlng.toString())

        latInput.value=(e.latlng.lat.toFixed(7));

        lonInput.value=(e.latlng.lng.toFixed(7));

    var lat = e.latlng.lat;

    var lon = e.latlng.lng;

    var trans =proj4(proj4('EPSG:4326'),proj4('EPSG:5650'),[lon, lat]);

    var x=trans[0].toFixed(2);

    var y = trans[1].toFixed(2);

    xInput.value=x;

    yInput.value=y;

}

map.on('click', onMapClick);

	    } else {

alert("Select Projection!");

	    }

	    }
