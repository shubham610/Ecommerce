const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // sameSite: "none",
    // secure: true,
    sameSite: "lax",
    secure: false,
    domain: "http://localhost:3000",
  };
  console.log(res.cookie("token", token));
  res.cookie("token", token);
  res.status(statusCode).cookie(`token`, token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
