import {create} from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async(newProduct) => {
    if (!newProduct.name || !newProduct.image|| !newProduct.price) {
        return { success: false, message: "Please provide all required fields" };
    }
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        return { success: false, message: `Server error: ${res.status}` };
      }

      const data = await res.json();
      
      // Only update state if we have valid data
      if (data.data) {
        set((state) => ({
          products: [...state.products, data.data]
        }));
      }
      
      return { success: true, message: data.message || "Product created successfully"};
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: "Failed to create product" };
    }
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data.data || [] });
  }
}));