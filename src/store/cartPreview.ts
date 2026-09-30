import { create } from "zustand";

// UI-only state for the "added to cart" preview; not persisted
interface CartPreviewStore {
  open: boolean;
  lastAddedId: string | null;
  show: (variantId: string) => void;
  hide: () => void;
}

export const useCartPreviewStore = create<CartPreviewStore>()((set) => ({
  open: false,
  lastAddedId: null,
  show: (variantId) => set({ open: true, lastAddedId: variantId }),
  hide: () => set({ open: false }),
}));
