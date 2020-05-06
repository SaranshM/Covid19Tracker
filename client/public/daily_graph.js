function daily_graph()
{
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
  
    document.getElementsByClassName("daily")[0].style.opacity=1;
    document.getElementsByClassName("cum")[0].style.opacity=0.8;
    var place=document.getElementById("place_value").textContent;

    var for_state=place.split(" - ");
    console.log(for_state);
    if(for_state.length==1)
    {
        axios.post('/region/country', {place:place})
          .then(res => {
              console.log(res.data);
              display_charts(res.data.everyday,place,0);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
    }
    else
    {
      axios.post('/region/state', {place:for_state[1],country:for_state[0]})
          .then(res => {
              console.log(res.data);
              display_charts(res.data.everyday,for_state[1],0);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
    }
}

function cum_graph()
{
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
    document.getElementsByClassName("daily")[0].style.opacity=0.8;
    document.getElementsByClassName("cum")[0].style.opacity=1;
    var place=document.getElementById("place_value").textContent;

    var for_state=place.split(" - ");
    console.log(for_state);
    if(for_state.length==1)
    {
      axios.post('/region/country', {place:place})
            .then(res => {
                console.log(res.data);
                display_charts(res.data.everyday,place);
                
            }).catch(()=>{
              console.log("Location denied.");
            });
    }
    else
    {
      axios.post('/region/state', {place:for_state[1],country:for_state[0]})
          .then(res => {
              console.log(res.data);
              display_charts(res.data.everyday,for_state[1]);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
    }


}