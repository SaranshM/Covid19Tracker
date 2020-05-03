var myChart1;
var myChart2;
var myChart3;
var myChart4;
function display_states_confirmed(e_labels,e_confirmed,country)
{
  if (myChart1) {
    myChart1.destroy();
  }
  var ctx=document.getElementById('myChart1');
  myChart1=new Chart(ctx, {
    type: 'line',
    data: {
      labels: e_labels,
      datasets: [{ 
          data: e_confirmed,
          label: country,
          borderColor: "#3e95cd",
          fill: false
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Confirmed Cases',
        fontColor:"black",
        fontSize:20
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            } 
        }],
      xAxes: [{
            ticks: {
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize:15
        }
      } 
    }
  });
  if(screen.width<=415)
  {
    myChart1.options.title.fontSize=10;
    myChart1.options.scales.yAxes[0].ticks.fontSize=8;
    myChart1.options.scales.xAxes[0].ticks.fontSize=8;
    myChart1.options.legend.labels.fontSize=10;
  }

}

function display_states_death(e_labels,e_death,country)
{
  if (myChart2) {
    myChart2.destroy();
  }
  var ctx=document.getElementById('myChart2');
  myChart2=new Chart(ctx, {
    type: 'line',
    data: {
      labels: e_labels,
      datasets: [{ 
          data: e_death,
          label: country,
          borderColor: "rgba(164, 6, 6,1)",
          fill: false
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Death',
        fontColor:"black",
        fontSize:20
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }],
      xAxes: [{
            ticks: {
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize:15
        }
      } 
    }
  });
  if(screen.width<=415)
  {
    myChart2.options.title.fontSize=10;
    myChart2.options.scales.yAxes[0].ticks.fontSize=8;
    myChart2.options.scales.xAxes[0].ticks.fontSize=8;
    myChart2.options.legend.labels.fontSize=10;
  }
}

function display_states_active(e_labels,e_active,country)
{
  if (myChart3) {
    myChart3.destroy();
  }
  var ctx=document.getElementById('myChart3');
  myChart3=new Chart(ctx, {
    type: 'line',
    data: {
      labels: e_labels,
      datasets: [{ 
          data: e_active,
          label: country,
          borderColor: "rgba(251, 176, 52,1)",
          fill: false
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Active Cases',
        fontColor:"black",
        fontSize:20
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }],
      xAxes: [{
            ticks: {
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize:15
        }
      } 
    }
  });
  if(screen.width<=415)
  {
    myChart3.options.title.fontSize=10;
    myChart3.options.scales.yAxes[0].ticks.fontSize=8;
    myChart3.options.scales.xAxes[0].ticks.fontSize=8;
    myChart3.options.legend.labels.fontSize=10;
  }
}

function display_states_recovered(e_labels,e_recovered,country)
{
  
  if (myChart4) {
    myChart4.destroy();
  }
  
  var ctx=document.getElementById('myChart4');
  myChart4=new Chart(ctx, {
    type: 'line',
    data: {
      labels: e_labels,
      datasets: [{ 
          data: e_recovered,
          label: country,
          borderColor: "#19a186",
          fill: false
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Recovered',
        fontColor:"black",
        fontSize:20
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }],
      xAxes: [{
            ticks: {
                fontColor: 'black'
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
        }]
      },
      legend: {
        labels: {
          fontColor: 'black',
          fontSize:15
        }
      } 
    }
  });
  if(screen.width<=415)
  {
    myChart4.options.title.fontSize=10;
    myChart4.options.scales.yAxes[0].ticks.fontSize=8;
    myChart4.options.scales.xAxes[0].ticks.fontSize=8;
    myChart4.options.legend.labels.fontSize=10;
  }
}

function display_charts(everyday,country,val=1)
{
  var e_labels=[];
  var e_confirmed=[];
  var e_death=[];
  var e_recovered=[];
  var e_active=[];
  var i=0,j=0;
  if(val==1)
  {
    document.getElementsByClassName("daily")[0].style.opacity=0.8;
    document.getElementsByClassName("cum")[0].style.opacity=1;
    for(i=0;i<everyday.length;i++)
    {
      j=i+1;
      e_labels.push("Day "+j);
      e_confirmed.push(everyday[i].confirmed);
      e_death.push(everyday[i].deaths);
      e_recovered.push(everyday[i].recovered);
      e_active.push(everyday[i].active);
    }
  }
  if(val==0)
  {
    document.getElementsByClassName("daily")[0].style.opacity=1;
    document.getElementsByClassName("cum")[0].style.opacity=0.8;
    for(i=1;i<everyday.length;i++)
    {
      j=i+1;
      e_labels.push("Day "+j);
      e_confirmed.push(Math.max(everyday[i].confirmed-everyday[i-1].confirmed,0));
      e_death.push(Math.max(everyday[i].deaths-everyday[i-1].deaths,0));
      e_recovered.push(Math.max(everyday[i].recovered-everyday[i-1].recovered,0));
      e_active.push(everyday[i].active);
    }
  }
  

  display_states_confirmed(e_labels,e_confirmed,country);
  display_states_death(e_labels,e_death,country);
  display_states_active(e_labels,e_active,country);
  display_states_recovered(e_labels,e_recovered,country);
  
}