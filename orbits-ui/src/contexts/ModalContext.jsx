// import React, { useState, createContext, useContext } from 'react';
// import LoginModal from '../components/exchange/LoginModal';
// import PermissionError from '../components/exchange/PermissionError';

// const ModalContext = createContext();

// export const useModal = () => {
//   return useContext(ModalContext);
// };

// export const ModalProvider = ({ children }) => {
//   const [modal, setModal] = useState(null);

//   const showModal = (modalType, modalProps = {}) => {
//     setModal({ type: modalType, props: modalProps });
//   };

//   const hideModal = () => {
//     setModal(null);
//   };

//   const renderModal = () => {
//     if (!modal) {
//       return null;
//     }

//     const { type, props } = modal;

//     switch (type) {
//       case 'login':
//         return <LoginModal open={true} onClose={hideModal} {...props} />;
//       case 'permissionError':
//         return <PermissionError open={true} onClose={hideModal} {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <ModalContext.Provider value={{ showModal, hideModal }}>
//       {children}
//       {renderModal()}
//     </ModalContext.Provider>
//   );
// };
