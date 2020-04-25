function display_data(data){
  console.log(data);
  document.getElementById('loading').style.display="none";
  document.getElementById('data_wrap').style.display="block";
  var place=document.getElementById('place_value').innerHTML=data.country;
  var active=document.getElementById('active_count').innerHTML=data.active;
  var recovered=document.getElementById('recovered_count').innerHTML=data.recovered;
  var death=document.getElementById('death_count').innerHTML=data.deaths;
  var confirm=document.getElementById('confirm_count').innerHTML=data.confirmed;
}

function display_state_data(data){
  document.getElementById('loading').style.display="none";
  document.getElementById('data_wrap').style.display="block";
  var place=document.getElementById('place_value').innerHTML="India"+" - "+data.state;
  var active=document.getElementById('active_count').innerHTML=data.active;
  var recovered=document.getElementById('recovered_count').innerHTML=data.recovered;
  var death=document.getElementById('death_count').innerHTML=data.deaths;
  var confirm=document.getElementById('confirm_count').innerHTML=data.confirmed;
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      
      this.parentNode.appendChild(a);

      var hosb=0;
      
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });

          if(hosb<300)
          {
            
            hosb=hosb+41.7;
          }
          else
          {
            document.getElementsByClassName('autocomplete-items')[0].style.overflowY="scroll";
          }
          
          console.log(hosb);
          document.getElementsByClassName('autocomplete-items')[0].style.height=hosb+"px";
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { 
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

autocomplete(document.getElementById("myInput"), countries);

function location_track()
{
  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function(position){
      
      $.get( "https://us1.locationiq.com/v1/reverse.php?key=4a41aec453de57&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&format=json&zoom=5", function(data) {
        console.log(data.address.country);
        axios.post('http://localhost:3000/region/country', {place:data.address.country})
          .then(res => {
              return display_data(res.data);
              
          }
        );
      })
    }); 
  }
}

function hide(){

  document.getElementById('loading').style.display="block";
  document.getElementById('data_wrap').style.display="none";
}

function change_search_bar(place){
  document.getElementsByTagName('input')[0].value=place;
}

am4core.ready(function() {

    am4core.useTheme(am4themes_animated);
    
    var continents = {
      "AF": 0,
      "AN": 1,
      "AS": 2,
      "EU": 3,
      "NA": 4,
      "OC": 5,
      "SA": 6
    }
    
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.deltaLatitude = -20;
    chart.padding(20,20,20,20);
    
    var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.useGeodata = true;
    worldSeries.geodata = am4geodata_worldLow;
    worldSeries.exclude = ["AQ"];
    
    var worldPolygon = worldSeries.mapPolygons.template;
    worldPolygon.tooltipText = "{name}";
    worldPolygon.fill = am4core.color("#74AC48");
    worldPolygon.stroke = am4core.color("rgba(255,255,255,0.7)");
    worldPolygon.nonScalingStroke = true;
    worldPolygon.strokeOpacity = 0.5;
    worldPolygon.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    
    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color("blue");
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.1;
    graticuleSeries.fitExtent = false;
    
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#07519A");
    
    
    var hs = worldPolygon.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(9);
    
  
    var countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
    countrySeries.useGeodata = true;
    countrySeries.hide();
    countrySeries.geodataSource.events.on("done", function(ev) {
      worldSeries.hide();
      countrySeries.show();
    });
    
    var countryPolygon = countrySeries.mapPolygons.template;
    countryPolygon.tooltipText = "{name}";
    countryPolygon.nonScalingStroke = true;
    countryPolygon.strokeOpacity = 0.5;
    countryPolygon.fill = am4core.color("#63ace5");
    
    var hs = countryPolygon.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(9);
    
    worldPolygon.events.on("hit", function(ev) {
      hide();
      // console.log(document.getElementsByTagName('input')[0].value);
      change_search_bar(ev.target.dataItem.dataContext.name);
      ev.target.series.chart.zoomToMapObject(ev.target);
      var map = ev.target.dataItem.dataContext.map;
    
      if (map) {
        ev.target.isHover = false;
        countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
        
        countrySeries.geodataSource.load();
      }
      console.log(ev.target.dataItem.dataContext.name);
      axios.post('http://localhost:3000/region/country', {place:ev.target.dataItem.dataContext.name})
            .then(res => {
              return display_data(res.data);
            }
      );
    });
    
    var data = [];
    for(var id in am4geodata_data_countries2) {
      if (am4geodata_data_countries2.hasOwnProperty(id)) {
        var country = am4geodata_data_countries2[id];
        if (country.maps.length) {
          data.push({
            id: id,
            color: chart.colors.getIndex(continents[country.continent_code]),
            map: country.maps[0]
          });
        }
      }
    }
    worldSeries.data = data;
    
    countryPolygon.events.on("hit",function(ev){
        hide();
        console.log(ev.target.dataItem.dataContext.name);
        axios.post('http://localhost:3000/region/state', {place:ev.target.dataItem.dataContext.name})
            .then(res => {
                return display_state_data(res.data);
            }
      );
    })
    
    chart.zoomControl = new am4maps.ZoomControl();
    
    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function() {
      worldSeries.show();
      countrySeries.hide();
      chart.goHome();
    });
    
    
    
    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);

    
    
    
    });


    // $(document).ready(function(){
      
    //   var countries;

    //   fetch('https://api.covid19api.com/countries', {method: 'GET'}).then(function(response) { 
    //     return response.json(); 
    //   }).then(function(json) {
    //     var i=0;
    //     for(i=0;i<json.length;i++)
    //     {
    //       var node = document.createElement("OPTION");
    //       var textnode = document.createTextNode(json[i].Country);
    //       node.appendChild(textnode);
    //       document.getElementById("department").appendChild(node);
    //     }
    //   });
    // })


  var button=document.getElementsByTagName("form")[0];
  button.addEventListener('submit',(e)=>{
    e.preventDefault();
    hide();
    var placex=document.getElementsByTagName('input')[0].value;
    axios.post('http://localhost:3000/region/country', {place:placex})
            .then(res => {
              return display_data(res.data);
            }
    );

  });

   