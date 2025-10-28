import { Brain, Database, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Prediction Engine",
      description: "Advanced deep learning models analyze weather patterns, satellite imagery, and live humidity readings to detect potential cloudburst triggers.",
    },
    {
      icon: Database,
      title: "Real-Time Environmental Data",
      description: "Connects with IoT devices and weather sensors to provide constantly updated, region-specific insights.",
    },
    {
      icon: BarChart3,
      title: "Visual Analytics Dashboard",
      description: "Gain a clear overview of risk zones, rainfall probabilities, and alert thresholds through intuitive, interactive dashboards.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            How <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">CloudyAI</span> Helps You Predict Smarter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrating real-time data with advanced neural networks to deliver unparalleled cloudburst detection and forecasting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 w-fit group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
