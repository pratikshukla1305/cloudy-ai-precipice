import { Cloud, Droplets, Gauge, Satellite } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProjectOverview = () => {
  const metrics = [
    { name: "Rainfall Intensity", value: 87, icon: Droplets, color: "from-blue-500 to-cyan-500" },
    { name: "Humidity Trends", value: 92, icon: Cloud, color: "from-cyan-500 to-teal-500" },
    { name: "Atmospheric Pressure", value: 78, icon: Gauge, color: "from-teal-500 to-emerald-500" },
    { name: "Cloud Density", value: 85, icon: Satellite, color: "from-emerald-500 to-green-500" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Smarter Cloudburst Prediction with{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Machine Learning
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CloudyAI leverages satellite imagery, atmospheric sensors, and deep learning algorithms 
              to predict cloudbursts with remarkable accuracy, enabling proactive disaster prevention.
            </p>
          </div>

          {/* Right Side - Metrics */}
          <div className="space-y-6 animate-fade-in">
            {metrics.map((metric, index) => (
              <div 
                key={metric.name}
                className="p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="h-2 bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
