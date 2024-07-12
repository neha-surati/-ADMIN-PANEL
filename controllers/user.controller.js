const ProductDB = require("../models/productSchema");
const userDB = require("../models/userSchema");
const nodemailer = require("nodemailer");

const home = async (req, res) => {
  let data = await userDB.find();
  res.send(data);
};

const signup = async (req, res) => {
  let data = await userDB.create(req.body);
  return res.redirect("/login");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let User = await userDB.findOne({ email: email });
  //   console.log("login con", User);
  if (User) {
    if (User.password === password) {
      //   console.log("pass ok");
      return res.redirect("/");
    }
    console.log("Wrong password....");
    return res.redirect("login");
  } else {
    console.log("Wrong email....");
    return res.redirect("login");
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let data = await userDB.findByIdAndUpdate(id, req.body);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
const deletedata = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await userDB.findByIdAndDelete(id, req.body);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
const indexPage = async (req, res) => {
  // const messages = req.flash("flashMsg");
  const ProductData = await ProductDB.find({});
  return res.render("index", { ProductData, messages: req.flash("flashMsg") });
};
const formPage = (req, res) => {
  return res.render("form-basic");
};

const tablepage = async (req, res) => {
  try {
    let data = await userDB.find({});
    console.log(data);
    return res.render("tables", { data });
  } catch (error) {
    console.log(error);
  }
};

const loginPage = (req, res) => {
  return res.render("authentication-login");
};

const signupPage = (req, res) => {
  return res.render("authentication-register");
};
const logout = (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
};

const local = async (req, res) => {
  console.log(req.body);
  res.end();
};

const profile = (req, res) => {
  let user = req.user;
  console.log(user);
  return res.render("profile", { user });
};

const changepassword = async (req, res) => {
  return res.render("changepassword");
};
const changepasswordPage = async (req, res) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;
  let { id } = req.user;
  let data = await userDB.findById(id);
  if (data.password == oldpassword) {
    if (newpassword == confirmpassword) {
      await userDB.findByIdAndUpdate(id, { password: newpassword });
      console.log("password change sucessfully...");
      return res.redirect("/logout");
    } else {
      console.log("New password and confirm password not match..");
      return res.redirect("/changepassword");
    }
  } else {
    console.log("wrong password..");
    return res.redirect("/changepassword");
  }
  res.end();
};
const resetPasswordpage = (req, res) => {
  return res.render("resetpassword");
};

let otp;
let uEmail;
const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userDB.findOne({ email });
  if (!user) {
    console.log("user not Found!");
    return res.redirect("/login");
  }
  uEmail = email;
  otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nehasurati1605@gmail.com",
      pass: "gxcr lmfa yqal arci",
    },
  });
  const mailerOptions = {
    from: "nehasurati1605@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `<h2>OTP ${otp}</h2>`,
  };
  transporter.sendMail(mailerOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.render("Otp");
    }
  });
};

const verifyOTPpage = (req, res) => {
  return res.render("Otp");
};
const newpasswordpage = (req, res) => {
  return res.render("newpassword");
};
const verifyOTP = (req, res) => {
  if (req.body.otp == otp) {
    console.log("OTP verified..");
    res.redirect("/newpassword");
  } else {
    console.log("wrong otp..");
  }
  res.end();
};
const newpassword=async(req,res)=>{
  try {
    const { newpassword, confirmpassword } = req.body;
    

    if (uEmail != "") {
      const user = await userDB.findOne({ email: uEmail  });

      if (newpassword === confirmpassword) {
        console.log(user);

        await userDB.findOneAndUpdate({ _id: user.id }, { password: newpassword });
        console.log("Password Changed Successfully");
       
        res.redirect("/");
      } else {
        console.log("New Password And Confirm Password Does Not Match");
        return res.redirect("/");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  home,
  signup,
  update,
  deletedata,
  indexPage,
  formPage,
  tablepage,
  signupPage,
  login,
  loginPage,
  logout,
  local,
  profile,
  changepassword,
  changepasswordPage,
  resetPasswordpage,
  resetPassword,
  verifyOTP,
  verifyOTPpage,
  newpasswordpage,
  newpassword
};
