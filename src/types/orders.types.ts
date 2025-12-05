export interface NewOrder {
  UserId: number;
  DesignId?: number;
  Size: "Small" | "Medium" | "Large";
  Flavor: string;
  Message?: string;
  Status?: "Pending" | "In Progress" | "Completed";
  DeliveryDate: Date;
  Notes?: string;
  ExtendedDescription?: string;
  SampleImages?: string[];
  ColorPreferences?: string[];
}
export interface updateOrder {
  UserId?: number;
  DesignId?: number;
  Size?: "Small" | "Medium" | "Large";
  Flavor?: string;
  Message?: string;
  Status?: "Pending" | "In Progress" | "Completed";
  DeliveryDate?: Date;
  Notes?: string;
  ExtendedDescription?: string;
  SampleImages?: string[];
  ColorPreferences?: string[];
}
