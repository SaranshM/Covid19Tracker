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
  myChart1.fontSize=2;
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
}

function display_charts(everyday,country)
{
  var e_labels=[];
  var e_confirmed=[];
  var e_death=[];
  var e_recovered=[];
  var e_active=[]
  var i=0,j=0;
  for(i=0;i<everyday.length;i++)
  {
    j=i+1;
    e_labels.push("Day "+j);
    e_confirmed.push(everyday[i].confirmed);
    e_death.push(everyday[i].deaths);
    e_recovered.push(everyday[i].recovered);
    e_active.push(everyday[i].active);
  }
  

  display_states_confirmed(e_labels,e_confirmed,country);
  display_states_death(e_labels,e_death,country);
  display_states_active(e_labels,e_active,country);
  display_states_recovered(e_labels,e_recovered,country);
  
}