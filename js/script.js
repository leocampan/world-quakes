window.onload = function(){createTable()};

function createTable() {
    window.open("http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02").close();
    $(document).ready(function() {
    $.ajax({
        //url: "http://rest-service.guides.spring.io/greeting"
        url: "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
            //url: "http://earthquake.usgs.gov/fdsnws/event/1/version"
            //url: "http://earthquake.usgs.gov/fdsnws/event/1/count?starttime=2014-01-01&endtime=2014-01-02"
            //url: "http://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson"
    }).then(function(data) {
        //console.log(data.features.length);
        var nDati;
        var s = "<table border='1'>";
        s += '<tr>  <td>Place </td> <td>Laitude</td> <td>Longiude</td> </tr>';
        nDati = data.features.length;

        for (i = 0; i < data.features.length; i++) {
            // console.log(data.features[i].properties.place);
            s += '<tr><td>' + data.features[i].properties.place + '</td><td>' + data.features[i].geometry.coordinates[0] + '</td><td>' + data.features[i].geometry.coordinates[1] + '</td></tr>';
        }
        s += '</table>';
        //console.log(data);
        $('#totale').append(nDati);
        $('#contenuto').append(s);
    });
});
}