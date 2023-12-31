import express from "express";
// import passport, { serializeUser } from "passport";
import { User } from "../../../models/index.js";
import UserSerializer from "../../../../serializers/UserSerializer.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    nativeLanguage,
    englishLevel,
    ageRange,
    location,
    introduction,
    imageUrl,
  } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({
      email,
      password,
      username,
      firstName,
      lastName,
      nativeLanguage,
      englishLevel,
      ageRange,
      location,
      introduction,
      imageUrl,
    });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.query().findById(id);
    const serializedUser = await UserSerializer.getProfileOfOne(userData);
    if (userData) {
      res.status(200).json({ profile: serializedUser });
      console.log("IMG", serializedUser.imageUrl);
    } else {
      console.log(error);
      return res.status(404).json({ errors: error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.query().findById(id);
    await updatedUser.$query().patch(req.body);
    const serializedUser = await UserSerializer.getProfileOfOne(updatedUser);
    return res.status(200).json({ user: serializedUser });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
