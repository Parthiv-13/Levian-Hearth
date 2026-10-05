import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { CartItem, PickupSchedule, PlacedOrder } from '../types/bakery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cutleryNeeded: boolean;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  cutleryNeeded,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [pickupDate, setPickupDate] = useState<'today' | 'tomorrow'>('today');
  const [pickupTime, setPickupTime] = useState('8:30 AM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupNotes, setPickupNotes] = useState('');
  const [tipRate, setTipRate] = useState<number | 'custom'>(0.18);
  const [customTipAmount, setCustomTipAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'counter'>('online');
  const [validationError, setValidationError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const tax = subtotal * 0.085;

  let tipAmount = 0;
  if (tipRate === 'custom') {
    tipAmount = parseFloat(customTipAmount) || 0;
  } else {
    tipAmount = subtotal * tipRate;
  }

  const grandTotal = subtotal + tax + tipAmount;

  const availableTimeSlots = [
    '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('Please enter your full name for the order pickup box.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 7) {
      setValidationError('Please enter a valid phone number for SMS pickup notifications.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address for your bakery receipt.');
      return;
    }

    setValidationError('');

    const newOrder: PlacedOrder = {
      id: 'ord_' + Math.random().toString(36).substring(2, 9),
      orderNumber: `LH-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cartItems,
      subtotal,
      tax,
      tip: tipAmount,
      total: grandTotal,
      schedule: {
        pickupDate: pickupDate === 'today' ? 'Today (Fresh Bake)' : 'Tomorrow (Morning Bake)',
        pickupTime,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        pickupNotes: pickupNotes.trim() || undefined,
        cutleryNeeded,
      },
      status: 'in_bakers_hearth',
    };

    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18120C]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#DAC9B4] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E7DDD0] flex items-center justify-between bg-[#F4EFE6]">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7153]">
              Hearthside Bakery Pickup
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#271E15] mt-0.5">
              Pickup Scheduling & Checkout
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-lg hover:bg-[#E7DDD0] text-[#5F4833] hover:text-[#271E15] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          
          {validationError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
              {validationError}
            </div>
          )}

          {/* 1. Date & Time Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7153] flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>1. Choose Pickup Date & Window</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPickupDate('today')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  pickupDate === 'today'
                    ? 'bg-[#E7DDD0] border-[#9A5223] text-[#271E15]'
                    : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                }`}
              >
                <div className="font-semibold text-xs text-[#271E15]">Today’s Hearth Bake</div>
                <div className="text-[11px] text-[#6D563E] mt-0.5">Ready in 20-30 mins</div>
              </button>

              <button
                type="button"
                onClick={() => setPickupDate('tomorrow')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  pickupDate === 'tomorrow'
                    ? 'bg-[#E7DDD0] border-[#9A5223] text-[#271E15]'
                    : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                }`}
              >
                <div className="font-semibold text-xs text-[#271E15]">Tomorrow Morning Pre-Order</div>
                <div className="text-[11px] text-[#6D563E] mt-0.5">Reserved from 1st morning bake</div>
              </button>
            </div>

            {/* Time Slot Selector */}
            <div className="pt-2">
              <label className="text-xs font-medium text-[#271E15] block mb-1.5">
                Target Pickup Time:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1 bg-[#F4EFE6]/50 rounded-xl border border-[#E7DDD0]">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPickupTime(slot)}
                    className={`py-2 px-2 text-xs font-mono rounded-lg transition-colors cursor-pointer text-center ${
                      pickupTime === slot
                        ? 'bg-[#271E15] text-[#FAF7F2] font-semibold'
                        : 'bg-[#FAF7F2] text-[#5F4833] hover:bg-[#E7DDD0]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="space-y-3 pt-3 border-t border-[#E7DDD0]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7153] flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>2. Customer Information (For Pickup Box Label)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#271E15] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., Camille Laurent"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#271E15] block mb-1">
                  Mobile Phone (For SMS Ready Alert) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(503) 555-0192"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-medium text-[#271E15] block mb-1">
                  Email Address (For Itemized Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="camille@example.com"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#271E15] block mb-1">
                  Vehicle / Counter Pickup Notes (Optional)
                </label>
                <input
                  type="text"
                  value={pickupNotes}
                  onChange={(e) => setPickupNotes(e.target.value)}
                  placeholder="e.g., Curbside pickup in silver Volvo"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                />
              </div>
            </div>
          </div>

          {/* 3. Baker's Hearth Tip */}
          <div className="space-y-3 pt-3 border-t border-[#E7DDD0]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7153] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#9A5223]" />
                <span>3. Baker & Hearth Team Tip</span>
              </span>
              <span className="text-[11px] text-[#6D563E] normal-case">100% shared with baking crew</span>
            </label>

            <div className="grid grid-cols-5 gap-2">
              {[0.15, 0.18, 0.20, 0].map((rate) => {
                const isSelected = tipRate === rate;
                const label = rate === 0 ? 'No tip' : `${rate * 100}%`;
                const amount = rate > 0 ? (subtotal * rate).toFixed(2) : '';
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setTipRate(rate);
                      setCustomTipAmount('');
                    }}
                    className={`py-2 px-1 text-center rounded-lg border text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#271E15] border-[#271E15] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                    }`}
                  >
                    <div className="font-semibold">{label}</div>
                    {amount && <div className="text-[10px] font-mono tabular-nums opacity-80">${amount}</div>}
                  </button>
                );
              })}
              
              <button
                type="button"
                onClick={() => setTipRate('custom')}
                className={`py-2 px-1 text-center rounded-lg border text-xs transition-colors cursor-pointer ${
                  tipRate === 'custom'
                    ? 'bg-[#271E15] border-[#271E15] text-[#FAF7F2]'
                    : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                }`}
              >
                <div className="font-semibold">Custom</div>
                <div className="text-[10px] opacity-80">$...</div>
              </button>
            </div>

            {tipRate === 'custom' && (
              <div className="pt-1">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="Enter custom tip ($)"
                  value={customTipAmount}
                  onChange={(e) => setCustomTipAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15]"
                />
              </div>
            )}
          </div>

          {/* 4. Payment Choice */}
          <div className="space-y-3 pt-3 border-t border-[#E7DDD0]">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7153] block">
              4. Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? 'bg-[#E7DDD0] border-[#9A5223] text-[#271E15]'
                    : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833]'
                }`}
              >
                <div className="text-xs font-semibold text-[#271E15]">Pre-Pay Online (Fastest)</div>
                <div className="text-[11px] text-[#6D563E] mt-0.5">Apple Pay / Card / Grab & Go</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('counter')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'counter'
                    ? 'bg-[#E7DDD0] border-[#9A5223] text-[#271E15]'
                    : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833]'
                }`}
              >
                <div className="text-xs font-semibold text-[#271E15]">Pay at Bakery Counter</div>
                <div className="text-[11px] text-[#6D563E] mt-0.5">Card or Cash upon pickup</div>
              </button>
            </div>
          </div>

          {/* Final Receipt Summary & Action */}
          <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#DAC9B4] space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#6D563E]">
              <span>Items Subtotal ({cartItems.reduce((acc, c) => acc + c.quantity, 0)} items)</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#6D563E]">
              <span>Estimated Tax (8.5%)</span>
              <span className="tabular-nums">${tax.toFixed(2)}</span>
            </div>
            {tipAmount > 0 && (
              <div className="flex justify-between text-[#6D563E]">
                <span>Baker&rsquo;s Team Tip</span>
                <span className="tabular-nums">${tipAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#271E15] pt-2 border-t border-[#DAC9B4]">
              <span>Total to Pay</span>
              <span className="font-serif text-lg tabular-nums">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] text-[#FAF7F2] text-sm font-semibold transition-all shadow-md flex items-center justify-between cursor-pointer"
            >
              <span>Confirm & Place Pickup Order</span>
              <span className="font-mono tabular-nums text-base">
                ${grandTotal.toFixed(2)}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
