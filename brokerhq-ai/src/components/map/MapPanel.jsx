import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, useTheme, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Loader } from '@googlemaps/js-api-loader';
import { propertiesData } from '../../data/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: theme.shadows[5],
}));

const MapContainer = styled(Box)({
  flex: 1,
  minHeight: '400px',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
});

const MapPanel = ({ selectedRole }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const getSellProbColor = (score) => {
    if (score >= 75) return theme.palette.success.main; // success color
    if (score >= 50) return theme.palette.warning.main; // warning color
    return theme.palette.error.main; // error color
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        const google = await loader.load();
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 47.6062, lng: -122.3321 }, // Seattle coordinates
          zoom: 14,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ visibility: 'on' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
            },
          ],
        });

        setMap(mapInstance);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Add new markers based on selected role
    const data = propertiesData;
    const newMarkers = data.map(property => {
      const marker = new google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map,
        title: property.address,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: getSellProbColor(property.sellProb),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: Arial, sans-serif; max-width: 300px;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #333;">${property.address}</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <p style="margin: 0; color: #666;">
                <strong>Owner:</strong> ${property.owner}
              </p>
              <p style="margin: 0; color: #666;">
                <strong>Size:</strong> ${property.sf.toLocaleString()} SF
              </p>
              <p style="margin: 0; color: #666;">
                <strong>Occupancy:</strong> ${property.occupancy}%
              </p>
              <div style="display: inline-block; padding: 4px 8px; border-radius: 16px; background-color: ${getSellProbColor(property.sellProb)}; color: white; font-weight: bold;">
                Sell Probability: ${property.sellProb}%
              </div>
            </div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
    }
  }, [map, selectedRole]);

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Property Map
      </Typography>
      <MapContainer ref={mapRef} />
    </StyledPaper>
  );
};

export default MapPanel; 