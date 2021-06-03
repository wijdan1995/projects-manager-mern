const Project = require("../models/project.model");

module.exports.findAllProjects = (req, res) => {
  Project.find({ user: req.user._id })
    .then(allProjects => res.json({ projects: allProjects }))
    .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
};

module.exports.findOneSingleProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then(oneSingleProject => res.json({ project: oneSingleProject }))
    .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
};

module.exports.createNewProject = (req, res) => {
  const {
    name,
    dueDate
  } = req.body
  Project.findOne({ name })
    .then(project => {
      if (!project) {
        Project.create({ name, dueDate, user: req.user._id, })
          .then(newlyCreatedProject => res.json({ project: newlyCreatedProject }))
          .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
      } else {
        res.status(400).json({
          errors: {
            name: {
              message: `The name ${name} has already used!`
            }
          }
        });
      }
    })
    .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));

};

module.exports.updateExistingProject = (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
    .then(updatedProject => res.json({ project: updatedProject }))
    .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
};

module.exports.deleteAnExistingProject = (req, res) => {
  Project.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.status(400).json({ message: "Something went wrong", ...err }));
};
