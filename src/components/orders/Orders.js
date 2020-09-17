import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import './Orders.css';
import { db } from '../../firebase';
import Order from './order/Order';
import { Header } from '../index';
import { useStateValue } from '../../contextAPI/StateProvider';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();
  const fadeProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          ),
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      <Header />
      <a.div style={fadeProps}>
        <div className='orders'>
          <h1>Your Orders</h1>
          <div className='orders__ocontainer'>
            {orders?.map((order) => (
              <Order order={order} />
            ))}
          </div>
        </div>
      </a.div>
    </>
  );
};

export default Orders;
