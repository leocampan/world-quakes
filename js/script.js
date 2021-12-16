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

function createTable() {
  $(document).ready(function () {
    var yearMonth = document.getElementById("month").value; // yyyy-mm

    var url =
      "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + yearMonth + "-01&endtime=" + yearMonth + "-" + days();
      // "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02"

    $.ajax({
      url,
    }).then(function (data) {
      var nDati;
      var s = "<table border='1'>";
      s +=
        "<tr> <th>Place </th> <th>Laitude</th> <th>Longiude</th> <th>Magnitude</th></tr>";
      nDati = data.features.length;

      var magnitude = document.getElementById("magnitude").value; 

      while (i = 0 && i < data.features.length) {
        if (data.features[i].properties.mag < (data.features[i].properties.mag + magnitude) && data.features[i].properties.mag > (data.features[i].properties.mag - magnitude)) {
          s +=
          "<tr><td>" +
          data.features[i].properties.place +
          "</td><td>" +
          data.features[i].geometry.coordinates[0] +
          "</td><td>" +
          data.features[i].geometry.coordinates[1] +
          "</td><td>" +
          data.features[i].properties.mag +
          "</td></tr>";
        }
        else {
          i++;
        }   
      }

      s += "</table>";

      document.getElementById("results").innerHTML = "Results: " + nDati;
      document.getElementById("content").innerHTML = s;
    });
  });
}


