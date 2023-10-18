import { statuses } from "../enum/enum";
import { deleteData, postData, putData } from "../services/apiServices";

export const handleInputChange = (setInputValue, e) => {
  setInputValue(e.target.value);
};

export const handleDeleteTask = async (task) => {
  const response = await deleteData(
    `http://localhost:8000/api/delete/${task.id}`
  );
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const handleToggleComplete = async (task) => {
  let newStatus;
  if (task.status === statuses.DONE) {
    newStatus = statuses.TODO;
  } else {
    newStatus = statuses.DONE;
  }
  const body = {
    status: newStatus,
    description: task.description,
  };
  const response = await putData(
    `http://localhost:8000/api/update/${task.id}`,
    body
  );
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const handleEditClick = async (editedDescription, editedValue) => {
  if (!editedDescription.trim()) {
    alert("Görev açıklaması boş olamaz");
    return;
  }
  const previousStatus = editedValue.status;

  const body = {
    description: editedDescription,
    status: previousStatus,
  };
  const response = await putData(
    `http://localhost:8000/api/update/${editedValue.id}`,
    body
  );
  if (response) {
    return true;
  } else {
    return false;
  }
};

export const handleDeleteDoneTasks = async (task) => {
  const path = "http://localhost:8000/api/deleteDoneTasks";
  const response = await deleteData(path);

  if (response) {
    return true;
  } else {
    return false;
  }
};

export const handleDeleteAllTasks = async () => {
  const path = "http://localhost:8000/api/deleteAll";
  const response = await deleteData(path);

  if (response) {
    return true;
  } else {
    return false;
  }
};

export const handleAddTask = async (inputValue) => {
  if (inputValue.trim() !== "") {
    const body = {
      description: inputValue,
      status: statuses.TODO,
    };
    const res = await postData("http://localhost:8000/api/createTask", body);
    if (res) {
      return true;
    }
    return false;
  }
  return false;
};
