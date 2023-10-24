const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.ObjectId;

const constrTypeSchema = new Schema({
  value: { type: String, unique: true },
});

const propertyTypeSchema = new Schema({
  value: { type: String, unique: true },
});

const neighborhoodSchema = new Schema({
  value: { type: String, unique: true },
});

const OfferPhoneIdsSchema = new Schema({
  phoneId: { type: ObjectId, required: true, ref: "phoneNumbers" },
  offerId: { type: ObjectId, required: true, ref: "offers" },
  isMein: { type: Boolean, required: true },
});

const phoneSchema = new Schema({
  phoneNumber: { type: String, required: true },
  offerId: { type: ObjectId, required: true, ref: "offers" },
});

const stateSchema = new Schema({
  value: { type: String, unique: true },
});

const offerSchema = new Schema({
  // number: { type: Number, required: "Offer Number is required" },
  area: Number,
  description: String,
  phoneNumber: String,
  phoneNumbers: [{ type: String, type: String, lowercase: true, trim: true }],
  price: Number,
  address: String,
  info: String,
  propertyOwnerName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  floor: Number,
  constructionTypeId: {
    type: ObjectId,
    required: true,
    ref: "constructionTypes",
  },
  propertyTypeId: { type: ObjectId, required: true, ref: "propertyTypes" },
  state: { type: ObjectId, required: true, ref: "states" },
  neighborhoodId: { type: ObjectId, required: true, ref: "neighborhoods" },
  addedOn: { type: Date },
  // addedFrom: { type: ObjectId, ref: "users" },
  lastCall: { type: Date },
  nextCall: { type: Date },
  isDeleted: { type: Boolean, default: false },
  deletedOn: { type: Date, default: null },
});

const ConstructionType =
  mongoose.models.constructionTypes ||
  mongoose.model("constructionTypes", constrTypeSchema);
const PropertyTypes =
  mongoose.models.propertyTypes ||
  mongoose.model("propertyTypes", propertyTypeSchema);
const Neighborhood =
  mongoose.models.neighborhoods ||
  mongoose.model("neighborhoods", neighborhoodSchema);
const OfferPhoneIds =
  mongoose.models.offerPhoneIds ||
  mongoose.model("offerPhoneIds", OfferPhoneIdsSchema);

const PhoneNumbers =
  mongoose.models.phoneNumbers || mongoose.model("phoneNumbers", phoneSchema);
const State = mongoose.models.states || mongoose.model("states", stateSchema);
const Offer = mongoose.models.offers || mongoose.model("offers", offerSchema);

export {
  ConstructionType,
  PropertyTypes,
  Neighborhood,
  OfferPhoneIds,
  PhoneNumbers,
  State,
  Offer,
};

export default ConstructionType;
