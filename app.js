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

// create a get by ID route
// Take ID out of body params
// respond with dummy response

app.get("/api/recipes/:id", function (req, res) {
	const extractedID = req.params.id;
	res.json({ requestID: extractedID });
});

// create a post request
// want to add to body with req.body
// respond in json form with boolean and recipes as payload

app.post("/api/recipes", function (req, res) {
	const newRecipe = req.body;
	res.json({ newRecipe: newRecipe, success: true });
});

// grab req body
// grab params id

app.patch("/api/recipes/:id", function (req, res) {
	const id = req.params.id;
	const recipeEdit = req.body;

	res.json({ recipeEdit, id: id });
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
