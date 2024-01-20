import { useRef, useEffect } from "react";

export default function TaskDeleteModal({ taskName, onCancel, onDelete }) {
  const deleteModalRef = useRef(null);

  useEffect(() => {
    deleteModalRef.current.showModal();
  }, []);

  return (
    <dialog className="task-delete-modal" onCancel={onCancel} ref={deleteModalRef}>
      <p>Are you sure you want to delete "{taskName}" task?</p>
      <div className="modal-actions" style={{display:"flex", justifyContent:"space-evenly"}}>
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