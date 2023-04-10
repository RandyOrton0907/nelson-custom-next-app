import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { deleteCart } from "../../stores/Action";
import { DataContext } from "../../stores/GlobalState";
function Modals({ itemId }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  let subtitle;
  let closeButton;
  let customText;
  let customBtn;
  let Btn1, Btn2;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.paddingBottom = "20px";
    subtitle.style.marginBottom = "20px";
    subtitle.style.borderBottom = "1px solid #ddd";
    subtitle.style.fontSize = "20px";
    subtitle.style.fontWeight = "500";

    closeButton.style.position = "absolute";
    closeButton.style.top = "30px";
    closeButton.style.right = "30px";
    closeButton.style.background = "unset";
    closeButton.style.border = "unset";
    closeButton.style.outline = "0";

    customText.style.paddingBottom = "20px";
    customText.style.marginBottom = "20px";
    customText.style.borderBottom = "1px solid #ddd";

    customBtn.style.textAlign = "right";
    Btn1.style.marginRight = "20px";
    Btn1.style.padding = "10px 20px";
    Btn1.style.border = "unset";
    Btn1.style.outline = "0";
    Btn1.style.fontSize = "16px";
    Btn1.style.fontWeight = "500";
    Btn1.style.background = "#111";
    Btn1.style.color = "#fff";
    Btn1.style.borderRadius = "4px";
    Btn1.style.cursor = "pointer";

    Btn2.style.padding = "10px 20px";
    Btn2.style.border = "unset";
    Btn2.style.outline = "0";
    Btn2.style.fontSize = "16px";
    Btn2.style.fontWeight = "500";
    Btn2.style.background = "#0080FF";
    Btn2.style.color = "#fff";
    Btn2.style.borderRadius = "4px";
    Btn2.style.cursor = "pointer";

    // bg.style.background = "rgb(0 0 0 / 82%";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      width: "35%",
    },
  };

  return (
    <>
      <div>
        <button onClick={openModal} className="nls-btn-remove">
          <i className="fa-solid fa-trash-xmark"></i>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Wedding invitation
          </h2>
          <button
            onClick={closeModal}
            ref={(_closeButton) => (closeButton = _closeButton)}
          >
            <i className="fa-light fa-xmark"></i>
          </button>
          <div ref={(_customText) => (customText = _customText)}>
            Do you want delete this item?
          </div>
          <div ref={(_customBtn) => (customBtn = _customBtn)}>
            <button
              ref={(_Btn1) => (Btn1 = _Btn1)}
              type="button"
              onClick={() => {
                dispatch(deleteCart(cart, itemId));
              }}
            >
              Yes
            </button>
            <button ref={(_Btn2) => (Btn2 = _Btn2)} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Modals;
