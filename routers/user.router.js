const { Router } = require("express");
const {
  home,
  signup,
  update,
  deletedata,
  indexPage,
  signupPage,
  login,
  loginPage,
  logout,
  local,
  profile,
  changepassword,
  changepasswordPage,
  resetPassword,
  verifyOTP,
  verifyOTPpage,
  resetPasswordpage,
  newpasswordpage,
  newpassword,
} = require("../controllers/user.controller");
const { userAuth, isAuth, localAuth } = require("../middleware/user.Auth");
const passport = require("passport");
const router = Router();

router.get("/", isAuth, indexPage);
router.get("/data", home);

router.post("/signup", userAuth, signup);
router.get("/signup", signupPage);

router.patch("/update/:id", update);
router.delete("/delete/:id", deletedata);

router.post("/login", login);
router.get("/login", loginPage);

router.get("/logout", logout);

router.post(
  "/local",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/profile", isAuth, profile);
router.get("/changepassword", isAuth, changepassword);
router.post("/changepassword", isAuth, changepasswordPage);

router.get("/resetpassword", resetPasswordpage);
router.post("/resetpassword", resetPassword);

router.get("/otp-verification", verifyOTPpage);
router.post("/otp-verification", verifyOTP);
router.get("/newpassword", newpasswordpage);
router.post("/newpassword", newpassword);

module.exports = { router };
