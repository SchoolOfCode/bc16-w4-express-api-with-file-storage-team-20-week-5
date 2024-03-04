import { error } from "node:console";
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

async function readJsonFile(filePath) {
	try {
		const jsonData = await fs.readFile(filePath, "utf-8");
		const data = JSON.parse(jsonData);
		return data;
	} catch (error) {
		console.error("Error reading file", error);
	}
}

async function writeJsonFile(filePath, objectToWrite) {
	try {
		await fs.writeFile(
			filePath,
			JSON.stringify(objectToWrite, null, 2),
			"utf-8"
		);
		return objectToWrite;
	} catch (error) {
		console.error(`Error writing file to ${filePath} `, error);
	}
}

// GET ALL RECIPES
export async function getRecipes() {
	const recipes = await readJsonFile(fileName);
	return recipes;
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
	try {
		const recipes = await readJsonFile(fileName);
		for (const recipe of recipes) {
			if (recipe.id === id) {
				return recipe;
			}
		}
	} catch (error) {
		console.error("Error. Recipe not found ", error);
		return null;
	}
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
	// read json recipes save array to variable
	const recipes = await readJsonFile(fileName);
	// create new object with uuid and newRecipe
	const { title, ingredients, instructions, image } = newRecipe;
	const newObject = {
		id: uuidv4(),
		title,
		ingredients,
		instructions,
		image,
	};
	// push object to array
	recipes.push(newObject);
	// write to json and return new item
	await writeJsonFile(fileName, recipes);
	return newObject;
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
	// save variables
	const { title, ingredients, instructions, image } = updatedRecipe;
	// read jsonData
	const jsonData = await readJsonFile(fileName);
	// declare for scope reasons.
	let returnRecipe = null;

	// find item by id in recipes
	for (const recipe of jsonData) {
		console.log(recipe);
		// if located update the items with the nullish coalescing operator
		if (recipe.id === id) {
			returnRecipe = recipe;
			recipe.title = title ?? recipe.title;
			recipe.ingredients = ingredients ?? recipe.ingredients;
			recipe.instructions = instructions ?? recipe.instructions;
			recipe.image = image ?? recipe.image;

			break;
		}
	}
	await writeJsonFile(fileName, jsonData);
	return returnRecipe;
	// write to json file
	// return object written
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
