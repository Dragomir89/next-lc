import { connectToDB } from "../../utils/database";
import {
  ConstructionType,
  PropertyTypes,
  Neighborhood,
  State,
} from "../../mongoose-models/models";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "You must use POST method" });
    return;
  }

  try {
    await connectToDB();
    const newOption = {
      value: req.body.value,
    };

    switch (req.body.optionType) {
      case "constructionTypes":
        const constructionType = await ConstructionType.create(newOption);
        res.status(201).json(constructionType);
        break;
      case "propertyTypes":
        const propertyType = await PropertyTypes.create(newOption);
        res.status(201).json(propertyType);
        break;
      case "states":
        const state = await State.create(newOption);
        res.status(201).json(state);
        break;
      case "neighborhoods":
        const neighborhood = await Neighborhood.create(newOption);
        res.status(201).json(neighborhood);
        break;
      default:
        res.status(400).json({ errorMessage: "невалиден рекуест" });
    }
  } catch (error) {
    console.log(" --- HAS SOME ERROR");
    console.log(error.code);
    console.log(error);
    res.status(400).json({ errorMessage: "Тази стойност вече съществува" });
  }
}

export default handler;
