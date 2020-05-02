/* Location access */

function location_track()
{

  if (navigator.geolocation) {
    var flag=0;
    navigator.geolocation.getCurrentPosition(function(position){
      flag=1;
      $.get( "https://us1.locationiq.com/v1/reverse.php?key=4a41aec453de57&lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&format=json&zoom=5", function(data) {
        console.log(data.address.country);
        axios.post('http://localhost:3000/region/country', {place:data.address.country})
          .then(res => {
              console.log(res.data);
              return display_data(res.data);
              
          }).catch(()=>{
            console.log("Location denied.");
          });
      })
    },function(error){
      if(error.code==error.PERMISSION_DENIED)
      {
        axios.post('http://localhost:3000/region/world',{world:"world"})
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



function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function change_search_bar(place){
  document.getElementsByTagName('input')[0].value=place;
}

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

  

  

   