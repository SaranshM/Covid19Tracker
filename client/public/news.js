function display_news(data)
{
  console.log(data);
  document.getElementsByClassName("news_wrap")[0].style.display='block';
  document.getElementsByClassName("news_main_update")[0].innerHTML= '(Updated '+ data.updated + ')';
  news=data.items;
  var i=0;
  for(i=0;i<7;i++)
  {
    var title=news[i].title;
    var updated=news[i].updated;
    var link=news[i].link;
    document.getElementsByClassName("news_link")[i].innerHTML=title;
    document.getElementsByClassName("news_link")[i].href=link;
    document.getElementsByClassName("news_update")[i].innerHTML=updated;
  }
}