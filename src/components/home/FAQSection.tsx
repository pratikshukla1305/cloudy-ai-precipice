import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is CloudyAI and how does it work?",
      answer: "CloudyAI is an AI-powered platform that processes atmospheric and satellite data to predict cloudburst events with high accuracy. It uses deep learning models trained on years of weather data to deliver real-time alerts and visual insights.",
    },
    {
      question: "Can CloudyAI integrate with government meteorological APIs?",
      answer: "Yes, CloudyAI is designed to seamlessly integrate with various meteorological APIs and data sources, including government weather services, enabling comprehensive data analysis.",
    },
    {
      question: "How does the system ensure data accuracy?",
      answer: "CloudyAI employs multiple validation layers, cross-references data from various sources, and continuously improves its models through machine learning to maintain high accuracy standards.",
    },
    {
      question: "Can I use CloudyAI for local or regional predictions?",
      answer: "Absolutely! CloudyAI provides both broad regional forecasts and granular local predictions, allowing you to focus on specific areas of interest with detailed accuracy.",
    },
    {
      question: "What technologies power CloudyAI?",
      answer: "CloudyAI leverages advanced deep learning algorithms, satellite imagery analysis, IoT sensor integration, and real-time data processing to deliver accurate cloudburst predictions.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Understand how CloudyAI uses machine learning to redefine weather forecasting.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4 animate-fade-in">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
