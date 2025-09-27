import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Rocket, Users, Database, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with cutting-edge technology for instant results."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance standards."
  },
  {
    icon: Rocket,
    title: "Scale Infinitely",
    description: "Built to handle millions of users without breaking a sweat."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration tools that keep your team in sync."
  },
  {
    icon: Database,
    title: "Smart Analytics",
    description: "Powerful insights and analytics to drive data-driven decisions."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert support team available around the clock to help you succeed."
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Everything you need to build, scale, and succeed in today's competitive market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:glow-primary group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-background" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};