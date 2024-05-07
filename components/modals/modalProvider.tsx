import React from "react";
import { toJS } from "mobx";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";

const ModalProvider = ({
  store,
  children,
  showCloseButton = false,
  className = "ReactModal",
  isCloseAction = true,
}: any) => {
  const { modalStore } = store;
  const isModal = toJS(modalStore.modal);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const isModalAction = async () => {
    modalStore.closeModal();
    if (!isCloseAction) return;
    isCloseAction();
  };

  return (
    <Modal
      isOpen={isModal?.isShow}
      portalClassName={className}
      onRequestClose={isModalAction}
      closeTimeoutMS={350}
      style={customStyles}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      {showCloseButton && (
        <a
          className="close-modal-button"
          onClick={(e) => {
            e.preventDefault();
            isModalAction();
          }}
        >
          <i className="icofont-close"></i>
        </a>
      )}
      <div className="c-modal">{children}</div>
    </Modal>
  );
};

export default inject("store")(observer(ModalProvider));
