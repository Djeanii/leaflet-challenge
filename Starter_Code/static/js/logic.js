// static/js/logic.js

// Create the map centered on the world with an appropriate zoom level
let map = L.map("map").setView([20, 0], 2);

// Add a tile layer (base map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the URL for the earthquake data in GeoJSON format
const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Define the URL for tectonic plates data
const tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Define a function to get color based on earthquake depth
function getColor(depth) {
  return depth > 90 ? '#ff5f65' :
         depth > 70 ? '#fca35d' :
         depth > 50 ? '#fdb72a' :
         depth > 30 ? '#f7db11' :
         depth > 10 ? '#dcf400' :
                      '#a3f600';
}

// Define a function to get radius based on magnitude
function getRadius(magnitude) {
  return magnitude === 0 ? 1 : magnitude * 4;
}

// Add the earthquake data to the map
let earthquakesLayer = null;  // Placeholder for earthquakes layer
d3.json(earthquakeUrl).then(data => {
  earthquakesLayer = L.geoJSON(data, {
    // For each feature (earthquake), create a circle marker
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]), // Use depth (3rd coordinate) for color
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.7
      });
    },
    // Bind popups with earthquake details
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
        <strong>Location:</strong> ${feature.properties.place}<br>
        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
        <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
      `);
    }
  }).addTo(map);
  
  // Add the legend to the map after adding the earthquake layer
  addLegend();
});

// Function to add a legend to the map
function addLegend() {
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const depths = [-10, 10, 30, 50, 70, 90];
    const colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];
    div.innerHTML = "<h4>Depth (km)</h4>";
    // Loop through depth intervals and create a label with a colored square for each interval
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(map);
}

// Load and add the tectonic plates data to the map
let tectonicPlatesLayer = null;  // Placeholder for tectonic plates layer
d3.json(tectonicPlatesUrl).then(data => {
  tectonicPlatesLayer = L.geoJSON(data, {
    style: {
      color: "#ff69b4",  // Choose a color to distinguish plate boundaries
      weight: 2
    }
  }).addTo(map);
});

// Create layer controls for the map
const baseMaps = {
  "Base Map": map
};

const overlayMaps = {
  "Earthquakes": earthquakesLayer,
  "Tectonic Plates": tectonicPlatesLayer
};

// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
