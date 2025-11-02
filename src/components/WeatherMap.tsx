import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Camera, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface WeatherMapProps {
  onLocationSelect: (lat: number, lon: number, locationName: string) => void;
  onImageAnalysis?: (analysis: string, location?: string) => void;
  currentLocation?: { lat: number; lon: number };
}

const WeatherMap = ({ onLocationSelect, onImageAnalysis, currentLocation }: WeatherMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map centered on India
    const map = L.map(mapContainer.current).setView([20.5937, 78.9629], 5);
    mapRef.current = map;

    // Add terrain base layer with labels
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      opacity: 0.8
    }).addTo(map);

    // Add color-coded cloud density layer
    // Blue = Low density (low risk)
    // Yellow/Green = Moderate density (moderate risk)
    // Orange/Red = High density (high risk)
    let cloudLayer: L.TileLayer | null = null;
    
    const loadCloudLayer = async () => {
      try {
        // Get available radar data for cloud density visualization
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await response.json();
        
        if (data.radar && data.radar.past && data.radar.past.length > 0) {
          // Get the most recent radar frame for cloud density
          const latestTimestamp = data.radar.past[data.radar.past.length - 1].path;
          
          // Remove old layer if exists
          if (cloudLayer) {
            map.removeLayer(cloudLayer);
          }
          
          // Add radar layer with proper color coding for cloud density
          // Color scheme: 2 = colored (blue→yellow→orange→red based on intensity)
          // Smooth: 1 = smooth rendering
          cloudLayer = L.tileLayer(
            `https://tilecache.rainviewer.com${latestTimestamp}/512/{z}/{x}/{y}/2/1_1.png`,
            {
              attribution: 'RainViewer.com',
              opacity: 0.8,
              maxZoom: 18,
            }
          );
          cloudLayer.addTo(map);
        }
      } catch (error) {
        console.error('Error loading cloud data:', error);
      }
    };

    loadCloudLayer();
    
    // Refresh cloud layer every 2 minutes
    const refreshInterval = setInterval(() => {
      loadCloudLayer();
    }, 120000);

    // Handle map clicks - capture screenshot and analyze
    map.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Capture map screenshot for analysis
      captureAndAnalyzeMap(lat, lng);
      
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

  const captureAndAnalyzeMap = async (lat?: number, lng?: number) => {
    if (!mapContainer.current) return;
    
    setIsAnalyzing(true);
    try {
      toast({
        title: "Capturing Image",
        description: "Taking screenshot of the map for analysis...",
      });

      // Capture the map as an image
      const canvas = await html2canvas(mapContainer.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imageBase64 = canvas.toDataURL('image/png');
      
      // Get location name if coordinates provided
      let locationName = '';
      if (lat && lng) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          locationName = data.display_name || `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
        } catch (error) {
          console.error("Geocoding error:", error);
          locationName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
        }
      }

      toast({
        title: "Analyzing Image",
        description: "AI is analyzing the weather patterns...",
      });

      // Send to edge function for AI analysis
      const { data, error } = await supabase.functions.invoke('analyze-cloudburst', {
        body: { imageBase64, location: locationName }
      });

      if (error) {
        console.error('Analysis error:', error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Failed to analyze the image",
          variant: "destructive",
        });
        return;
      }

      if (data?.analysis) {
        toast({
          title: "Analysis Complete",
          description: "Cloudburst prediction generated successfully",
        });
        onImageAnalysis?.(data.analysis, data.location);
      }
    } catch (error) {
      console.error('Capture error:', error);
      toast({
        title: "Error",
        description: "Failed to capture or analyze the map",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      toast({
        title: "Processing Image",
        description: "Preparing image for analysis...",
      });

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageBase64 = e.target?.result as string;

        toast({
          title: "Analyzing Image",
          description: "AI is analyzing the weather patterns...",
        });

        const { data, error } = await supabase.functions.invoke('analyze-cloudburst', {
          body: { imageBase64, location: 'Uploaded Image' }
        });

        if (error) {
          console.error('Analysis error:', error);
          toast({
            title: "Analysis Failed",
            description: error.message || "Failed to analyze the image",
            variant: "destructive",
          });
          return;
        }

        if (data?.analysis) {
          toast({
            title: "Analysis Complete",
            description: "Cloudburst prediction generated successfully",
          });
          onImageAnalysis?.(data.analysis, data.location);
        }
        
        setIsAnalyzing(false);
      };

      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read the image file",
          variant: "destructive",
        });
        setIsAnalyzing(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to process the image",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl">AI-Powered Cloudburst Analysis</CardTitle>
            <CardDescription>
              Click on the map to capture and analyze weather patterns • Upload your own satellite images
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleGetCurrentLocation}
              disabled={isLoadingLocation || isAnalyzing}
              variant="outline"
              size="sm"
            >
              {isLoadingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  My Location
                </>
              )}
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              variant="outline"
              size="sm"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <Button
              onClick={() => captureAndAnalyzeMap()}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
              size="sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Analyze Current View
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleManualUpload}
          className="hidden"
        />
        <div 
          ref={mapContainer} 
          className="w-full h-[500px] rounded-lg overflow-hidden border border-primary/20"
          style={{ background: '#1a1a1a' }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Click anywhere to analyze that area • Cloud Formation Map: Blue (Low Risk) → Yellow (Moderate Risk) → Orange/Red (High Risk) • AI analyzes patterns for cloudburst prediction
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
