export type MenuCategory = 'all' | 'breads' | 'viennoiserie' | 'pastries' | 'savory' | 'drinks';

export type DietaryTag = 'vegan' | 'gluten_free_friendly' | 'nut_free' | 'organic_grain' | 'dairy_free';

export type BatchStatus = 'fresh_out_of_oven' | 'warm_and_ready' | 'baking_next' | 'sold_out_today';

export interface BakeryItem {
  id: string;
  name: string;
  frenchName?: string;
  category: Exclude<MenuCategory, 'all'>;
  price: number;
  description: string;
  flourBlend: string;
  hydrationPercent?: number;
  fermentationHours?: number;
  dietary: DietaryTag[];
  allergens: string[];
  tastingNotes: string[];
  batchStatus: BatchStatus;
  batchTimestamp: string; // e.g. "Baked 24m ago" or "Next batch in 18m"
  remainingCount?: number;
  isDailySpecial?: boolean;
  artworkType: 'boule' | 'baguette' | 'croissant' | 'pain_chocolat' | 'tart' | 'morning_bun' | 'focaccia' | 'brioche' | 'latte' | 'drip_coffee' | 'cookie' | 'cinnamon_knot';
  customization?: {
    slicingOptions?: string[]; // e.g. ["Whole (Unsliced)", "Thick Slice (Sandwich)", "Thin Slice (Toast)"]
    warmingAvailable?: boolean;
    milkChoices?: string[];
    temperatureChoices?: string[];
  };
}

export interface CartItem {
  cartItemId: string; // unique identifier based on item + options
  item: BakeryItem;
  quantity: number;
  selectedSlicing?: string;
  selectedWarming?: boolean;
  selectedMilk?: string;
  selectedTemperature?: string;
  specialInstructions?: string;
  itemTotal: number;
}

export interface PickupSchedule {
  pickupDate: string; // "Today, Oct 5" or "Tomorrow, Oct 6"
  pickupTime: string; // "8:30 AM", etc.
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupNotes?: string;
  cutleryNeeded: boolean;
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  schedule: PickupSchedule;
  status: 'received' | 'in_bakers_hearth' | 'boxed_and_ready' | 'completed';
}
