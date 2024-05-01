import React from 'react';

function WhatsAppSender() {
  const sendMessage = () => {
    const message = encodeURIComponent("Hello, this is my message!");
    const phoneNumber = "9597755520"; // replace with recipient's phone number
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message via WhatsApp</button>
    </div>
  );
}

export default WhatsAppSender;
