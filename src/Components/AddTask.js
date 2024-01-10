import { useEffect, useRef, useState } from "react";
import TaskForm from "./TaskForm";

export default function AddTask() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const addBtnRef = useRef(null);

  useEffect(() => {
    function hideTaskFormOnEscape(evt) {
      if (evt.key === 'Escape') {
        setShowTaskForm(false);
        addBtnRef.current.focus();
      }
    }
    document.addEventListener('keydown', hideTaskFormOnEscape);
    return () => document.removeEventListener('keydown', hideTaskFormOnEscape);
  }, []);

  function hideTaskFormOnFocusOut(evt) {
    if (!evt.currentTarget.contains(evt.relatedTarget) && showTaskForm) setShowTaskForm(false);
  }

  return (
    <div onBlur={hideTaskFormOnFocusOut}>
      <button 
        type="button" 
        aria-expanded={showTaskForm}
        onClick={() => setShowTaskForm((prevTaskFormVisibility) => !prevTaskFormVisibility)}
        ref={addBtnRef}
      >
        Add New Task
      </button>
      {showTaskForm && <TaskForm />}
    </div>
  );
}