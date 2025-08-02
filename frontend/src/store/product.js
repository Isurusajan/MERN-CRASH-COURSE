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
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE',
    });

    const data= await res.json();
    if (!data.success) {
      return { success: false, message: data.message  };
    }
    //update the ui immediately without needing to refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid)
    }));
    return { success: true, message: "Product deleted successfully" };
  }, // Added missing comma here

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    
    // Update the state
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      )
    }));
    
    // Return success response
    return { success: true, message: "Product updated successfully" };
  }
}));