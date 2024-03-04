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
app.get("/api/recipes", async function (req, res) {
	const recipes = await getRecipes();
	res.json(recipes);
});

// create a get by ID route
// Take ID out of body params
// respond with dummy response
app.get("/api/recipes/:id", async function (req, res) {
	const id = req.params.id;
	const recipe = await getRecipeByID(id);
	res.json(recipe);
});

// create a post request
// want to add to body with req.body
// respond in json form with boolean and recipes as payload

app.post("/api/recipes", async function (req, res) {
	const newRecipe = await createRecipe(req.body);
	res.json(newRecipe);
});

// grab req body
// grab params id

app.patch("/api/recipes/:id", async function (req, res) {
	const id = req.params.id;
	const recipeEdit = req.body;
	const updatedRecipe = await updateRecipeByID(id, recipeEdit);

	res.json(updatedRecipe);
});

// create a delete request
// take id out of body params
// respond with dummy response

app.delete("/api/recipes/:id", async function (req, res) {
	const id = req.params.id;
	const deletedItem = await deleteRecipeByID(id);
	res.json(deletedItem);
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
