import React from 'react'

const Toast = () => {

   
  return (
    <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={5000}
      autohide
      className="custom-toast"
    >
      <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
  );
}

export default Toast