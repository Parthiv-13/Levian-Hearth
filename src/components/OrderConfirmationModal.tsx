import React from 'react';
import { CheckCircle2, Clock, MapPin, Printer, QrCode, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { PlacedOrder } from '../types/bakery';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onViewHistory: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onViewHistory,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18120C]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-xl rounded-2xl border border-[#DAC9B4] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header confirmation ribbon */}
        <div className="bg-[#271E15] text-[#FAF7F2] p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#3E5142] text-[#FAF7F2] flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#DAC9B4]">
            Order Confirmed · Ready for Pickup
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs text-[#E7DDD0] max-w-md mx-auto">
            Thank you, {order.schedule.customerName}. We have queued your order for the hearth oven.
          </p>
        </div>

        {/* Live Preparation Stepper */}
        <div className="p-6 bg-[#F4EFE6] border-b border-[#E7DDD0]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7153] mb-4 text-center">
            Live Bakery Status
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#3E5142] text-white flex items-center justify-center mx-auto text-xs font-bold">
                ✓
              </div>
              <p className="font-semibold text-[#271E15]">1. Received</p>
              <p className="text-[11px] text-[#6D563E] font-mono">{order.createdAt}</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#9A5223] text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                2
              </div>
              <p className="font-semibold text-[#271E15]">2. Packaging</p>
              <p className="text-[11px] text-[#9A5223] font-medium">At Hearth Oven</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#DAC9B4] text-[#5F4833] flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <p className="font-semibold text-[#6D563E]">3. Ready</p>
              <p className="text-[11px] text-[#6D563E] font-mono">{order.schedule.pickupTime}</p>
            </div>
          </div>
        </div>

        {/* Pickup Details & Simulated QR Code */}
        <div className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#DAC9B4]">
            
            {/* Pickup Info */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#271E15]">
                <Clock className="w-4 h-4 text-[#9A5223]" />
                <span>Pickup Time & Date:</span>
              </div>
              <p className="text-sm font-bold text-[#271E15] font-mono">
                {order.schedule.pickupDate} · {order.schedule.pickupTime}
              </p>

              <div className="pt-2 flex items-start gap-1.5 text-[#5F4833]">
                <MapPin className="w-4 h-4 shrink-0 text-[#9A5223] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#271E15]">Levain & Hearth Bakery</p>
                  <p>1420 Hearthstone Ave, Portland</p>
                  <p className="text-[#8C7153] mt-0.5">Counter Pick-up Shelf #3</p>
                </div>
              </div>
            </div>

            {/* Digital Pickup Pass / QR Code */}
            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-[#E7DDD0] text-center">
              {/* Crisp SVG QR Code */}
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#271E15]" fill="currentColor">
                <rect x="10" y="10" width="25" height="25" rx="3" fill="#271E15" />
                <rect x="15" y="15" width="15" height="15" fill="#FAF7F2" />
                <rect x="19" y="19" width="7" height="7" fill="#271E15" />

                <rect x="65" y="10" width="25" height="25" rx="3" fill="#271E15" />
                <rect x="70" y="15" width="15" height="15" fill="#FAF7F2" />
                <rect x="74" y="19" width="7" height="7" fill="#271E15" />

                <rect x="10" y="65" width="25" height="25" rx="3" fill="#271E15" />
                <rect x="15" y="70" width="15" height="15" fill="#FAF7F2" />
                <rect x="19" y="74" width="7" height="7" fill="#271E15" />

                <rect x="42" y="15" width="8" height="12" fill="#271E15" />
                <rect x="54" y="24" width="6" height="18" fill="#271E15" />
                <rect x="42" y="38" width="14" height="6" fill="#271E15" />
                <rect x="25" y="44" width="10" height="8" fill="#271E15" />
                <rect x="44" y="55" width="12" height="14" fill="#271E15" />
                <rect x="62" y="52" width="26" height="8" fill="#271E15" />
                <rect x="72" y="68" width="14" height="18" fill="#271E15" />
                <rect x="52" y="78" width="10" height="10" fill="#271E15" />
              </svg>
              <span className="text-[10px] font-mono text-[#8C7153] mt-1">
                Show at Pickup Counter
              </span>
            </div>

          </div>

          {/* Itemized Order Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C7153]">
              Bakes In This Order
            </h4>
            <div className="divide-y divide-[#E7DDD0] border-y border-[#E7DDD0] max-h-48 overflow-y-auto">
              {order.items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="py-2.5 flex justify-between items-start text-xs">
                  <div>
                    <div className="font-semibold text-[#271E15]">
                      {cartItem.quantity}x {cartItem.item.name}
                    </div>
                    <div className="text-[#6D563E] text-[11px]">
                      {cartItem.selectedSlicing && <span>Slice: {cartItem.selectedSlicing.split('(')[0]} · </span>}
                      {cartItem.selectedWarming && <span>Warmed · </span>}
                      {cartItem.selectedMilk && <span>{cartItem.selectedMilk} · </span>}
                      {cartItem.specialInstructions && (
                        <span className="italic">&ldquo;{cartItem.specialInstructions}&rdquo;</span>
                      )}
                    </div>
                  </div>
                  <div className="font-mono tabular-nums text-[#271E15] font-semibold">
                    ${cartItem.itemTotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-2 text-xs font-mono space-y-1 text-[#6D563E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="tabular-nums">${order.tax.toFixed(2)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between">
                  <span>Baker Tip</span>
                  <span className="tabular-nums">${order.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#271E15] pt-1 border-t border-[#DAC9B4]">
                <span>Total Paid</span>
                <span className="font-serif text-base tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="py-2.5 px-3 rounded-xl border border-[#DAC9B4] hover:bg-[#E7DDD0] text-xs font-semibold text-[#271E15] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#271E15] hover:bg-[#423223] text-xs font-semibold text-[#FAF7F2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Back to Bakery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
