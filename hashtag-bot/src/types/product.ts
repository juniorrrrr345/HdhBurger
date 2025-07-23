export interface Product {
  id: string;
  name: string;
  description: string;
  prices: string; // Format: "5g:60\n10g:120"
  media?: string; // URL vers image ou vidéo
  type?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  prices: string;
  media?: File;
}