import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Smartphone, Building2, CheckCircle, XCircle } from "lucide-react";

interface MockPaymentProps {
  plan: {
    name: string;
    price: string;
    originalPrice?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MockPayment = ({ plan, isOpen, onClose, onSuccess }: MockPaymentProps) => {
  const [step, setStep] = useState<'payment' | 'processing' | 'success' | 'error'>('payment');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const simulatePayment = async () => {
    setStep('processing');
    setProgress(0);

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Wait for progress to complete
    setTimeout(async () => {
      // 90% chance of success for demo
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        try {
          // Save simulated subscription to database
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('demo_subscriptions').insert({
              user_id: user.id,
              plan_name: plan.name,
              plan_price: plan.price,
              payment_method: paymentMethod === 'credit-card' ? 'Cartão de Crédito' : 
                            paymentMethod === 'pix' ? 'PIX' : 'Carteira Digital'
            });
          }

          setStep('success');
          toast({
            title: "Pagamento Aprovado! ✅",
            description: `Bem-vindo ao plano ${plan.name}!`,
          });
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 2000);
        } catch (error) {
          setStep('error');
        }
      } else {
        setStep('error');
        toast({
          title: "Pagamento Recusado",
          description: "Tente novamente com outro método.",
          variant: "destructive"
        });
      }
    }, 2500);
  };

  const resetForm = () => {
    setStep('payment');
    setProgress(0);
    setFormData({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {step === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            {step === 'payment' ? 'Finalizar Pagamento' : 
             step === 'processing' ? 'Processando...' :
             step === 'success' ? 'Pagamento Aprovado!' : 'Erro no Pagamento'}
          </DialogTitle>
          <DialogDescription>
            {step === 'payment' && `Plano ${plan.name} - ${plan.price}`}
            {step === 'processing' && 'Aguarde enquanto processamos seu pagamento...'}
            {step === 'success' && 'Seu pagamento foi processado com sucesso!'}
            {step === 'error' && 'Houve um problema com seu pagamento.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'payment' && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Plano {plan.name}</span>
                  <span className="font-semibold">{plan.price}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Desconto aplicado</span>
                    <span className="line-through">{plan.originalPrice}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Método de Pagamento</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <CreditCard className="w-4 h-4" />
                  <Label htmlFor="credit-card">Cartão de Crédito</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="pix" id="pix" />
                  <Smartphone className="w-4 h-4" />
                  <Label htmlFor="pix">PIX</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="digital-wallet" id="digital-wallet" />
                  <Building2 className="w-4 h-4" />
                  <Label htmlFor="digital-wallet">Carteira Digital</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={formData.expiry}
                        onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Nome no Cartão</Label>
                    <Input
                      id="name"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <Button onClick={simulatePayment} className="w-full" size="lg">
              Confirmar Pagamento - {plan.price}
            </Button>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Processando pagamento via {paymentMethod === 'credit-card' ? 'Cartão de Crédito' : 
                                         paymentMethod === 'pix' ? 'PIX' : 'Carteira Digital'}
              </p>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 py-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Pagamento Confirmado!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Você agora tem acesso ao plano {plan.name}
              </p>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-6 py-6 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Pagamento Recusado</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Verifique os dados e tente novamente
              </p>
            </div>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Tentar Novamente
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};