import express from "express";
import userRoutes from "./routes/userRoute.js";
import logger from "./middleware/logger.js";
import validator from "./middleware/validator.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/users", userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
