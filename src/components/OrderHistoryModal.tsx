import React from 'react';
import { X, Clock, ShoppingBag, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PlacedOrder, CartItem } from '../types/bakery';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PlacedOrder[];
  onReorder: (items: CartItem[]) => void;
  onViewOrderReceipt: (order: PlacedOrder) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onViewOrderReceipt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18120C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-xl rounded-2xl border border-[#DAC9B4] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E7DDD0] flex items-center justify-between bg-[#F4EFE6]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#271E15]" />
            <h2 className="font-serif text-xl font-bold text-[#271E15]">
              Your Order History
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close order history"
            className="p-1.5 rounded-lg hover:bg-[#E7DDD0] text-[#5F4833] hover:text-[#271E15] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders list */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#E7DDD0] flex items-center justify-center text-[#8C7153]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#271E15]">
                No past orders found
              </h3>
              <p className="text-xs text-[#6D563E] max-w-xs mx-auto">
                When you place a pickup order, your receipts and order codes will be saved here for easy reordering.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-[#DAC9B4] bg-[#FAF7F2] space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-[#271E15]">
                        Order #{order.orderNumber}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3E5142] bg-[#E7DDD0] px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-[#4D6452]" />
                        <span>Ready at {order.schedule.pickupTime}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#6D563E] mt-0.5">
                      Pickup for {order.schedule.customerName} · {order.schedule.pickupDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#271E15] font-mono tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="text-xs text-[#5F4833] py-2 border-t border-b border-[#E7DDD0] space-y-1">
                  {order.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between">
                      <span>
                        {it.quantity}x {it.item.name}
                        {it.selectedSlicing && (
                          <span className="text-[#8C7153]"> ({it.selectedSlicing.split('(')[0]})</span>
                        )}
                      </span>
                      <span className="font-mono tabular-nums">${it.itemTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      onViewOrderReceipt(order);
                      onClose();
                    }}
                    className="text-xs font-semibold text-[#9A5223] hover:underline cursor-pointer"
                  >
                    View Digital Receipt & QR Pass
                  </button>

                  <button
                    onClick={() => {
                      onReorder(order.items);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#271E15] hover:bg-[#423223] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reorder Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
