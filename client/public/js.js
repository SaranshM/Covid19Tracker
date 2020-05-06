/* Location access */

function location_track()
{

  if (navigator.geolocation) {
    var flag=0;
    navigator.geolocation.getCurrentPosition(function(position){
      flag=1;
      $.get( "https://us1.locationiq.com/v1/reverse.php?key=4a41aec453de57&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&format=json&zoom=5", function(data) {
        // console.log(data.address.country);
        axios.post('/region/country', {place:data.address.country})
          .then(res => {
              // console.log(res.data);
              return display_data(res.data);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
      })
    },function(error){
      if(error.code==error.PERMISSION_DENIED)
      {
        axios.post('/region/world',{world:"world"})
            .then(res => {
              console.log(res.data);
              return display_data(res.data);
            }
        );
      }
    });
  }
}

/*-----------*/

//In the below function work is the id of input field (in this case myInput) and myfunc() is the function to be called on pressing enter

document.getElementById("myInput").addEventListener("keyup",function(event){
  event.preventDefault();
  if(event.keyCode===13)
  {
    search_place();
  }
  
  });

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function change_search_bar(place){
  document.getElementsByTagName('input')[0].value=place;
}


  var button=document.getElementsByTagName("form")[0];
  button.addEventListener('submit',(e)=>{
    e.preventDefault();
    search_place();

  });

  function search_place()
  {
    hide();
    var placex=document.getElementsByTagName('input')[0].value;
    axios.post('/region/country', {place:placex})
            .then(res => {
              if(res.data.state)
              {
                return display_state_data(res.data);
              }
              return display_data(res.data);
            }
    );
  }

  

  

   