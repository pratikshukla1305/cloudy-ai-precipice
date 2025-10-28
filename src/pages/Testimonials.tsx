import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Meera Kapoor",
      role: "Chief Meteorologist",
      organization: "Indian Institute of Tropical Meteorology",
      quote: "CloudyAI has transformed our disaster preparedness protocols. The accuracy and lead time of predictions have significantly improved our emergency response capabilities.",
      initials: "MK",
    },
    {
      name: "Rajesh Kumar",
      role: "Senior Weather Analyst",
      organization: "Indian Meteorological Department",
      quote: "The most reliable and comprehensive rainfall forecast model we've integrated. CloudyAI's real-time data processing gives us the edge we need in critical situations.",
      initials: "RK",
    },
    {
      name: "Priya Sharma",
      role: "Climate Data Scientist",
      organization: "National Centre for Climate Research",
      quote: "The intuitive dashboard and visualization tools make complex atmospheric data accessible to both experts and decision-makers. An invaluable tool for our research.",
      initials: "PS",
    },
    {
      name: "Dr. Amit Patel",
      role: "Disaster Management Expert",
      organization: "National Disaster Management Authority",
      quote: "CloudyAI's early warning system has been instrumental in saving lives. The precision and reliability of predictions have exceeded our expectations.",
      initials: "AP",
    },
    {
      name: "Kavita Deshmukh",
      role: "Agricultural Scientist",
      organization: "Indian Council of Agricultural Research",
      quote: "Farmers in vulnerable regions now have access to accurate weather predictions, helping them protect crops and plan better. CloudyAI is bridging the information gap.",
      initials: "KD",
    },
    {
      name: "Dr. Suresh Menon",
      role: "Environmental Researcher",
      organization: "Centre for Earth Science Studies",
      quote: "The integration of satellite data with ground-level sensors provides unprecedented accuracy. CloudyAI is setting new standards in weather prediction technology.",
      initials: "SM",
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
                What Experts Say About{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  CloudyAI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Trusted by researchers, meteorologists, and disaster management professionals
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.name}
                  className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="pt-6 space-y-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                    
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
                      </div>
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

export default Testimonials;
