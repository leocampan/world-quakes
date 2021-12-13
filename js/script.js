function createTable() {

  $(document).ready(function () {

    // if (document.getElementById("#content").value != null && document.getElementById("#results").value != null) {
    //   document.getElementById("#content") == null;
    //   document.getElementById("#results") == null;
    // }

    var yearMonth = document.getElementById('month').value;
    var url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + yearMonth + "-01&endtime=" + yearMonth + "-02";

    $.ajax({
      url,
    }).then(function (data) {

      var nDati;
      var s = "<table border='1'>";
      s += "<tr> <th>Place </th> <th>Laitude</th> <th>Longiude</th> <th>Magnitude</th></tr>";
      nDati = data.features.length;


      for (i = 0; i < data.features.length; i++) {
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

      s += "</table>";
      $("#results").append(nDati);
      $("#content").append(s);
    });
  });
}


// "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02"