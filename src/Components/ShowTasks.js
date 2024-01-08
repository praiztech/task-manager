import TaskList from "./TaskLists";

export default function ShowTasks({tasks}) {
  return (
    <>
      <h1>My Tasks</h1>
      {
        tasks.length === 0 ? (
          <p>There are no available tasks.</p>
        ) : (
          <TaskList tasks={tasks} />
        )
      }
    </>
  );
}