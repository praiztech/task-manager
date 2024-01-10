import deleteIcon from "../images/delete-icon.svg";

export default function TaskList({tasks}) {
  return (
    <ul role="list">
      {
        tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" id={`${task.id}-checkbox`} />
              <label htmlFor={`${task.id}-checkbox`} id={`${task.id}-name`}>{task.name}</label>
              <button type="button" aria-labelledby={`${task.id}-delete ${task.id}-name`}>
                <span id={`${task.id}-delete`} hidden>Delete</span>
                <img src={deleteIcon} alt="" />
              </button>
            </li>
          )
        })
      }
    </ul>
  );
}