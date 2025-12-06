'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  onChange?: () => void;
  id: number;
  onClose: () => void;
};

export default function CancelOrderPopup({ id, onClose, onChange }: Props) {
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelNote, setCancelNote] = useState('');

  const cancelOrder = async () => {
    if (!id) {
      return;
    }
    setCancelLoading(true);

    const res = await fetch('/api/orders/cancel', {
      method: 'POST',
      body: JSON.stringify({ orderId: id, cancelNote }),
    });

    const data = await res.json();
    setCancelLoading(false);

    if (data.success) {
      toast.success('Đã hủy đơn hàng!');
      onChange && onChange();
      onClose();
    } else {
      toast.error('Hủy đơn thất bại!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="animate-fadeIn w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-3 text-xl font-bold">Hủy đơn hàng</h2>

        <textarea
          className="mt-3 w-full rounded-lg border p-2"
          rows={3}
          placeholder="Lý do hủy đơn (không bắt buộc)"
          value={cancelNote}
          onChange={e => setCancelNote(e.target.value)}
        >
        </textarea>
        <button
          type="button"
          onClick={cancelOrder}
          className="mt-4 w-full rounded-lg bg-red-600 py-2 text-white disabled:bg-red-300"
        >
          {cancelLoading ? 'Đang hủy...' : 'Xác nhận hủy đơn'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-lg bg-gray-200 py-2"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
