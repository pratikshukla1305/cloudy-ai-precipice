import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Layers, Zap, Target } from "lucide-react";

const Model = () => {
  const modelFeatures = [
    {
      icon: Brain,
      title: "Deep Neural Networks",
      description: "Multi-layer LSTM and CNN architectures trained on decades of meteorological data.",
    },
    {
      icon: Layers,
      title: "Multi-Source Integration",
      description: "Combines satellite imagery, ground sensors, and atmospheric models for comprehensive analysis.",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Processes incoming data streams within seconds for immediate threat detection.",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Achieves >90% prediction accuracy through continuous learning and model refinement.",
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
                The{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  CloudyAI Model
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced machine learning architecture designed for precision cloudburst prediction
              </p>
            </div>

            {/* Model Architecture */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Model Architecture</CardTitle>
                <CardDescription>
                  Our hybrid deep learning approach combines multiple AI techniques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modelFeatures.map((feature, index) => (
                    <div 
                      key={feature.title}
                      className="flex gap-4 p-4 rounded-lg border border-border/50 bg-muted/30 hover:border-primary/30 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 h-fit`}>
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Data */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Training Dataset</CardTitle>
                <CardDescription>
                  Comprehensive data sources powering our predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-6 rounded-lg bg-muted/50">
                      <p className="text-4xl font-bold text-primary">20+</p>
                      <p className="text-sm text-muted-foreground mt-2">Years of Data</p>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-muted/50">
                      <p className="text-4xl font-bold text-primary">10M+</p>
                      <p className="text-sm text-muted-foreground mt-2">Data Points</p>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-muted/50">
                      <p className="text-4xl font-bold text-primary">500+</p>
                      <p className="text-sm text-muted-foreground mt-2">Weather Stations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Model;
