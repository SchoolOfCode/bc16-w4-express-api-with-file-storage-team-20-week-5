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
export async function getRecipeByID(id) {}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
