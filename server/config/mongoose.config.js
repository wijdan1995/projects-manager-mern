const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI , {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		console.log(`Established a connection to the database ${connection.connection.host}`)
	} catch (error) {
		console.log("Something went wrong when connecting to the database", error.message)
		process.exit(1)
	}
}


module.exports = connectDB