const defaultOrderList = [
  {
      id: 1,
      productName: 'Product A',
      customerName: 'John Doe',
      amount: 2,
      status: 'New'
  },
  {
      id: 2,
      productName: 'Product B',
      customerName: 'Jane Doe',
      amount: 5,
      status: 'Shipped'
  }
];

class OrderService {
    orderList = [];

    constructor() {
        this._getData();
    }

    getOrders() {
        return this.orderList;
    }

    addOrder(order) {
        this.orderList.push(order);
        this._setData();
    }

    updateOrder(updatedOrder) {
        const index = this.orderList.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
            this.orderList[index] = updatedOrder;
            this._setData();
        }
    }

    deleteOrder(id) {
        this.orderList = this.orderList.filter(order => order.id !== id);
        this._setData();
    }

    _getData() {
        const data = localStorage.getItem('orderList');
        if (data) {
            this.orderList = JSON.parse(data);
        } else {
            this.orderList = defaultOrderList;
            this._setData();
        }
    }

    _setData() {
        localStorage.setItem('orderList', JSON.stringify(this.orderList));
    }
}

export default OrderService;