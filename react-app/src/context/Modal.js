// frontend/src/context/Modal.js

// TODO: Bonus: Make the login form page into a modal
// import react-dom
import * as ReactDOM from "react-dom";

// import react
import { useContext, createContext, createRef, useEffect, useState } from "react";

// import css
import './Modal.css';

//? ModalContext
const ModalContext = createContext();

//? helper context function to use ModalContext
export const useModal = () => useContext(ModalContext);

/**
 * ?Modal functional component
 * 
 * @params onClose {function}
 * @params children {destructured props} 
 */
export const Modal = ({ onClose, children, currentVisible = true }) => {
  // state for modal
  const [visible, setVisible] = useState(currentVisible);

  // modalNode: reference to actual HTML DOM element of ModalProvider's div
  const modalNode = useModal();

  // if modalNode is falsey, return null
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal" style={{ zIndex: 11 }}>
      {/* modal-background div */}
      {/* When clicked, invoke onClose */}
      <div
        id="modal-background"
        className={`modal-background-${visible}`}
        onClick={onClose}
      />
      {/* modal-content div */}
      <div id="modal-content" style={{zIndex: 10}}>
        {/* render children props */}
        {children}
      </div>
    </div>,
    modalNode
  );
};


//? functional component: ModalProvider
export function ModalProvider({ children }) {
  //* React ref: modalRef
  const modalRef = createRef();

  /**
   * Controlled Inputs:
   * ------------------
   * value: value to set using modalRef.current
   */
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(modalRef.current);
  }, [modalRef]);

  // render ModalContext.Provider
  return (
    <>
      <ModalContext.Provider
        value={value}
      >
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}/>
    </>
  );
}
