import React from 'react';
import { ShoppingBag, Clock, History } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenHistory: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenHistory,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DDD0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-serif font-bold tracking-tight text-[#271E15] hover:opacity-90 transition-opacity text-left cursor-pointer"
        >
          Levain & Hearth
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F4833]">
          <button
            onClick={() => onScrollToSection('hearth-board')}
            className="hover:text-[#271E15] transition-colors cursor-pointer py-1 relative hover:underline underline-offset-8"
          >
            Daily Oven Board
          </button>
          <button
            onClick={() => onScrollToSection('menu-gallery')}
            className="hover:text-[#271E15] transition-colors cursor-pointer py-1 relative hover:underline underline-offset-8"
          >
            Menu & Ordering
          </button>
          <button
            onClick={() => onScrollToSection('craft-story')}
            className="hover:text-[#271E15] transition-colors cursor-pointer py-1 relative hover:underline underline-offset-8"
          >
            Our Philosophy
          </button>
          <button
            onClick={() => onScrollToSection('hours-pickup')}
            className="hover:text-[#271E15] transition-colors cursor-pointer py-1 relative hover:underline underline-offset-8"
          >
            Hours & Pickup
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHistory}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5F4833] hover:text-[#271E15] hover:bg-[#E7DDD0]/50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="View Past Orders"
          >
            <History className="w-4 h-4" />
            <span>Past Orders</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping Bag with ${cartCount} items`}
            className="inline-flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#FAF7F2] bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] rounded-lg transition-all cursor-pointer shadow-sm whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-xs px-1.5 py-0.2 text-[#271E15] bg-[#E7DDD0] rounded font-semibold">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
