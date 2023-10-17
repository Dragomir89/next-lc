import { connectToDB } from "../../utils/database";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "You must use POST method" });
    return;
  }

  try {
    await connectToDB();
    console.log(req.body);
    res.status(201).json(req.body);
    // const newOffer = {
    //   value: req.body.value,
    // };
  } catch (error) {
    console.log(" --- HAS SOME ERROR");
    console.log(error.code);
    console.log(error);
    res.status(400).json({ errorMessage: "Невалидна оферта" });
  }
}

export default handler;
