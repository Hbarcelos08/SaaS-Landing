import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

export const Hero = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    console.log('Get Started clicked, user:', user);
    navigate('/auth');
  };

  const handleGetResources = () => {
    console.log('Get Resources clicked');
    navigate('/downloads');
  };
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Next Big Thing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate SaaS platform that helps you scale from idea to millions of users. 
            Get started with premium features, resources, and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gradient-primary text-background glow-primary hover:scale-105 transition-all duration-300"
              onClick={handleGetStarted}
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:glow-primary transition-all duration-300"
              onClick={handleGetResources}
            >
              <Download className="mr-2 h-5 w-5" />
              Get Resources
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            <p>Join 10,000+ builders who trust our platform</p>
          </div>
        </div>
      </div>
    </section>
  );
};