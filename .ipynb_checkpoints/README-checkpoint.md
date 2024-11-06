# **Leaflet Challenge**

## **Overview**
This project involves creating an interactive map to visualize earthquake data provided by the United States Geological Survey (USGS). The goal is to provide an intuitive, interactive visualization that helps users explore earthquake locations, magnitudes, and depths across the globe. The project also includes options to overlay tectonic plate boundaries to show correlations with seismic activity.

## **Table of Contents**:
* Installation
* Usage
* Features
* Data Sources
* Project Structure
* Technologies Used
* Future Enhancements

## **Project Structure**
* leaflet-challenge/

* Starter_Code
   * -Images
    * - index.html             # Main HTML file that loads the map
   * - static/
      * -- css/
       *   --- style.css      # CSS for map styling
       * -- js/
          * --- logic.js       # JavaScript logic to load and display earthquake data
* LICENSE
* README.md 
## **Installation**:
*  Clone this repository to your local machine:
      - "git clone https://github.com/yourusername/leaflet-challenge.git
"
*  Open the project directory:
     - "cd leaflet-challenge"

## **Usage**
*  Open index.html in your browser using a local server to enable fetching of GeoJSON data.
*  The map will load and display earthquake data from the past 7 days, fetched from the USGS API.
*  You can click on each earthquake marker for additional details, such as:
    * -Location
    * -Magnitude
    * -Depth

## **Interactive Features**
* -Magnitude Scaling: Earthquake markers scale in size based on magnitude, making larger earthquakes more prominent.
* -Depth Color Coding: Colors indicate the depth of the earthquake, from shallow (green) to deep (red).
* -Tectonic Plate Layer (Optional): Toggle tectonic plate boundaries on and off to explore relationships between seismic activity and tectonic boundaries.
* -Legend: A color-coded legend provides context for earthquake depths.

## **Features**
* -Earthquake Data Visualization: Real-time earthquake data is fetched from the USGS API, providing up-to-date information.
* -Interactive Markers: Each earthquake is represented by a color-coded, sized marker that users can click on for more information.
* -Depth Legend: A legend explains the color scheme used to represent earthquake depth.
* -Tectonic Plate Overlay: (Optional) An overlay of tectonic plate boundaries adds context to the seismic data.

## **Data Sources**
* -USGS Earthquake Data: Earthquake information is retrieved from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).
* -Tectonic Plate Boundaries (optional): Plate boundary data is sourced from the [GitHub Tectonic Plates repository](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## **Technologies Used**
* Leaflet.js: For interactive maps and data visualization.
* D3.js: For fetching and processing GeoJSON data from APIs.
* HTML/CSS/JavaScript: Front-end structure and styling.
* USGS API: Provides real-time earthquake data.
* Git & GitHub: Version control and code repository.

## **License**
This project is open-source and available under the MIT License.