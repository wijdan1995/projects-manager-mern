const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
	name: {
		type: String,
		required: [ true, "Name is required" ],
		minlength: [3, "Name must be at least 3 characters long"]
	},
	dueDate: {
		type:Date,
		required:[ true, "Due Date is required" ]
	},
	startDate: {
		type:Date,
	},
	completeDate: {
		type:Date,
	},
	state: {
		type:String,
		default: "backlog"
	}
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
