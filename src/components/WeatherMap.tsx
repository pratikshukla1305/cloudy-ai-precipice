import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";

interface WeatherMapProps {
  onLocationSelect: (lat: number, lon: number, locationName: string) => void;
  currentLocation?: { lat: number; lon: number };
}

const WeatherMap = ({ onLocationSelect, currentLocation }: WeatherMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map centered on India
    const map = L.map(mapContainer.current).setView([20.5937, 78.9629], 5);
    mapRef.current = map;

    // Add dark base layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '© OpenStreetMap contributors, © CARTO',
      maxZoom: 18,
    }).addTo(map);

    // Add Indian Satellite imagery overlay (INSAT-3D IR channel)
    // This shows actual cloud formations over India
    const satelliteOverlay = L.imageOverlay(
      'https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg',
      [[0, 40], [40, 120]], // Bounds for India region
      {
        opacity: 0.7,
        attribution: 'India Meteorological Department (IMD)'
      }
    );
    satelliteOverlay.addTo(map);

    // Refresh satellite image every 30 seconds
    const refreshInterval = setInterval(() => {
      const timestamp = new Date().getTime();
      satelliteOverlay.setUrl(`https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg?t=${timestamp}`);
    }, 30000);

    // Handle map clicks
    map.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Add or update marker
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })
        }).addTo(map);
      }

      // Reverse geocode to get location name
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        const locationName = data.display_name || `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
        onLocationSelect(lat, lng, locationName);
      } catch (error) {
        console.error("Geocoding error:", error);
        onLocationSelect(lat, lng, `${lat.toFixed(2)}, ${lng.toFixed(2)}`);
      }
    });

    return () => {
      clearInterval(refreshInterval);
      map.remove();
      mapRef.current = null;
    };
  }, [onLocationSelect]);

  // Update marker when current location changes
  useEffect(() => {
    if (currentLocation && mapRef.current) {
      if (markerRef.current) {
        markerRef.current.setLatLng([currentLocation.lat, currentLocation.lon]);
      } else {
        markerRef.current = L.marker([currentLocation.lat, currentLocation.lon], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })
        }).addTo(mapRef.current);
      }
      mapRef.current.setView([currentLocation.lat, currentLocation.lon], 10);
    }
  }, [currentLocation]);

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const locationName = data.display_name || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
            onLocationSelect(latitude, longitude, locationName);
          } catch (error) {
            console.error("Geocoding error:", error);
            onLocationSelect(latitude, longitude, `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          }
          
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to get your location. Please click on the map to select a location.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLoadingLocation(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Interactive Weather Map</CardTitle>
            <CardDescription>
              Click anywhere on the map to get real-time weather predictions with satellite cloud overlay
            </CardDescription>
          </div>
          <Button
            onClick={handleGetCurrentLocation}
            disabled={isLoadingLocation}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
          >
            {isLoadingLocation ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Use My Location
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapContainer} 
          className="w-full h-[500px] rounded-lg overflow-hidden border border-primary/20"
          style={{ background: '#1a1a1a' }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Real-time INSAT-3D satellite imagery showing actual cloud formations over India • Updates every 30 seconds
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
