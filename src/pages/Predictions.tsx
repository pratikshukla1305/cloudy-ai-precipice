import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeatherMap from "@/components/WeatherMap";
import ForecastSection from "@/components/ForecastSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Gauge, ThermometerSun, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WEATHER_API_KEY = "528364a20a4ccb50c02541e94890b7fa";
const WEATHER_API_URL = "https://api.weatherstack.com/current";

const Predictions = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["weather", selectedLocation],
    queryFn: async () => {
      const query = selectedLocation 
        ? `${selectedLocation.lat},${selectedLocation.lon}`
        : "New Delhi";
      
      const response = await fetch(
        `${WEATHER_API_URL}?access_key=${WEATHER_API_KEY}&query=${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      return response.json();
    },
  });

  const handleLocationSelect = (lat: number, lon: number, locationName: string) => {
    setSelectedLocation({ lat, lon, name: locationName });
  };

  const metrics = [
    {
      icon: ThermometerSun,
      label: "Temperature",
      value: weatherData?.current?.temperature || "--",
      unit: "°C",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: weatherData?.current?.humidity || "--",
      unit: "%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: weatherData?.current?.wind_speed || "--",
      unit: "km/h",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: weatherData?.current?.pressure || "--",
      unit: "mb",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Cloud,
      label: "Cloud Cover",
      value: weatherData?.current?.cloudcover || "--",
      unit: "%",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: weatherData?.current?.visibility || "--",
      unit: "km",
      color: "from-green-500 to-lime-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                Real-Time Weather{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Predictions
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Live atmospheric data and cloudburst risk assessment with satellite imagery
              </p>
              {weatherData?.location && (
                <p className="text-sm text-muted-foreground">
                  Current Location: {selectedLocation?.name || `${weatherData.location.name}, ${weatherData.location.country}`}
                </p>
              )}
            </div>

            {/* Interactive Map */}
            <WeatherMap 
              onLocationSelect={handleLocationSelect}
              currentLocation={selectedLocation ? { lat: selectedLocation.lat, lon: selectedLocation.lon } : undefined}
            />

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <Card
                  key={metric.label}
                  className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.label}
                    </CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                      <metric.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-8 w-24" />
                    ) : (
                      <div className="text-2xl font-bold">
                        {metric.value}
                        <span className="text-sm text-muted-foreground ml-1">
                          {metric.unit}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Forecast Prediction */}
            {weatherData?.current && !isLoading && (
              <ForecastSection 
                data={{
                  humidity: weatherData.current.humidity,
                  pressure: weatherData.current.pressure,
                  cloudcover: weatherData.current.cloudcover,
                  precip: weatherData.current.precip,
                  temperature: weatherData.current.temperature,
                }}
                locationName={selectedLocation?.name || `${weatherData.location.name}, ${weatherData.location.country}`}
              />
            )}

            {/* Current Conditions */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Current Atmospheric Conditions</CardTitle>
                <CardDescription>
                  Detailed weather analysis for cloudburst prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">
                        {weatherData?.current?.weather_icons?.[0] && (
                          <img 
                            src={weatherData.current.weather_icons[0]} 
                            alt="Weather icon"
                            className="w-16 h-16"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">
                          {weatherData?.current?.weather_descriptions?.[0] || "N/A"}
                        </p>
                        <p className="text-muted-foreground">
                          Feels like {weatherData?.current?.feelslike || "--"}°C
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">UV Index</p>
                        <p className="text-lg font-semibold">{weatherData?.current?.uv_index || "--"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Precipitation</p>
                        <p className="text-lg font-semibold">{weatherData?.current?.precip || 0} mm</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wind Direction</p>
                        <p className="text-lg font-semibold">{weatherData?.current?.wind_dir || "--"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Observation Time</p>
                        <p className="text-lg font-semibold">{weatherData?.current?.observation_time || "--"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predictions;
