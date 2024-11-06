// static/js/logic.js

// Create the map centered on the world with an appropriate zoom level
let map = L.map("map").setView([20, -100], 3);

// Define base layers
const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
});

const satelliteMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenTopoMap contributors'
}).addTo(map);

const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; CartoDB contributors'
});

// Define the URLs for earthquake and tectonic plates data
const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Define a function to get color based on earthquake depth
function getColor(depth) {
  return depth > 90 ? '#DC143C' :
         depth > 70 ? '#fca35d' :
         depth > 50 ? '#4169E1' :
         depth > 30 ? '#f7db11' :
         depth > 10 ? '#dcf400' :
                      '#a3f600';
}

// Define a function to get radius based on magnitude
function getRadius(magnitude) {
  return magnitude === 0 ? 1 : magnitude * 3;
}

// Initialize earthquake layer
let earthquakesLayer = null;

// Load earthquake data and add to map
d3.json(earthquakeUrl).then(data => {
  earthquakesLayer = L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.7
      });
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
        <strong>Location:</strong> ${feature.properties.place}<br>
        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
        <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
      `);
    }
  }).addTo(map);

  // Fit the map to the earthquake layer bounds
  map.fitBounds(earthquakesLayer.getBounds());

  // Add the legend to the map after adding the earthquake layer
  addLegend();
});

// Function to add a legend to the map
function addLegend() {
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const depths = [-10, 10, 30, 50, 70, 90];
    const colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#DC143C"];
    div.innerHTML = "<h4>Depth (km)</h4>";
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(map);
}

// Load and add tectonic plates data to the map
let tectonicPlatesLayer = null;
d3.json(tectonicPlatesUrl).then(data => {
  tectonicPlatesLayer = L.geoJSON(data, {
    style: {
      color: "#32CD32",
      weight: 2
    }
  }).addTo(map);
  
  // Fit the map to both layers' bounds
  map.fitBounds(tectonicPlatesLayer.getBounds());
});

// Define base and overlay layers for the layer control
const baseMaps = {
  "Street Map": streetMap,
  "Satellite": satelliteMap,
  "Dark Map": darkMap
};

const overlayMaps = {
  "Earthquakes": earthquakesLayer,
  "Tectonic Plates": tectonicPlatesLayer
};

// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
