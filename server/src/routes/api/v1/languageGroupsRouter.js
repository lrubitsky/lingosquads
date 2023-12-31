import express from "express";
import { LanguageGroup } from "../../../models/index.js";
import LanguageGroupSerializer from "../../../../serializers/LanguageGroupSerializer.js";
import { ValidationError } from "objection";

const languageGroupsRouter = new express.Router();

languageGroupsRouter.get("/", async (req, res) => {
  try {
    const languageGroupsData = await LanguageGroup.query();
    const serializedLanguageGroups = await LanguageGroupSerializer.getSummary(languageGroupsData);
    return res.status(200).json({ languageGroups: serializedLanguageGroups });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

languageGroupsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const languageGroupData = await LanguageGroup.query().findById(id);
    if (languageGroupData) {
      const serializedLanguageGroup = await LanguageGroupSerializer.getInfo(languageGroupData);
      res.status(200).json({ languageGroup: serializedLanguageGroup });
    } else {
      console.log(error);
      return res.status(404).json({ errors: error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

languageGroupsRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newGroup = await LanguageGroup.query().insertAndFetch(body);
    return res.status(201).json({ languageGroup: newGroup });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error);
      return res.status(422).json({ errors: error });
    }
    console.log(error);
    console.error("Error inserting new group:", error);

    return res.status(500).json({ errors: error });
  }
});

export default languageGroupsRouter;
