import React from "react";
import { Dialog } from "@headlessui/react"; // Using @headlessui/react for modal functionality
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, onConfirm, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-4 text-lg font-semibold">
            Kyc Message
          </Dialog.Title>
          <Dialog.Description className="mb-4">{children}</Dialog.Description>
          <div className="flex justify-between">
            <button
              type="button"
              className="rounded bg-gray-500 px-4 py-2 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
