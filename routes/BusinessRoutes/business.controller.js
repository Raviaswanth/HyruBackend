import Business from "../../models/Business.js";


export const getBusiness = async (req, res) => {

  const { _id } = req.body;
  try {

    const business = await Business.findById(_id);
    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

}

export const createBusiness = async (req, res) => {
  const body = req.body;
  const email = req.body.email;
  const businessABN = req.body.businessABN;
  const mobileNumber = req.body.mobileNumber;

  const newBusiness = new Business(body);
  try {

    const checkUserExist = await Business.findOne({ $or: [{ email }, { businessABN }, { mobileNumber }] }).countDocuments();
    if (!checkUserExist == 1) {
      await newBusiness.save();
      res.status(200).json(newBusiness);
    } else {

      res.status(401).json({ message: "Business already exist with this Details" });
    }
  } catch (error) {

    res.status(409).json({ message: error.message });

  }
}
export const updateBusiness = async (req, res) => {
  try {
    const { _id } = req.query;
    // console.log(_id);
    const body = req.body;
    console.log(body);
    // const business = await Business.findOne()
    const business = await Business.findOneAndUpdate({ _id }, body, { new: true });
    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}
