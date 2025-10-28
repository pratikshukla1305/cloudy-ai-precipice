import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Brain, Bell, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "CloudyAI continuously collects data from satellites, weather stations, IoT sensors, and atmospheric monitors across multiple regions.",
      step: "01",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Deep learning models process the collected data, identifying patterns and anomalies that indicate potential cloudburst conditions.",
      step: "02",
    },
    {
      icon: Bell,
      title: "Alert Generation",
      description: "When high-risk conditions are detected, the system generates automated alerts with precise location and timing information.",
      step: "03",
    },
    {
      icon: BarChart3,
      title: "Visualization",
      description: "Interactive dashboards display real-time predictions, risk zones, and detailed analytics for informed decision-making.",
      step: "04",
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
                How{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  CloudyAI Works
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A sophisticated pipeline from data collection to actionable insights
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card
                  key={step.title}
                  className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex items-center gap-4">
                        <div className="text-6xl font-bold text-primary/20">
                          {step.step}
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-card/50 backdrop-blur-sm animate-fade-in">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-bold">Continuous Improvement</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  CloudyAI's machine learning models continuously learn from new data, 
                  improving prediction accuracy over time and adapting to changing climate patterns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
