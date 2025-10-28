import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComparisonSection = () => {
  const cloudyAIFeatures = [
    "Adaptive, real-time learning",
    "High prediction accuracy (>90%)",
    "Integrated satellite & sensor data",
    "Dynamic heatmap visualization",
    "Automated early-warning alerts",
  ];

  const traditionalFeatures = [
    "Manual updates",
    "Delayed response times",
    "Low spatial accuracy",
    "Limited visualization",
    "Static, non-customizable alerts",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose CloudyAI?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlike traditional forecasting tools, CloudyAI continuously learns from live data streams 
            to provide hyper-accurate predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CloudyAI Advantages */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-card/50 backdrop-blur-sm shadow-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  CloudyAI
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cloudyAIFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1 rounded-full bg-gradient-to-r from-primary to-primary-glow group-hover:scale-110 transition-transform">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Traditional Tools */}
          <Card className="border-border/50 bg-card/30 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Traditional Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {traditionalFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-muted">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
