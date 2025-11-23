'use client';

export default function Checkout() {
  const placeOrder = async () => {
    await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@gmail.com',
        phone: '0123456789',
        address: '123 HCM',
        city: 'Hồ Chí Minh',
        items: [
          { product_id: 108, quantity: 2 },
          { product_id: 102, quantity: 1 },
        ],
      }),
    });
    // console.log('Order created:', data);
  };

  return (
    <button
      onClick={placeOrder}
      className="rounded-lg bg-green-600 px-4 py-2 text-white"
    >
      Thanh toán
    </button>
  );
}
