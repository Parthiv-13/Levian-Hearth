import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  cutleryNeeded: boolean;
  onToggleCutlery: (needed: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  cutleryNeeded,
  onToggleCutlery,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const giftThreshold = 25.0;
  const amountToGift = Math.max(0, giftThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#18120C]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#DAC9B4] flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E7DDD0] flex items-center justify-between bg-[#F4EFE6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#271E15]" />
              <h2 className="font-serif text-lg font-bold text-[#271E15]">
                Your Pickup Bag
              </h2>
              <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded-full bg-[#E7DDD0] text-[#271E15] font-semibold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 rounded-lg hover:bg-[#E7DDD0] text-[#5F4833] hover:text-[#271E15] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Cookie Progress Bar */}
          <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#E7DDD0] text-xs">
            {amountToGift > 0 ? (
              <div className="space-y-1">
                <div className="flex justify-between text-[#6D563E]">
                  <span>Add <strong className="text-[#271E15] font-mono tabular-nums">${amountToGift.toFixed(2)}</strong> for a complimentary Sablé cookie</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#9A5223]" />
                </div>
                <div className="w-full bg-[#E7DDD0] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#9A5223] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / giftThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#3E5142] font-medium">
                <Sparkles className="w-4 h-4 text-[#9A5223]" />
                <span>Complimentary butter sablé cookie unlocked for your bag!</span>
              </div>
            )}
          </div>

          {/* Itemized Cart List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E7DDD0] flex items-center justify-center text-[#8C7153]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#271E15]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#6D563E] max-w-xs mx-auto">
                  Our morning loaves and flaky croissants are freshly baked and waiting.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-4 py-2 text-xs font-semibold bg-[#271E15] text-[#FAF7F2] rounded-lg hover:bg-[#423223] cursor-pointer"
                >
                  Explore Daily Menu
                </button>
              </div>
            ) : (
              cartItems.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-3.5 rounded-xl border border-[#DAC9B4]/70 bg-[#FAF7F2] space-y-2.5"
                >
                  <div className="flex gap-3">
                    {/* Artwork thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-[#F4EFE6] border border-[#E7DDD0] flex items-center justify-center shrink-0 p-1">
                      <BakeryArtwork type={cartItem.item.artworkType} className="w-full h-full" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-[#271E15] truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          aria-label="Remove item"
                          className="text-[#8C7153] hover:text-[#9A5223] transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Customizations */}
                      <div className="text-xs text-[#6D563E] space-y-0.5 mt-0.5">
                        {cartItem.selectedSlicing && (
                          <p>Slice: {cartItem.selectedSlicing.split('(')[0]}</p>
                        )}
                        {cartItem.selectedWarming && <p>· Warmed on pickup</p>}
                        {cartItem.selectedMilk && <p>· {cartItem.selectedMilk}</p>}
                        {cartItem.selectedTemperature && <p>· {cartItem.selectedTemperature}</p>}
                        {cartItem.specialInstructions && (
                          <p className="italic text-[#8C7153] line-clamp-1">
                            &ldquo;{cartItem.specialInstructions}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Item Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E7DDD0]">
                    <div className="flex items-center gap-2 bg-[#E7DDD0]/70 rounded-md p-0.5 border border-[#DAC9B4]">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1 rounded text-[#271E15] hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono tabular-nums text-xs font-bold text-[#271E15] px-1">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1 rounded text-[#271E15] hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-mono tabular-nums text-sm font-bold text-[#271E15]">
                      ${cartItem.itemTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#E7DDD0] bg-[#F4EFE6] space-y-3">
              
              {/* Eco-friendly Cutlery check */}
              <label className="flex items-center gap-2 text-xs text-[#5F4833] cursor-pointer">
                <input
                  type="checkbox"
                  checked={cutleryNeeded}
                  onChange={(e) => onToggleCutlery(e.target.checked)}
                  className="rounded text-[#9A5223] focus:ring-[#9A5223]"
                />
                <span>Include wooden knives and recycled linen napkins</span>
              </label>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#DAC9B4]/60 text-xs font-mono">
                <div className="flex justify-between text-[#6D563E]">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#271E15]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6D563E]">
                  <span>Estimated Tax (8.5%)</span>
                  <span className="tabular-nums text-[#271E15]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#271E15] pt-1 border-t border-[#DAC9B4]">
                  <span>Total</span>
                  <span className="tabular-nums font-serif text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] text-[#FAF7F2] text-sm font-semibold transition-all shadow-sm flex items-center justify-between cursor-pointer"
              >
                <span>Select Pickup Time</span>
                <span className="flex items-center gap-1.5 font-mono tabular-nums">
                  ${total.toFixed(2)}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>

              <p className="text-[11px] text-center text-[#8C7153]">
                Orders packed in breathable, compostable bakery paper.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
