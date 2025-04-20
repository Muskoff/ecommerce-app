import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  status: 'Active' | 'Inactive';
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
  };
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: 'featured',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    addReview: (state, action: PayloadAction<{ productId: number; review: Review }>) => {
      const product = state.products.find((p) => p.id === action.payload.productId);
      if (product) {
        product.reviews.push(action.payload.review);
        // Update average rating
        const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating = totalRating / product.reviews.length;
      }
      if (state.selectedProduct?.id === action.payload.productId) {
        state.selectedProduct.reviews.push(action.payload.review);
        const totalRating = state.selectedProduct.reviews.reduce((sum, r) => sum + r.rating, 0);
        state.selectedProduct.rating = totalRating / state.selectedProduct.reviews.length;
      }
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  addReview,
} = productSlice.actions;

export default productSlice.reducer; 