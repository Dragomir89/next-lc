import { connectToDB } from "../../utils/database";

import {
  ConstructionType,
  PropertyTypes,
  Neighborhood,
  State,
} from "../../mongoose-models/models";

async function handler(req, res) {
  try {
    await connectToDB();
    const constructionTypes = await ConstructionType.find();
    const propertyTypes = await PropertyTypes.find();
    const neighborhoods = await Neighborhood.find();
    const states = await State.find();

    res
      .status(200)
      .json({ constructionTypes, propertyTypes, neighborhoods, states });
  } catch (error) {
    console.log("----  WE HAVE ERROR ----");
    console.log(error);
  }
}

export default handler;
