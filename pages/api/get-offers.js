import { connectToDB } from "../../utils/database";
import { Offer, PhoneNumbers } from "../../mongoose-models/models";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).json({ message: "You must use GET method" });
    return;
  }

  try {
    await connectToDB();
    const { page, rows } = req.query;

    function calculatePaginationDetails(page, offersPerPage) {
      page = Number(page);
      let skipVal =
        offersPerPage * (page - 1) < 0 ? 0 : offersPerPage * (page - 1);
      return skipVal;
    }

    const count = await Offer.countDocuments({});
    const offers = await Offer.find({})
      .skip(calculatePaginationDetails(page, rows))
      .limit(rows)
      .populate("constructionTypeId", "value")
      .populate("propertyTypeId", "value")
      .populate("state", "value")
      .populate("neighborhoodId", "value");

    res.status(201).json({ offers, count });
  } catch (error) {
    console.log(" --- HAS SOME ERROR");
    console.log(error.code);
    console.log(error);
    res.status(400).json({ errorMessage: "Невалидна оферта" });
  }
}

export default handler;
