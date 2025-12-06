export interface Delivery {
  OrderId: number;
  DeliveryAddress: string;
  DeliveryDate: string;
  CourierName?: string;
  CourierContact?: string;
  Status?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}
