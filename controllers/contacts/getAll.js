const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  query.favorite = favorite ? favorite : { $in: [true, false] };

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json(result);
};

module.exports = getAll;
