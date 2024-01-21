import { useShowModal } from "../context/ModalProvider";
import TaskApp from "./TaskApp";

export default function AppContent() {
  const showModal = useShowModal();
  
  return (
    <div className="content-bg">
      <div className={showModal ? 'content modal-open' : 'content'}>
        <main>
          <TaskApp />
        </main>
        <footer>Designed & Built by Praise Agbabiaka</footer>
      </div>
    </div>
  );
}