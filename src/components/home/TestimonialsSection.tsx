import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Meera Kapoor",
      role: "Meteorologist, IITM",
      quote: "CloudyAI's predictions have significantly improved our disaster preparedness efforts.",
      initials: "MK",
    },
    {
      name: "Rajesh Kumar",
      role: "Indian Weather Bureau",
      quote: "The most reliable rainfall forecast model we've integrated.",
      initials: "RK",
    },
    {
      name: "Priya Sharma",
      role: "Climate Data Analyst",
      quote: "Its intuitive dashboard helps visualize complex data instantly.",
      initials: "PS",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Researchers and Experts Rely on{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              CloudyAI
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow-blue transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <Avatar className="border-2 border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
