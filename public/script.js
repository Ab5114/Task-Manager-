function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  console.log(taskText);

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }
  fetch("/todo/add-Task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskContent: taskText, isCompleted: false }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      } else {
        alert("Failed to add task");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the task.");
    });

  taskInput.value = "";
}

function toggleTask(checkbox) {
  const taskItem = checkbox.closest("li");
  const taskId = taskItem.dataset.id;
  const isCompleted = checkbox.checked;

  fetch(`/todo/update-Task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted: isCompleted }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const taskContent = taskItem.querySelector(".task-content span");

        if (isCompleted) {
          taskContent.classList.add("completed");
        } else {
          taskContent.classList.remove("completed");
        }

        console.log(`Task with id ${taskId} updated successfully.`);
      } else {
        alert("Failed to update task completion status.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while updating the task.");
    });
}

function removeTask(button) {
  const taskItem = button.closest("li");
  const taskId = taskItem.dataset.id;
  fetch(`/todo/delete-Task/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        console.log("task removed with id ", taskId);
        location.reload();
      } else alert("Failed to delete task");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the task.");
    });
}
