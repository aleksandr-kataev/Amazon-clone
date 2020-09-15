import React, { createRef } from 'react';
import NotificationSystem from 'react-notification-system';

const Notification = () => {
  const notificationSystem = createRef();

  const addItemNotification = (e) => {
    e.preventDefault();
    const notification = notificationSystem.current;
    notification.addNotification({
      message: 'Item had been added',
      level: 'success',
    });
  };

  const emptyBasketNotification = (e) => {
    e.preventDefault();
    const notification = notificationSystem.current;
    notification.addNotification({
      message: 'Empty basket',
      level: 'error',
    });
  };

  return <NotificationSystem ref={this.notificationSystem} />;
};

export default Notification;
