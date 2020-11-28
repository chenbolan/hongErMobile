export interface carouselData {
  imgUrl?: Array<string>;
  videoUrl?: string;
}

export interface descriptionData {
  exhibitorName: string;
  productName: string;
  productDesc: string;
  galleryLink: string;
  threeDLink: string;
  bigCategory: string;
  exhibitorLogo: string;
  carouselData: carouselData;
}