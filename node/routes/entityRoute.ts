import express from "express";
import { entityService } from "../services/entityService";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

export const entityRoute = router;

router.get("/characters", async (req, res) => {
  try {
    const characters = await entityService.getEntities();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/characters/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const character = await entityService.getEntityById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/characters", async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await entityService.addOrUpdateEntity(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;
  try {
    const newCharacter = await entityService.addOrUpdateEntity(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.delete("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await entityService.deleteEntity(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});
