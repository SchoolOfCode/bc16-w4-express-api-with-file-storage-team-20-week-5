import express from "express";

import {
	getRecipes,
	getRecipeByID,
	createRecipe,
	updateRecipeByID,
	deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// create a get route
// respond with dummy response
app.get("/api/recipes", function (req, res) {
	res.json({ request: "success" });
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
