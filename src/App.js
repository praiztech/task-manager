import TaskApp from "./Components/TaskApp";

export default function App() {
  return (
    <div className="content">
      <main>
        <TaskApp />
      </main>
      <footer>Built by Praise Agbabiaka</footer>
      <div role="status" className="visually-hidden"></div>
    </div>
  );
}