export interface Design {
  DesignID: number;
  DesignName: string;
  BaseFlavor: string;
  BasePrice: number;
  Availability: boolean;
  Size: string;
  Description: string;
  Category: string;
  ImageUrl: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
