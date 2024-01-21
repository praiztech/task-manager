import { useRef, useEffect } from "react";

export default function TaskDeleteModal({ taskName, onCancel, onDelete }) {
  const deleteModalRef = useRef(null);

  useEffect(() => {
    deleteModalRef.current.showModal();
  }, []);

  return (
    <dialog aria-labelledby="modal-title" onCancel={onCancel} ref={deleteModalRef}>
      <h2 id="modal-title">Delete Confirmation</h2>
      <p>Are you sure you want to delete "{taskName}" task?</p>
      <div className="cta-wrapper">
        <button 
          onClick={() => {
            deleteModalRef.current.close();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            deleteModalRef.current.close();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </dialog>
  );
}