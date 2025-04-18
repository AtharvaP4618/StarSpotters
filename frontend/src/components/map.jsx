import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ filteredData, viewMode, setSelectedObject }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // if (!mapRef.current || map) return;
    if (!mapRef.current || mapRef.current._leaflet_id != null) return;

    const mapInstance = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 3,
      minZoom: 1,
      maxZoom: 8,
      attributionControl: false,
      zoomControl: true
    });
  
    setMap(mapInstance);
  
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB',
      maxZoom: 19,
      className: 'dark-tiles'
    }).addTo(mapInstance);
  
    if (!document.getElementById('leaflet-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'leaflet-custom-styles';
      style.textContent = `
      .leaflet-marker-icon .star, 
        .leaflet-marker-icon .planet {
          display: block !important;
        }
        .star-inner { background-color: white; border-radius: 50%; }
        .star-1 .star-inner{ width: 2px; height: 2px; box-shadow: 0 0 2px #fff; }
        .star-2 .star-inner{ width: 3px; height: 3px; box-shadow: 0 0 3px #fff9c4; }
        .star-3 .star-inner{ width: 4px; height: 4px; box-shadow: 0 0 4px #ffff00; }
        .-inner { border-radius: 50%; box-shadow: 0 0 8px; }
        .planet-mercury .planet-inner{ background-color: #b0bec5; }
        .planet-venus .planet-inner{ background-color: #ffd54f; }
        .planet-earth .planet-inner{ background-color: #81d4fa; }
        .planet-mars .planet-inner{ background-color: #e57373; }
        .planet-jupiter .planet-inner{ background-color: #ffcc80; }
        .planet-saturn .planet-inner{ background-color: #fff59d; }
        .planet-uranus .planet-inner{ background-color: #80deea; }
        .planet-neptune .planet-inner{ background-color: #7986cb; }
        .constellation-line { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1; stroke-dasharray: 5, 5; }
      `;
      document.head.appendChild(style);
    }
  
    return () => {
      if (mapInstance) {
        mapInstance.remove();
        document.getElementById('leaflet-custom-styles')?.remove();
      }
    };
  }, [map]);

    // const mapInstance = L.map(mapRef.current, {
    //   center: [0, 0],
    //   zoom: 3,
    //   minZoom: 1,
    //   maxZoom: 8,
    //   attributionControl: false,
    //   zoomControl: true
    // });

    // setMap(mapInstance); // Save map instance to state

    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; CartoDB',
    //   maxZoom: 19,
    //   className: 'dark-tiles'
    // }).addTo(mapInstance);

    // // Inject CSS styling

    // if (!document.getElementById('leaflet-custom-styles')) {
    //   const style = document.createElement('style');
    //   style.id = 'leaflet-custom-styles';
  //     style.textContent = `
  //       .leaflet-marker-icon .star, 
  //       .leaflet-marker-icon .planet {
  //         display: block !important;
  //       }
  //       .star { background-color: white; border-radius: 50%; }
  //       .star-1 { width: 2px; height: 2px; box-shadow: 0 0 2px #fff; }
  //       .star-2 { width: 3px; height: 3px; box-shadow: 0 0 3px #fff9c4; }
  //       .star-3 { width: 4px; height: 4px; box-shadow: 0 0 4px #ffff00; }
  //       .planet { border-radius: 50%; box-shadow: 0 0 8px; }
  //       .planet-mercury { background-color: #b0bec5; }
  //       .planet-venus { background-color: #ffd54f; }
  //       .planet-earth { background-color: #81d4fa; }
  //       .planet-mars { background-color: #e57373; }
  //       .planet-jupiter { background-color: #ffcc80; }
  //       .planet-saturn { background-color: #fff59d; }
  //       .planet-uranus { background-color: #80deea; }
  //       .planet-neptune { background-color: #7986cb; }
  //       .constellation-line { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1; stroke-dasharray: 5, 5; }
  //     `;
  //   document.head.appendChild(style);
  // }

    // const style = document.createElement('style');
    // style.id = 'leaflet-custom-icons';
    // style.textContent = ``
    //   .star { background-color: white; border-radius: 50%; }
    //   .star-1 { width: 2px; height: 2px; box-shadow: 0 0 2px #fff; }
    //   .star-2 { width: 3px; height: 3px; box-shadow: 0 0 3px #fff9c4; }
    //   .star-3 { width: 4px; height: 4px; box-shadow: 0 0 4px #ffff00; }
    //   .planet { border-radius: 50%; box-shadow: 0 0 8px; }
    //   .planet-mercury { background-color: #b0bec5; }
    //   .planet-venus { background-color: #ffd54f; }
    //   .planet-earth { background-color: #81d4fa; }
    //   .planet-mars { background-color: #e57373; }
    //   .planet-jupiter { background-color: #ffcc80; }
    //   .planet-saturn { background-color: #fff59d; }
    //   .planet-uranus { background-color: #80deea; }
    //   .planet-neptune { background-color: #7986cb; }
    //   .constellation-line { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1; stroke-dasharray: 5, 5; }
    // `;
    // document.head.appendChild(style);

  //   return () => {
  //     if (mapInstance) {
  //       mapInstance.remove();
  //       document.getElementById('leaflet-custom-styles')?.remove();
  //     }
  //   };

  useEffect(() => {
    if (!map) return;

    // Clearing previous layers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });


    filteredData.forEach(obj => {
      let icon = null;

      if (obj.types?.includes('planet')) {
        icon = L.divIcon({
          html: '<div class="planet-inner"></div>.planet-inner', // Must match CSS class
          className: `leaflet-custom-icon planet planet-${obj.class_suffix}`, 
          iconSize: [8, 8],
          iconAnchor: [4, 4]
        });
      }
      else if (obj.types?.some(t => t === '*' || t.toLowerCase().includes('star'))) {
        const mag = parseFloat(obj.Vmag || obj.VMag || obj.magnitude || 3.0);
        const starClass = mag <= 1.8 ? 'star-3' : mag <= 2.5 ? 'star-2' : 'star-1';
        icon = L.divIcon({
          html: '<div class="star-inner"></div>', // Must match CSS class
          className: `star ${starClass}`,   // Applies size classes
          iconSize: [4, 4],
          iconAnchor: [2, 2]
        });
      }

      // if (obj.type === 'star') {
      //   const mag = parseFloat(obj.magnitude || 3.0);
      //   const starClass = mag <= 1.8 ? 'star-3' : mag <= 2.5 ? 'star-2' : 'star-1';
      //   icon = L.divIcon({ html: '<div class="star"></div>',className: `star ${starClass}`, iconSize: [4, 4], iconAnchor: [2, 2] });
      // }
      // else if (obj.types?.includes('planet')) {
      //   const planetSlug = obj.CommonName?.toLowerCase().replace(/\s+/g, '-');
      //   // const planetClass = `planet planet-${planetSlug}`;
      //   const planetClass = `planet planet-${obj.class_suffix}`;
      //   icon = L.divIcon({ html: '<div class="planet"></div>',className: planetClass, iconSize: [8, 8], iconAnchor: [4, 4] });
      // }
      // else if (obj.types?.some(t => t === '*' || t.toLowerCase().includes('star'))) {
      //   const mag = parseFloat(obj.Vmag || obj.VMag || obj.magnitude || 3.0);
      //   const starClass = mag <= 1.8 ? 'star-3' : mag <= 2.5 ? 'star-2' : 'star-1';
      //   icon = L.divIcon({ className: `star ${starClass}`, iconSize: [4, 4], iconAnchor: [2, 2] });
      // }

      // if (icon && obj.dec != null && obj.ra != null) {
      //   const marker = L.marker([obj.dec, obj.ra], { icon })
      if (icon && obj.Dec_deg != null && obj.RA_deg != null) {
        const marker = L.marker([obj.Dec_deg, obj.RA_deg], { icon })
        
          .addTo(map)
          .bindPopup(`
            <div class="text-sm text-white">
              <strong>${obj.name || 'Unnamed'}</strong><br/>
              <strong>${obj.CommonName || obj.DisplayName || 'Unnamed'}</strong><br/>
              Type: ${(obj.types && obj.types.join(', ')) || 'N/A'}<br/>
              Mag: ${obj.Vmag || obj.VMag || obj.magnitude || 'N/A'}<br/>

              Distance: ${obj.distance || 'N/A'} ly
            </div>
          `);

        marker.on('click', () => setSelectedObject(obj));
      }

      if (viewMode === 'constellations' && obj.lines) {
        obj.lines.forEach(line => {
          const [start, end] = line;
          L.polyline([start, end], { color: 'white', weight: 1, dashArray: '4 4' }).addTo(map);
        });
      }
    });
  }, [filteredData, viewMode, map, setSelectedObject]);

  return <div ref={mapRef} className="h-full w-full rounded-xl shadow-lg" />;
};

export default MapComponent;
