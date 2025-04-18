import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ filteredData, viewMode, setSelectedObject }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Helper: Convert RA/Dec to [lat, lng] for Leaflet (Dec is latitude, RA as longitude)
  function celestialToLatLng(obj) {
    // RA in degrees: 0..360 mapped to -180..180 for Leaflet
    // Dec in degrees: -90..90 as latitude
    const lat = obj.Dec_deg || 0;
    let lng = obj.RA_deg || 0;
    if (lng > 180) lng -= 360;
    return [lat, lng];
  }

  // Helper: Generate a custom marker icon for stars/planets/constellations
  function getMarkerIcon(obj) {
    // Determine type and magnitude for styling
    const isPlanet = obj.types?.includes('planet');
    const isConstellation = obj.types?.includes('constellation');
    const vmag = obj.Vmag || 6;
    let className = '';
    let innerStyle = {};

    if (isPlanet) {
      className = `planet planet-${(obj.CommonName || obj.DisplayName || '').toLowerCase().replace(/\s/g, '')}`;
      innerStyle = { width: 10, height: 10, borderRadius: '50%' };
    } else if (isConstellation) {
      className = 'constellation-marker';
      innerStyle = { width: 8, height: 8, borderRadius: '50%', background: '#90cdf4' };
    } else {
      // Star: use magnitude for size/brightness
      let magClass = 'star-1';
      if (vmag < 2) magClass = 'star-3';
      else if (vmag < 4) magClass = 'star-2';
      className = `star ${magClass}`;
      innerStyle = { width: 4 + Math.max(0, 6 - vmag), height: 4 + Math.max(0, 6 - vmag), borderRadius: '50%', background: '#fff' };
    }

    return L.divIcon({
      className: className,
      html: `<div class="star-inner" style="
        width:${innerStyle.width}px;
        height:${innerStyle.height}px;
        border-radius:${innerStyle.borderRadius};
        background:${innerStyle.background || '#fff'};
        "></div>`,
      iconSize: [innerStyle.width, innerStyle.height],
      iconAnchor: [innerStyle.width / 2, innerStyle.height / 2],
      popupAnchor: [0, -innerStyle.height / 2]
    });
  }

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Create map
    leafletMapRef.current = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 8,
      attributionControl: false,
      zoomControl: true
    });

    // Add dark basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB',
      maxZoom: 19,
      className: 'dark-tiles'
    }).addTo(leafletMapRef.current);

    // Add style for custom markers if not present
    if (!document.getElementById('leaflet-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'leaflet-custom-styles';
      style.textContent = `
        .star-inner { background-color: white; border-radius: 50%; }
        .star-1 .star-inner{ width: 2px; height: 2px; box-shadow: 0 0 2px #fff; }
        .star-2 .star-inner{ width: 3px; height: 3px; box-shadow: 0 0 3px #fff9c4; }
        .star-3 .star-inner{ width: 4px; height: 4px; box-shadow: 0 0 4px #ffff00; }
        .planet-inner { border-radius: 50%; }
        .planet-mercury .planet-inner{ background-color: #b0bec5; }
        .planet-venus .planet-inner{ background-color: #ffd54f; }
        .planet-earth .planet-inner{ background-color: #81d4fa; }
        .planet-mars .planet-inner{ background-color: #e57373; }
        .planet-jupiter .planet-inner{ background-color: #ffcc80; }
        .planet-saturn .planet-inner{ background-color: #fff59d; }
        .planet-uranus .planet-inner{ background-color: #80deea; }
        .planet-neptune .planet-inner{ background-color: #7986cb; }
        .constellation-marker { background: #90cdf4; border-radius: 50%; }
        .constellation-line { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1; stroke-dasharray: 5, 5; }
      `;
      document.head.appendChild(style);
    }

    // Create a layer group for markers
    markersLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);

    // Clean up on unmount
    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
      document.getElementById('leaflet-custom-styles')?.remove();
    };
  }, []);

  // Update markers when filteredData changes
  useEffect(() => {
    if (!leafletMapRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    filteredData.forEach(obj => {
      const latlng = celestialToLatLng(obj);
      const marker = L.marker(latlng, {
        icon: getMarkerIcon(obj),
        title: obj.CommonName || obj.DisplayName || obj.Name
      });

      marker.on('click', () => setSelectedObject && setSelectedObject(obj));
      marker.bindPopup(`<strong>${obj.CommonName || obj.DisplayName || obj.Name}</strong><br/>Mag: ${obj.Vmag ?? ''}`);

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredData, setSelectedObject]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}
    />
  );
};

export default MapComponent;
