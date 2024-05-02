import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(8); // Initially set to 8

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTodoText("");
  };

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
    handleInputLength(event);
  };

  const handleSaveTodo = () => {
    if (todoText.trim() !== "") {
      if (todoText.length <= 50) {
        setTodos([...todos, todoText]);
        setTodoText("");
        closeModal();
      } else {
        alert("To-do item should not exceed 50 characters.");
      }
    } else {
      alert("Please enter a to-do item.");
    }
  };

  const handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirmDelete) {
      const newTodos = [...todos];
      newTodos.splice((currentPage - 1) * todosPerPage + index, 1);
      setTodos(newTodos);

      if (currentTodos.length === 1 && currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleInputLength = (event) => {
    const inputLength = event.target.value.length;
    if (inputLength === 50) {
      alert("To-do item has reached the maximum limit of 50 characters.");
    }
  };

  const handleEditTodo = (index) => {
    const originalIndex = (currentPage - 1) * todosPerPage + index;
    setEditIndex(originalIndex);
    setEditText(todos[originalIndex]);
  };

  const handleUpdateTodo = () => {
    const newTodos = [...todos];
    newTodos[editIndex] = editText;
    setTodos(newTodos);
    setEditIndex(null);
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  if (todos.length > todosPerPage) {
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(
        Math.ceil(todos.length / todosPerPage),
        currentPage + 2
      );
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTodosPerPage(5); // Set to 5 on mobile devices
      } else {
        setTodosPerPage(8); // Set to 8 on larger screens
      }
    };

    handleResize(); // Initial call to set todosPerPage based on initial screen size
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Remove event listener on component unmount
    };
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1 className="title">Todo-list</h1>
      <div className="todo-button">
        <button onClick={openModal}>Create to-do</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              value={todoText}
              onChange={handleInputChange}
              placeholder="Enter to-do"
              maxLength={50}
            />
            <button onClick={handleSaveTodo}>Save</button>
          </div>
        </div>
      )}
      <div className="todo-cards">
        {currentTodos.map((todo, index) => (
          <div key={index} className="paper">
            <div className="pin">
              <div className="shadow"></div>
              <div className="metal"></div>
              <div className="bottom-circle"></div>
            </div>
            {editIndex === (currentPage - 1) * todosPerPage + index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <p>{todo}</p>
            )}
            <div className="icons">
              {editIndex === (currentPage - 1) * todosPerPage + index ? (
                <>
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={handleUpdateTodo}
                    className="check-icon"
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => setEditIndex(null)}
                    className="times-icon"
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEditTodo(index)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {pageNumbers.length > 0 && (
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      )}
      <footer className="footer">
        All rights received by @Soundhararajan L
      </footer>
    </div>
  );
}
