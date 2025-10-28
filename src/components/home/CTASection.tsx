import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-accent/10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <p className="text-lg text-muted-foreground">
            CloudyAI is now available for research and deployment.
          </p>
          
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Ready to Predict the{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Future of Weather?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower your forecasts with AI and make timely, informed decisions.
          </p>

          <div className="pt-8">
            <Link to="/predictions">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow-cyan transition-all duration-300 text-lg px-10 py-6 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
