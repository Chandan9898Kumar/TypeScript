export interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode: string | number;
    qrCode: string;
  }
  
  export interface Reviews {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface Products {
    availabilityStatus: string;
    brand: string;
    category: string;
    description: string;
    dimensions: Dimensions;
    discountPercentage: number;
    id: number;
    images: string[];
    meta: Meta;
    minimumOrderQuantity: number;
    price: number;
    rating: number;
    returnPolicy: string;
    reviews: Reviews;
    shippingInformation: string;
    sku: string;
    stock: number;
    tags: string[];
    thumbnail: string;
    title: string;
    warrantyInformation: string;
    weight: number;
  }
  