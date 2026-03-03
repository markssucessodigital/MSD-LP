import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { leadsAPI } from '../services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const LeadFormModal = ({ isOpen, onClose, source = 'landing_page' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL if available
      const urlParams = new URLSearchParams(window.location.search);
      const leadPayload = {
        ...formData,
        source,
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign')
      };

      const response = await leadsAPI.createLead(leadPayload);

      if (response.success) {
        toast.success('Sucesso!', {
          description: 'Recebemos suas informações. Entraremos em contato em breve!',
          duration: 5000,
        });

        // Track conversion event
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // TODO: Replace with real conversion ID
            'value': 1.0,
            'currency': 'BRL'
          });
        }

        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: source,
            value: 1.0,
            currency: 'BRL'
          });
        }

        // Reset form and close
        setFormData({ name: '', email: '', phone: '', message: '' });
        onClose();

        // Redirect to WhatsApp after 2 seconds
        setTimeout(() => {
          const whatsappNumber = "5511999999999"; // TODO: Replace with real number
          const whatsappMessage = encodeURIComponent(
            `Olá! Acabei de preencher o formulário no site. Meu nome é ${formData.name}.`
          );
          window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        }, 2000);
      }
    } catch (error) {
      toast.error('Erro ao enviar', {
        description: 'Ocorreu um erro ao processar suas informações. Tente novamente.',
        duration: 5000,
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Agende Seu Diagnóstico Estratégico</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e entraremos em contato em até 24h.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Seu nome"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(11) 99999-9999"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message">Mensagem (opcional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Conte-nos um pouco sobre seu negócio..."
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
