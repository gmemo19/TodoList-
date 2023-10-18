import { Box, Button, Checkbox, IconButton, Input, Modal } from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  handleAddTask,
  handleDeleteAllTasks,
  handleDeleteDoneTasks,
  handleDeleteTask,
  handleEditClick,
  handleInputChange,
  handleToggleComplete,
} from "../helpers/handleTasks";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { statuses } from "../enum/enum";

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedValue, setEditedValue] = useState([]);
  const [filterTask, setFilterTask] = useState("All");
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const fetchData = async (path) => {
    const options = { headers: { "platform-id": 1, locale: "en" } };
    const response = await fetch(path, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    alert("Api hatasi");
    return;
  };

  const getData = async () => {
    setIsLoading(true);
    const data = await fetchData("http://localhost:8000/api");
    console.log(data);
    const savedTasks = data.data;
    setTasks(savedTasks);
    setIsLoading(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterTask === "Done" && task.status === statuses.DONE) {
      return true;
    }
    if (filterTask === "Todo" && task.status === statuses.TODO) {
      return true;
    }
    if (filterTask === "All") {
      return true;
    }
    return false;
  });

  const handleOpen = (task) => {
    setEditedValue(task);
    setEditedDescription(task.description);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box height={"100%"} sx={{ width: "100%", mt: "25px" }}>
      <Box
        height={"300px"}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box fontSize={"25px"} fontWeight={"bold"} height={"50px"} mb={"15px"}>
          My List
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #000",
            borderRadius: "4px",
            width: "750px",
          }}
        >
          <TocIcon sx={{ m: 1 }} />
          <Input
            value={inputValue}
            placeholder="New Task"
            disableUnderline
            sx={{ flexGrow: 1 }}
            onChange={(e) => handleInputChange(setInputValue, e)}
          />
          <IconButton type="button" sx={{ m: 1 }}>
            {inputValue ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Box>
        <Button
          sx={{ border: "1px solid #000", width: "500px", marginTop: "20px" }}
          onClick={async () => {
            const isSuccesfull = await handleAddTask(inputValue);
            if (isSuccesfull) {
              await getData();
            } else alert("Görev Eklenemedi");
          }}
        >
          Add new task
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "750px",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("All")}
          >
            All
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("Done")}
          >
            Done
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "200px", border: "1px solid #000" }}
            onClick={() => setFilterTask("Todo")}
          >
            Todo
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {filteredTasks.map((task, index) => (
          <Box
            height={"50px"}
            key={task.id}
            sx={{
              width: "750px",
              border: "1px solid #000",
              mt: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "15px",
                textDecoration:
                  task.status === statuses.DONE ? "line-through" : "none",
              }}
            >
              <Box>{task.description}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "15px",
              }}
            >
              <Checkbox
                checked={task.status === statuses.DONE ? true : false}
                onChange={async () => {
                  const isSuccesfull = await handleToggleComplete(task);

                  if (isSuccesfull) {
                    await getData();
                    console.log("basarili");
                  } else alert("Görev Bitirilemedi");
                }}
              />
              <CreateIcon onClick={() => handleOpen(task)} />
              <DeleteIcon
                onClick={async () => {
                  const isSuccesfull = await handleDeleteTask(task);
                  if (isSuccesfull) {
                    await getData();
                  } else alert("Görev silinemedi");
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 750,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              height={"50px"}
              key={editedValue.id}
              sx={{
                width: "750px",
                mt: "15px",
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                height={"%100"}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
              >
                {editedValue.description}
              </Box>
            </Box>
            <Box
              height={"50px"}
              sx={{
                width: "750px",
                mt: "15px",
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                value={editedDescription}
                placeholder="New Task"
                disableUnderline
                height={"%100"}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
                onChange={(e) => setEditedDescription(e.target.value)}
              ></Input>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "750px",
                mt: 4,
                mb: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "300px", border: "1px solid #000" }}
                onClick={async () => {
                  const isSuccesfull = await handleEditClick(
                    editedDescription,
                    editedValue
                  );
                  if (isSuccesfull) {
                    await getData();
                  } else alert("Görev Eklenemedi");
                }}
              >
                SAVE
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "300px", border: "1px solid #000" }}
                onClick={handleClose}
              >
                CANCEL
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "750px",
            mt: 4,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "300px", border: "1px solid #000" }}
            onClick={async () => {
              const isSuccesfull = await handleDeleteDoneTasks();
              if (isSuccesfull) {
                await getData();
              } else alert("Görevler silinemedi");
            }}
          >
            DELETE DONE TASK
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "300px", border: "1px solid #000" }}
            onClick={async () => {
              const isSuccesfull = await handleDeleteAllTasks();
              if (isSuccesfull) {
                await getData();
              } else alert("Görevler silinemedi");
            }}
          >
            DELETE ALL TASK
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
