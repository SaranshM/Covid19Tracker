function display_tables(city)
{
  console.log(city);
  var i;
  var table=document.getElementsByClassName('table-fill')[0];
  var tbody=document.getElementsByClassName('table-hover')[0].innerHTML="";
  for(i=0;i<city.length;i++)
  {
    var dist="<td>"+city[i].district+"</td>";
    var conf="<td>"+city[i].confirmed+"</td>";
    var activex="<td>"+city[i].deaths+"</td>";
    var deathx="<td>"+city[i].active+"</td>";
    var rec="<td>"+city[i].recovered+"</td>";
    var fdata=dist+conf+activex+deathx+rec;
    var ffdata="<tr>"+fdata+"</tr>";
    $(table).find('tbody').append(ffdata);

  }
}


function display_state_data(data){
  if(data.msg=="Error Message")
  {
    console.log("true");
    hide_everything();
    if (myChart1) {
      myChart1.destroy();
    }
    if (myChart2) {
      myChart2.destroy();
    }
    if (myChart3) {
      myChart3.destroy();
    }
    if (myChart4) {
      myChart4.destroy();
    }
    document.getElementById("error").innerHTML="Sorry, we're having trouble fetching data. Please try again. Please check your internet connectivity.";
    document.getElementById("error1").style.display="block";
    return;
  }
  else if(data.msg=="Data Not Available yet")
  {
    console.log("truexxxx");
    hide_everything();
    if (myChart1) {
      myChart1.destroy();
    }
    if (myChart2) {
      myChart2.destroy();
    }
    if (myChart3) {
      myChart3.destroy();
    }
    if (myChart4) {
      myChart4.destroy();
    }
    document.getElementById("error").innerHTML="Sorry, we could not find any data for "+data.country+".";
    document.getElementById("error1").style.display="block";
    return;
  }
  document.getElementById('loading').style.display="none";
  // document.getElementById("error1").style.display="none";
  document.getElementById('data_wrap').style.display="block";
  document.getElementsByClassName("graph_toggle_wrap")[0].style.display="block";
  document.getElementsByClassName('table-fill')[0].style.display="table";
  document.getElementsByClassName("news_wrap")[0].style.display="none";
  var place=document.getElementById('place_value').innerHTML="India"+" - "+data.state;
  var active=document.getElementById('active_count').innerHTML=formatNumber(data.active);
  var recovered=document.getElementById('recovered_count').innerHTML=formatNumber(data.recovered);
  var death=document.getElementById('death_count').innerHTML=formatNumber(data.deaths);
  var confirm=document.getElementById('confirm_count').innerHTML=formatNumber(data.confirmed);
  console.log(data.districtData);
  display_tables(data.districtData);
  display_charts(data.everyday,data.state);
}




