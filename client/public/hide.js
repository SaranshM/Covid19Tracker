function hide_everything(){
    document.getElementById("data_wrap").style.display="none";
    document.getElementById("loading").style.display="none";
    document.getElementsByClassName("table-fill")[0].style.display="none";
    document.getElementsByClassName("news_wrap")[0].style.display="none";
  }

  function hide(){
    document.getElementById('loading').style.display="block";
    document.getElementById('data_wrap').style.display="none";
    document.getElementsByClassName('table-fill')[0].style.display="none";
    document.getElementById("error").innerHTML="";
    document.getElementById("error1").style.display="none";
  }