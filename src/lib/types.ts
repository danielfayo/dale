export type User = {
  email?: string | null;
  uid?: string;
  typeOfUser: string;
  storeName: string | null;
  storeHeadline: string | null;
};

export type ContentFile = {
  id: string;
  file: string;
};

export type categoriesType = {
  name: string;
  description: string;
  value: string;
  isSelected: boolean;
};
export type ProductText = {
  name: string;
  description: string;
  price: string;
};

export type Product = {
  creatorId: string | undefined;
  creatorDisplayName: string | null | undefined;
  productName: string;
  productDesc: string;
  productPrice: number;
  productCategory: string;
  productCoverURL: null | string;
  productContentURLs: string[];
  sales: number;
};

export type ProductSnippet = {
  productName: string;
  productCoverURL: null | string;
  sales: number;
  productPrice: number
};
