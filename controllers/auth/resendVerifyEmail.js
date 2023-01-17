const { User } = require("../../models/user");
const { HttpErrors, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw HttpErrors(404);
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click for verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Resend verify email",
  });
};

module.exports = resendVerifyEmail;
