//<script>
  
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
  map.setView([lat , lon], 16);
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
//---------------------------------------------------------------
        FileReader= new FileReader();
        FileReader.onload=function(){
        var fileContent = FileReader.result;
        var geojson = JSON.parse(fileContent);
        var layer = L.geoJSON(geojson,{
          onEachFeature: function(feature, layer){
          layer.bindPopup(feature.properties.desc);
         //layer.addto(baseMaps);
          }
        });
        layer.addTo(drawnItems);
        var bounds = layer.getBounds();
        map.fitBounds(bounds);
        
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
       
    
  
   
      //  </script>
     // <script>
     function exportTableToExcel(tableID, filename = ''){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }
  
       //---------------------------
    
     //Leaflet.draw
    
     
     map.on('draw:created', function (event) {
        var layer = event.layer,
            feature = layer.feature = layer.feature || {};
        
        feature.type = feature.type || "Feature";
        var props = feature.properties = feature.properties || {};
        //layer.feature = {properties: {}}; // No need to convert to GeoJSON.
        //var props = layer.feature.properties;
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
       var drawings = drawnItems.getLayers(); //drawnItems is a container for the drawn objects
       drawings[drawings.length - 1].title = sName;
       drawings[drawings.length - 1].content = sDesc;
       map.closePopup();
     };
     

     //Export
     
     function myFunction() {
	    var x = document.getElementById("ddselect");
	    var i = x.selectedIndex;
	    if (i == 0) {
           // alert("Select Projection!"); csvHtml5        id="btPrint" onclick="createPDF()" />tableToJson      <button onclick="tableToJson()">Json</button>
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
  //proj4.defs("EPSG:25833","+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=GRS80 +lowgs84=0,0,0,0,0,0,0 +units=m +no_defs");
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
} else if (i==10) {	  //                 7s33
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
} else if (i==11) {	  //                 8s32
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
} else if (i==12) {	  //                 8s33
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

//</script>