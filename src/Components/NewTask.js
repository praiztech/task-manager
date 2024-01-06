export default function NewTask() {
  return (
    <>
      <button type="button" aria-controls="task-form" aria-expanded="true">
        Add New Task
      </button>
      <form id="task-form">
        <label htmlFor="task-name">Enter a task</label>
        <input type="text" name="task" id="task-name" autoComplete="off" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}