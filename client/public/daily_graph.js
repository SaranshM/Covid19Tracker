function daily_graph()
{
    document.getElementsByClassName("daily")[0].style.opacity=1;
    document.getElementsByClassName("cum")[0].style.opacity=0.8;
    var place=document.getElementById("place_value").textContent;

    var for_state=place.split(" - ");
    console.log(for_state);
    if(for_state.length==1)
    {
        axios.post('http://localhost:3000/region/country', {place:place})
          .then(res => {
              console.log(res.data);
              display_charts(res.data.everyday,place,0);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
    }
}

function cum_graph()
{
    document.getElementsByClassName("daily")[0].style.opacity=0.8;
    document.getElementsByClassName("cum")[0].style.opacity=1;
    var place=document.getElementById("place_value").textContent;
    axios.post('http://localhost:3000/region/country', {place:place})
          .then(res => {
              console.log(res.data);
              display_charts(res.data.everyday,place);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
}