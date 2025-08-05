'use client';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


export default function PayPalCheckout({ product }) {
  const router = useRouter()
  
  const createOrder = async () => {
    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          price: product.price,
          currency: 'USD',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.id) throw new Error(data.message || 'فشل في إنشاء الطلب');
      return data.id;
    } catch (error) { toast.error(`خطأ أثناء إنشاء الطلب: ${error.message}`) }
  };

  const onApprove = async (data) => {
    try {
      toast.loading('جارٍ تأكيد الدفع...');
      const res = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const result = await res.json();
      toast.dismiss();

      if (result.status === 'COMPLETED') {
        toast.success('تم الدفع بنجاح! سيتم تحويلك...');

        const paidProducts = JSON.parse(sessionStorage.getItem('paidProducts') || '[]')
        if (!paidProducts.includes(product.id)) { 
          paidProducts.push(product.id)
          sessionStorage.setItem('paidProducts', JSON.stringify(paidProducts))
        }
        router.push(`/success?id=${product.id}`)

      } else {
        toast.error('لم يتم تأكيد الدفع');
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`خطأ أثناء تأكيد الدفع: ${error.message}`);
    }
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <div className="my-4">
        <PayPalButtons
          style={{ color: 'blue', shape: 'pill', label: 'paypal' }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
      <Toaster position="top-center" />

    </PayPalScriptProvider>
  );
}
