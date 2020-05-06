function display_data(data){
    if(data.msg=="No data to display")
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
      document.getElementById("error").innerHTML="Sorry, we could not find any data for "+data.country+".";
      document.getElementById("error1").style.display="block";
      return;
    }
    else if(data.msg=='Error Message')
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
    else if(data.msg=='Country Not found')
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
      document.getElementById("error").innerHTML="Sorry, we could not find any data for "+data.country+".";
      document.getElementById("error1").style.display="block";
      return;
    }
    // document.getElementById("error").innerHTML="";
    // document.getElementById("error1").style.display="none";
    document.getElementById('loading').style.display="none";
    document.getElementById('data_wrap').style.display="block";
    document.getElementsByClassName("graph_toggle_wrap")[0].style.display="block";
    document.getElementById('place_value').innerHTML=data.country;
    document.getElementById('active_count').innerHTML=formatNumber(data.active);
    document.getElementById('recovered_count').innerHTML=formatNumber(data.recovered);
    document.getElementById('death_count').innerHTML=formatNumber(data.deaths);
    document.getElementById('confirm_count').innerHTML=formatNumber(data.confirmed);
    if(data.country!="World")
    {
      // console.log(data.country)
      document.getElementsByClassName("news_wrap")[0].style.display="none";
      display_charts(data.everyday,data.country,);
    }
    else if(data.country=="World")
    {
      document.getElementsByClassName("graph_toggle_wrap")[0].style.display="none";
      display_news(data.news);
    }
  
  }

  function world_data()
  {
    hide();
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
    axios.post('/region/world',{world:"world"})
            .then(res => {
              console.log(res.data);
              document.getElementById("error").innerHTML="";
              document.getElementById("error1").style.display="none";
              document.getElementsByClassName("table-fill")[0].style.display="none";
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

              return display_data(res.data);
            }
        );
  }