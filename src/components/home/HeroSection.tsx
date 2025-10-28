import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CloudRain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CloudRain className="h-5 w-5 text-primary animate-float" />
            <span className="font-medium">Advanced AI for Cloudburst Prediction</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-glow-pulse">
              CloudyAI
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Predict Extreme Weather Events — Safeguard Lives and Infrastructure with Real-Time Cloudburst Intelligence.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link to="/predictions">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow-blue transition-all duration-300 text-lg px-8 py-6 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="pt-12 relative">
            <div className="relative rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-6 shadow-elevated">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-background rounded-lg border border-border/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex gap-2 justify-center">
                    <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                      Live Map
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-muted border border-border text-sm">
                      Forecast
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-muted border border-border text-sm">
                      Satellite
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-muted border border-border text-sm">
                      Model Insights
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Interactive dashboard with real-time atmospheric data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
