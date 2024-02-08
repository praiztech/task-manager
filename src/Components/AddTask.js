import { ShowIcon } from "../icons/Icons";
import { useEffect, useState } from "react";
import { useAddBtnRef } from "../context/TasksProvider";
import TaskForm from "./TaskForm";

export default function AddTask() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const addBtnRef = useAddBtnRef();

  useEffect(() => {
    function hideTaskFormOnEscape(evt) {
      if (evt.key === 'Escape' && showTaskForm) {
        setShowTaskForm(false);
        addBtnRef.current.focus();
      }
    }
    document.addEventListener('keydown', hideTaskFormOnEscape);
    return () => document.removeEventListener('keydown', hideTaskFormOnEscape);
  }, [showTaskForm]); // ensures hideTaskFormOnEscape accesses the most recent value of showTaskForm

  function hideTaskFormOnFocusOut(evt) {
    if (
      showTaskForm &&
      !evt.currentTarget.contains(evt.relatedTarget) &&
      evt.relatedTarget !== addBtnRef.current
    ) setShowTaskForm(false);
  }

  return (
    <div className="add-task">
      <button 
        className="add-task-trigger"
        type="button" 
        aria-expanded={showTaskForm}
        onClick={() => setShowTaskForm((prevTaskFormVisibility) => !prevTaskFormVisibility)}
        ref={addBtnRef}
      >
        <ShowIcon />
        Add New Task
      </button>
      {showTaskForm && <TaskForm onFocusOut={hideTaskFormOnFocusOut} />}
    </div>
  );
}