window.onload = function(){tabellaoggi()};

function days() {
  var yearMonth = document.getElementById("month").value; // yyyy-mm
  var month = yearMonth.slice(5, 7); // mm
  var days = 0;

  switch (month) {
    case '01':
      days = 31;
      break;
    case '02':
      days = 28;
      break;
    case '03':
      days = 31;
      break;
    case '04':
      days = 30;
      break;
    case '05':
      days = 31;
      break;
    case '06':
      days = 30;
      break;
    case '07':
      days = 31;
      break;
    case '08':
      days = 31;
      break;
    case '09':
      days = 30;
      break;
    case '10':
      days = 31;
      break;
    case '11':
      days = 30;
      break;
    case '12':
      days = 31;
      break;
  }

  return days;
}

function tabellaoggi() {
  $(document).ready(function () {
    var today = new Date();
    var todaydate = today.getFullYear() + '-' + (today.getMonth() + 1)+'-'+today.getDate(); // yyyy-mm-dd

    var todayyearmonth = todaydate.slice(0, 6); // yyyy-mm
    var todayday = todaydate.slice(7, 10); // dd

    var url =
      "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + todayyearmonth + "-01&endtime=" + todayyearmonth + "-" + todayday;
    // "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02"
    $.ajax({
      url,
    }).then(function (data) {
      puntitrovati=new Array();
      var nDati;
      var s = "<table border= 1px>";
      s += "<tr> <th>Date</th> <th>Place</th> <th>Magnitude</th></tr>";
      nDati = data.features.length;
      var nrighe = 0;

      for (i = 0; i < nDati; i++) {
        var sec = data.features[i].properties.time;
        var dateComplete = new Date(sec);
        var date = dateComplete.toString().slice(3, 24);
        var mag = document.getElementById("magnitude").value;
        var valMag = parseFloat(mag);
        var range = document.getElementById("range").value;
        var valRange =  parseFloat(range);
        var stato = document.getElementById("state").toUpperCase;

        s += "<tr><td>" + 
        date +"</td><td>" + 
        data.features[i].properties.place + "</td><td>" +
        data.features[i].properties.mag + "</td></tr>";
        nrighe ++;
        puntitrovati.push(data.features[i].geometry.coordinates[0])
        puntitrovati.push(data.features[i].geometry.coordinates[1]) 
      }
          s += "</table>";
          mappaPunti();
      document.getElementById("results").innerHTML = "Results: " + nrighe;
      document.getElementById("content").innerHTML = s;
    });
  });
}



function mappaPunti() {
  var frame = document.getElementById('mappa');
  frame.contentWindow.postMessage(puntitrovati, '*');
}

function createTable() {
  $(document).ready(function () {
    var yearMonth = document.getElementById("month").value; // yyyy-mm
    var url =
      "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + yearMonth + "-01&endtime=" + yearMonth + "-" + days();
    // "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02"
    $.ajax({
      url,
    }).then(function (data) {
      puntitrovati=new Array();
      var nDati;
      var s = "<table border= 1px>";
      s += "<tr> <th>Date</th> <th>Place</th> <th>Magnitude</th></tr>";
      nDati = data.features.length;
      var nrighe = 0;

      for (i = 0; i < nDati; i++) {
        var sec = data.features[i].properties.time;
        var dateComplete = new Date(sec);
        var date = dateComplete.toString().slice(3, 24);
        var mag = document.getElementById("magnitude").value;
        var valMag = parseFloat(mag);
        var range = document.getElementById("range").value;
        var valRange =  parseFloat(range);
        var stato = document.getElementById("state").value;
       
        
        if (stato && !data.features[i].properties.place.toUpperCase().includes(stato.toUpperCase())) {
          continue;
        }

        if (data.features[i].properties.mag <= (valMag + valRange) && data.features[i].properties.mag >= (valMag - valRange)) {
          s += "<tr><td>" + 
          date +"</td><td>" + 
          data.features[i].properties.place + "</td><td>" +
          data.features[i].properties.mag + "</td></tr>";
          nrighe ++;
          puntitrovati.push(data.features[i].geometry.coordinates[0])
          puntitrovati.push(data.features[i].geometry.coordinates[1])
        }  

        
      }
      s += "</table>";
      mappaPunti();
      document.getElementById("results").innerHTML = "Results: " + nrighe;
      document.getElementById("content").innerHTML = s;
    });
  });
}

function datestable() {
  $(document).ready(function () {
    
    var date1 = document.getElementById("date1").value; // yyyy-mm-dd
    var date2 = document.getElementById("date2").value;

    var day1 = date1.slice(8, 10);
    var day2 = date2.slice(8, 10);

    var yearMonth1 = date1.slice(0, 7);
    var yearMonth2 = date2.slice(0, 7);

    console.log(yearMonth1);

    var url =
      "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + yearMonth1 + "-"+ day1 +"&endtime=" + yearMonth2 + "-" + day2;
    // "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02"
    $.ajax({
      url,
    }).then(function (data) {
      puntitrovati=new Array();
      var nDati;
      var s = "<table border= 1px>";
      s += "<tr> <th>Date</th> <th>Place</th> <th>Magnitude</th></tr>";
      nDati = data.features.length;
      var nrighe = 0;

      for (i = 0; i < nDati; i++) {
        var sec = data.features[i].properties.time;
        var dateComplete = new Date(sec);
        var date = dateComplete.toString().slice(3, 24);
        var mag = document.getElementById("magnitude").value;
        var valMag = parseFloat(mag);
        var range = document.getElementById("range").value;
        var valRange =  parseFloat(range);
       
          s += "<tr><td>" + 
          date +"</td><td>" + 
          data.features[i].properties.place + "</td><td>" +
          data.features[i].properties.mag + "</td></tr>";
          nrighe ++;
          puntitrovati.push(data.features[i].geometry.coordinates[0])
          puntitrovati.push(data.features[i].geometry.coordinates[1])
      }
      s += "</table>";
      mappaPunti();
      document.getElementById("results").innerHTML = "Results: " + nrighe;
      document.getElementById("content").innerHTML = s;
    });
  });
}




