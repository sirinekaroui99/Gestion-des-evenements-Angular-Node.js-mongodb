import { Component, OnInit } from '@angular/core';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51N37H1A3EFDPeg9GwUBLNOHAlED8STvRSsKcD6Obpe9wZl918X1HizXE5mmwLNMueEgwabRbXHBQpFRcojgQmURn0086ERLrwI', {
  apiVersion: '2022-11-15',
});

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css']
})
export class CotisationComponent implements OnInit {

  title = 'App';

  constructor() { }

  handler: any = null;

  ngOnInit() {
    this.loadStripe();
  }

  pay(amount: any) {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: async (token: any) => {
        try {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log('1111111111', token);

          const customer = await stripe.customers.create({
            email: token.email,
            name: token.email,
          });
          console.log('customer',customer)
          
          const customerId = customer.id;

          stripe.customers.retrieve(customerId)
          .then(customer => {
            console.log('xxxxxxx',customer);
          })
          .catch(err => {
            console.log(err);
          });

          alert('Paiement réalisé avec succés!');
          const charges = await this.getPaiements(customerId);
          console.log('liste paiement', charges);
        } catch (error) {
          console.error(error);
        }
      }
    });
    const tauxDeChange = 1000; // Taux de change dinar tunisien/millime
    const montantEnMillimes = amount * 100;
    const montantEnDinarsTunisiens = montantEnMillimes / tauxDeChange;
    handler.open({
      name: 'Paiement',
      description: '',
      amount: montantEnMillimes,
      panelLabel: 'Payer {{amount}}',
      locale: 'auto',
      currency: 'TND',
      closed: () => {
        // Code à exécuter lorsque la boîte de dialogue est fermée
      }
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: (token: any) => {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log('222222222', token);
            alert('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }

  async getPaiements(userId: string) {
    const charges = await stripe.charges.list({ customer: userId });
    return charges.data;
  }
}
