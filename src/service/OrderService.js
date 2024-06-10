// status: 0表示未发货，1表示已发货
const defaultOrderList = [
  {
      id: 1,
      productName: '华为 HUAWEI P20',
      orderNumber: '20240608114514',
      customerName: 'Customer1',
      date: '2024-6-11',
      price: '￥4899',
      status: 0
  },
  {
      id: 2,
      productName: 'HLA海澜之家简约动物印花短袖T恤',
      orderNumber: '20240610114514',
      customerName: 'Customer1',
      date: '2024-6-10',
      price: '￥489',
      status: 1
  }
];

class OrderService  { 
    orderList = []; 
    constructor () { 
        this._getData(); 
    } 
    getOrders () { 
        return this.orderList; 
    } 
    addOrder (order) { 
        this.orderList.push(order); 
        this._setData(); 
    } 
    // 生成新的订单ID并添加订单
    addNewOrder (newOrder) { 
        const id = this.orderList.length > 0 ? this.orderList[this.orderList.length - 1].id + 1 : 1;
        const orderNumber = new Date().toISOString().replace(/[-T:]/g, '').split('.')[0];
        const price = `￥${newOrder.price}`;  
        const order = { ...newOrder, id, orderNumber, price };
        this.addOrder(order);
        return order;
    } 
    deleteOrder (id) { 
        this.orderList = this.orderList.filter(order => order.id !== id); 
        this._setData(); 
    } 
    handleShip (id) { 
        const index = this.orderList.findIndex(order => order.id === id); 
        if (index !== -1) { 
            const updatedOrder = { ...this.orderList[index], status: 1 }; 
            this.updateOrder(updatedOrder); 
        } 
    } 
    updateOrder(updatedOrder) {
        const index = this.orderList.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
            this.orderList[index] = updatedOrder;
            this._setData();
        }
    }
    _getData () { 
        const data = localStorage.getItem('orderList'); 
        if (data) { 
            this.orderList = JSON.parse(data); 
        } else { 
            this.orderList = defaultOrderList; 
            this._setData(); 
        } 
    } 
    _setData () { 
        localStorage.setItem('orderList', JSON.stringify(this.orderList)); 
    } 
}

export default OrderService;