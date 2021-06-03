const express = require('express')
const router = express.Router();
const ProjectController = require("../controllers/project.controller");
const { protect } = require("../middleware/auth.middleware.js");

router.get("/", protect, ProjectController.findAllProjects);
router.post("/new", protect, ProjectController.createNewProject);
router.put("/update/:id", protect, ProjectController.updateExistingProject);
router.get("/:id", protect, ProjectController.findOneSingleProject);
router.delete("/delete/:id", protect, ProjectController.deleteAnExistingProject);



module.exports = router