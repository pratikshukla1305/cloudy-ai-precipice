import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, Shield } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Mumbai Monsoon Season 2024",
      location: "Mumbai, Maharashtra",
      impact: "Prevented flooding in 3 major districts",
      description: "CloudyAI successfully predicted a severe cloudburst 6 hours in advance, allowing authorities to evacuate vulnerable areas and prevent potential casualties.",
      metrics: [
        { label: "Lives Protected", value: "50,000+" },
        { label: "Accuracy", value: "94%" },
        { label: "Warning Time", value: "6 hours" },
      ],
      icon: Shield,
    },
    {
      title: "Uttarakhand Emergency Response",
      location: "Kedarnath, Uttarakhand",
      impact: "Timely evacuation of tourist areas",
      description: "Early warning system enabled safe evacuation of tourists and pilgrims before a major cloudburst event in the mountainous region.",
      metrics: [
        { label: "People Evacuated", value: "12,000+" },
        { label: "Response Time", value: "4 hours" },
        { label: "Zero Casualties", value: "100%" },
      ],
      icon: Users,
    },
    {
      title: "Agricultural Planning - Punjab",
      location: "Punjab Region",
      impact: "Optimized crop protection strategies",
      description: "Farmers used CloudyAI predictions to protect crops and optimize irrigation, resulting in reduced losses during unexpected weather events.",
      metrics: [
        { label: "Farms Protected", value: "1,200+" },
        { label: "Loss Reduction", value: "67%" },
        { label: "Forecast Accuracy", value: "91%" },
      ],
      icon: TrendingUp,
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
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Case Studies
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real-world impact of CloudyAI's prediction capabilities
              </p>
            </div>

            {/* Case Studies */}
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <Card
                  key={study.title}
                  className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20">
                        <study.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                        <CardDescription className="text-base">
                          {study.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-semibold">{study.impact}</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {study.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center p-4 rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">{metric.value}</p>
                          <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
