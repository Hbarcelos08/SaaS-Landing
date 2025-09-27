import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get started with the platform?",
    answer: "Getting started is simple! Create your account, choose a plan that fits your needs, and you'll have access to all features immediately. Our onboarding guide will walk you through the first steps."
  },
  {
    question: "Can I change my plan later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all new users. No credit card required. You'll have full access to all features during the trial period."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide multiple support channels including email support for all plans, priority support for Professional users, and 24/7 phone support for Enterprise customers. Our team is here to help you succeed."
  },
  {
    question: "How secure is my data?",
    answer: "Security is our top priority. We use bank-level encryption, regular security audits, and comply with industry standards like SOC 2 and GDPR. Your data is safe with us."
  },
  {
    question: "Can I integrate with other tools?",
    answer: "Yes! We offer integrations with popular tools and a robust API for custom integrations. Professional and Enterprise plans include additional integration options."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all plans. If you're not satisfied with our service, contact our support team for a full refund."
  },
  {
    question: "How does billing work?",
    answer: "Billing is automatic and secure. You'll be charged at the beginning of each billing cycle (monthly or annually). You can view and manage your billing information in your account dashboard."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our platform and services.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full animate-slide-up">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-border/50"
            >
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
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