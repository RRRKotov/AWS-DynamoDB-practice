import express from "express";
import { entityService } from "../services/entityService";
import { IEntity } from "../services/entityService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entities = await entityService.getEntities();
    res.json(entities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const entity = await entityService.getEntityById(id);
    res.json(entity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const entity = req.body;
  try {
    const entities = await entityService.getEntities();
    const id = entities.Items?.length.toString();
    const newEntity = await entityService.addOrUpdateEntity({ ...entity, id });
    res.json(newEntity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const entity = req.body;
  try {
    const newEntity = await entityService.addOrUpdateEntity(entity);
    res.json(newEntity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await entityService.deleteEntity(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

export const entityRoute = router;
