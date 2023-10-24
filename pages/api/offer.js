import { connectToDB } from "../../utils/database";
import { Offer } from "../../mongoose-models/models";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "You must use POST method" });
    return;
  }

  try {
    await connectToDB();
    const phoneNumbers = [];
    req.body.phoneNumber ? phoneNumbers.push(req.body.phoneNumber) : false;
    req.body.phoneNumber2 ? phoneNumbers.push(req.body.phoneNumber2) : false;
    req.body.phoneNumber3 ? phoneNumbers.push(req.body.phoneNumber3) : false;

    const {
      area,
      phoneNumber,
      addedOn,
      description,
      price,
      address,
      info,
      propertyOwnerName,
      floor,
      constructionTypeId,
      propertyTypeId,
      state,
      neighborhoodId,
      nextCall,
      lastCall,
    } = req.body;
    const newOffer = await Offer.create({
      area,
      phoneNumber,
      phoneNumbers,
      addedOn,
      description,
      price,
      address,
      info,
      propertyOwnerName,
      floor,
      constructionTypeId,
      propertyTypeId,
      state,
      neighborhoodId,
      nextCall,
      lastCall,
    });

    res.status(201).json(newOffer);
  } catch (error) {
    console.log(" --- HAS SOME ERROR");
    console.log(error.code);
    console.log(error);
    res.status(400).json({ errorMessage: "Невалидна оферта" });
  }
}

export default handler;
