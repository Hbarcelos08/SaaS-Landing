import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { MockPayment } from "./MockPayment";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);

  // Check authentication status
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handlePlanSelect = (plan: any) => {
    if (!user) {
      toast({
        title: "Login Necessário",
        description: "Faça login para assinar um plano",
        variant: "destructive"
      });
      window.location.href = '/auth';
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Assinatura Ativada! 🎉",
      description: "Bem-vindo ao seu novo plano!",
    });
    // Redirect to dashboard or main page
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const plans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      price: "R$ 29",
      originalPrice: "R$ 49",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "Email support",
        "Standard security",
        "1GB storage"
      ]
    },
    {
      name: "Professional",
      description: "Best for growing businesses",
      price: "R$ 79",
      originalPrice: "R$ 99",
      monthlyPrice: 79,
      annualPrice: 790,
      popular: true,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Enhanced security",
        "50GB storage",
        "Team collaboration",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      description: "For large-scale operations",
      price: "R$ 199",
      originalPrice: "R$ 299",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Everything in Professional",
        "Custom integrations",
        "24/7 phone support",
        "Enterprise security",
        "Unlimited storage",
        "Advanced team management",
        "SLA guarantee",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Simple{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-center">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform bg-background rounded-full ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-accent text-accent-foreground">Save 20%</Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 animate-slide-up ${
                plan.popular ? 'border-primary glow-primary scale-105' : 'hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-background">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">
                    R$ {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isAnnual ? 'ano' : 'mês'}
                  </span>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'gradient-primary text-background glow-primary' 
                      : 'border-primary/50 hover:bg-primary/10'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.name === 'Starter' ? 'Começar Grátis' : 'Assinar Agora'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showPayment && selectedPlan && (
        <MockPayment
          plan={selectedPlan}
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
};