import addIcon from "../images/add-icon.svg";
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
      evt.relatedTarget !== null && // 4 when user clicks on the empty space within the form
      !evt.currentTarget.contains(evt.relatedTarget)
    ) setShowTaskForm(false);
  }

  return (
    <div className="add-task" onBlur={hideTaskFormOnFocusOut}>
      <button 
        className="add-task-trigger"
        type="button" 
        aria-expanded={showTaskForm}
        onClick={() => setShowTaskForm((prevTaskFormVisibility) => !prevTaskFormVisibility)}
        ref={addBtnRef}
      >
        <img src={addIcon} alt="" />
        Add New Task
      </button>
      {showTaskForm && <TaskForm />}
    </div>
  );
}