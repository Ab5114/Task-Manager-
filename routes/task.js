// routes.tasks.js
const express = require("express");

const router = express.Router();
const Task = require("../models/tasks");



router.get("/", async (req, res) => {
   
  try {

    const tasks = await Task.find();  
    console.log(tasks);
    res.render("todo", { tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add-Task", async (req, res) => {
  const taskContent = req.body.taskContent;
  const isCompleted = req.body.isCompleted;
console.log(taskContent);
console.log(isCompleted);
   if (!taskContent || taskContent.trim() === "") {
    return res.status(400).json({ error: "Task content is required." });
  }

  try {
     await Task.create({
      taskContent: taskContent.trim(),
      isCompleted: isCompleted,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
     console.error("Error creating task:", err.message);
    return res.status(500).json({
       
      error: "Failed to add task.",
         
    });
  }
});

router.delete('/delete-Task/:id', async(req,res)=>{
     const taskId = req.params.id;
console.log("task to be removed ", taskId);
     try{
        const deletedTask =await Task.findByIdAndDelete(taskId);
        if(deletedTask ){
            console.log("task deleted with id ",taskId);
            return res.status(200).json({success:true});
        }
        else   res.status(404).json({error:"Task not found"});
    
     }
     catch(error){
console.error(error);
return res.status(500).json({error:"Failed to delete the Task" });
     }

})

router.put("/update-Task/:id", async (req, res) => {
  const taskId = req.params.id;
  const { isCompleted } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }  
    );

    if (updatedTask) {
      return res.status(200).json({ success: true});
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the task" });
  }
});


module.exports = router;
