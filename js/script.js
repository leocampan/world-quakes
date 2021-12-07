window.onload = function () {
  createTable();
};

function createTable() {
  $(document).ready(function () {
    $.ajax({
      url: "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02",
    }).then(function (data) {
      var nDati;
      var s = "<table border='1'>";
      s += "<tr>  <td>Place </td> <td>Laitude</td> <td>Longiude</td> </tr>";
      nDati = data.features.length;

      for (i = 0; i < data.features.length; i++) {
        s +=
          "<tr><td>" +
          data.features[i].properties.place +
          "</td><td>" +
          data.features[i].geometry.coordinates[0] +
          "</td><td>" +
          data.features[i].geometry.coordinates[1] +
          "</td></tr>";
      }
      
      s += "</table>";
      $("#totale").append(nDati);
      $("#contenuto").append(s);
    });
  });
}
