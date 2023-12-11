import { connectToDB } from "../../../utils/database";

import { Offer } from "../../../mongoose-models/models";

async function handler(req, res) {
  try {
    await connectToDB();

    const urlParts = req.url.split("/");

    const _id = urlParts[urlParts.length - 1];

    const offer = await Offer.findOne({ _id });

    res.status(200).json(offer);
  } catch (error) {
    console.log("----  WE HAVE ERROR ----");
    console.log(error);
  }
}

export default handler;
