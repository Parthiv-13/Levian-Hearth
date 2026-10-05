import React, { useState, useEffect } from 'react';
import { BAKERY_MENU } from './data/bakeryMenu';
import { BakeryItem, CartItem, PlacedOrder } from './types/bakery';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DailyHearthBoard } from './components/DailyHearthBoard';
import { MenuGallery } from './components/MenuGallery';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { BakeryStory } from './components/BakeryStory';
import { BakeryHoursLocation } from './components/BakeryHoursLocation';
import { Footer } from './components/Footer';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [menuItems] = useState<BakeryItem[]>(BAKERY_MENU);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('levain_hearth_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('levain_hearth_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedItemForModal, setSelectedItemForModal] = useState<BakeryItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<PlacedOrder | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [cutleryNeeded, setCutleryNeeded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('levain_hearth_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cartItems]);

  // Persist placed orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('levain_hearth_orders', JSON.stringify(placedOrders));
    } catch (e) {
      console.warn('Could not save orders', e);
    }
  }, [placedOrders]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3200);
  };

  // Quick add standard item
  const handleQuickAdd = (item: BakeryItem) => {
    const defaultSlicing = item.customization?.slicingOptions ? item.customization.slicingOptions[0] : undefined;
    const defaultMilk = item.customization?.milkChoices ? item.customization.milkChoices[0] : undefined;
    const defaultTemp = item.customization?.temperatureChoices ? item.customization.temperatureChoices[0] : undefined;

    const cartItemId = `${item.id}-${defaultSlicing || 'default'}-${defaultMilk || 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? {
                ...ci,
                quantity: ci.quantity + 1,
                itemTotal: (ci.quantity + 1) * item.price,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity: 1,
          selectedSlicing: defaultSlicing,
          selectedMilk: defaultMilk,
          selectedTemperature: defaultTemp,
          itemTotal: item.price,
        },
      ];
    });

    showToast(`Added 1x ${item.name} to your pickup bag`);
  };

  // Custom add with options from ItemDetailModal
  const handleAddToCart = (
    item: BakeryItem,
    quantity: number,
    options: {
      slicing?: string;
      warming?: boolean;
      milk?: string;
      temperature?: string;
      notes?: string;
    }
  ) => {
    let unitPrice = item.price;
    if (options.milk?.includes('+$0.75')) unitPrice += 0.75;
    if (options.milk?.includes('+$0.50')) unitPrice += 0.50;

    const optionsKey = `${options.slicing || ''}-${options.warming ? 'warm' : ''}-${options.milk || ''}-${options.temperature || ''}-${options.notes || ''}`;
    const cartItemId = `${item.id}-${optionsKey}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? {
                ...ci,
                quantity: newQty,
                itemTotal: newQty * unitPrice,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity,
          selectedSlicing: options.slicing,
          selectedWarming: options.warming,
          selectedMilk: options.milk,
          selectedTemperature: options.temperature,
          specialInstructions: options.notes,
          itemTotal: quantity * unitPrice,
        },
      ];
    });

    showToast(`Added ${quantity}x ${item.name} to your pickup bag`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId !== cartItemId) return ci;
        const unitPrice = ci.itemTotal / ci.quantity;
        return {
          ...ci,
          quantity: newQuantity,
          itemTotal: newQuantity * unitPrice,
        };
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleOrderPlaced = (newOrder: PlacedOrder) => {
    setPlacedOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveReceiptOrder(newOrder);
  };

  const handleReorder = (items: CartItem[]) => {
    setCartItems((prev) => [...prev, ...items]);
    setIsCartOpen(true);
    showToast(`Reordered ${items.length} item(s) to your bag`);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#271E15] flex flex-col font-sans selection:bg-[#E7DDD0]">
      
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Storefront Hero with Live Oven Status */}
        <Hero
          onExploreMenu={() => scrollToSection('menu-gallery')}
          onViewBoard={() => scrollToSection('hearth-board')}
        />

        {/* Daily Menu Gallery & Live Hearth Schedule Board */}
        <DailyHearthBoard
          items={menuItems}
          onSelectItem={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Full Online Ordering Menu Gallery with Filters */}
        <MenuGallery
          items={menuItems}
          onSelectItem={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Bakery Philosophy & Grain Transparency */}
        <BakeryStory />

        {/* Operating Hours, Counter Directions & Catering Form */}
        <BakeryHoursLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <ItemDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        cutleryNeeded={cutleryNeeded}
        onToggleCutlery={setCutleryNeeded}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cutleryNeeded={cutleryNeeded}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={activeReceiptOrder}
        onClose={() => setActiveReceiptOrder(null)}
        onViewHistory={() => {
          setActiveReceiptOrder(null);
          setIsHistoryOpen(true);
        }}
      />

      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={placedOrders}
        onReorder={handleReorder}
        onViewOrderReceipt={(order) => {
          setActiveReceiptOrder(order);
        }}
      />

      {/* Toast Notification (Feedback for adding to cart) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#271E15] text-[#FAF7F2] px-4 py-3 rounded-xl shadow-xl border border-[#423223] flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#3E5142] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-semibold text-[#DAC9B4] hover:underline cursor-pointer"
          >
            View Bag →
          </button>
        </div>
      )}

    </div>
  );
}
