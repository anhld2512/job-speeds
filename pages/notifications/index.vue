<template>
    <div class="flex-row flex-wrap gap-3">
      <h1>Nuxt 3 Web Push Notifications</h1>
      <button @click="sendNotification" class="btn btn-sm btn-accent mx-1">Send Notification</button>
      <button @click="registerForPushNotifications" class="btn btn-sm btn-error mx-1">Register for Push Notifications</button>
    </div>
  </template>
  
  <script setup>
  const { $api } = useNuxtApp();
  
  const registerForPushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const swReg = await navigator.serviceWorker.getRegistration();
      if (swReg) {
        const subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')
        });
        await $api.post('/save-subscription', subscription);
        alert('Subscribed to push notifications');
      } else {
        alert('Service Worker registration not found');
      }
    } else {
      alert('Push messaging is not supported');
    }
  };
  
  const sendNotification = async () => {
    const notificationPayload = {
      title: 'New Notification',
      body: 'This is a test notification',
    };
  
    await $api.post('/notifications/send-notification', notificationPayload);
  };
  
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  </script>