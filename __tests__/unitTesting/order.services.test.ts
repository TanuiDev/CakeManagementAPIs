import * as ordersRepository from '../../src/repositories/orders.repository';
import * as ordersService from '../../src/service/orders.service'; 

jest.mock('../../src/repositories/orders.repository');


describe('Orders Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should fetch all orders", async () => {
    const mockOrders = [{ id: 1, item: 'Item 1' }, { id: 2, item: 'Item 2' }];
    (ordersRepository.getAllOrders as jest.Mock).mockResolvedValue(mockOrders);

    const orders = await ordersService.fetchAllOrders();

    expect(orders).toEqual(mockOrders);
  });


});