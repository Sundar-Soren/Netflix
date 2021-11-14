const User = require("../model/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");

// User Register
exports.register = async (req, res) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(401).json({
        error: "User Already Exist",
      });
    }
    user = await User.create({
      username,
      email,
      password,
      // avatar: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
    });

    const token = user.getJWTToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

//User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please Enter Email and Password",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User Not Exist",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Password Not Match",
      });
    }

    const token = user.getJWTToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

//Logout User

exports.userLogout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};
// exports.isLogin = expressJwt({
//   secret: process.env.SECRET_KEY,
//   userProperty: "auth",
//   algorithms: ["HS256"],
// });

// exports.isAuthenticated = (req, res, next) => {
//   const checker = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!checker) {
//     return res.status(401).json({
//       error: "Access Denied",
//     });
//   }
//   next();
// };

// exports.isAdmin = (req, res, next) => {
//   if (!req.profile.isAdmin) {
//     return res.status(400).json({
//       error: "You Are Not Admin",
//     });
//   }
//   next();
// };

//Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "User Not Found !",
      });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/password/reset/${resetToken}`;

    const message = `Your Password reset link is : \n\n ${resetPasswordUrl} \n\n If you have not requested then ignore this email`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset For Netflix : Netflix",
        message,
      });

      res.status(200).json({
        message: `Email send to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(401).json({
        error: error,
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
};

//Reset Password

exports.resetPassword = async (req, res) => {
  try {
    //Creating token hash

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Reset password token is invalid or expired!",
      });
    }

    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({
        error: "Confirm password Does Not Match !",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = user.getJWTToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

//Get User Details

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

//Update password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Old Password Not Match",
      });
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return res.status(400).json({
        error: "Confirm password Does Not Match !",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = user.getJWTToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
//Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      // updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
//get all users --Admin
exports.getAllUsers = async (req, res) => {
  try {
    const userCount = await User.count();
    const users = await User.find();
    res.status(200).json({
      userCount,
      users,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
//get single users --Admin
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: `User Not exist with the Id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({
      error: `User Not exist with the Id: ${req.params.id}`,
    });
  }
};

//Update User role --Admin
exports.updateUserByAdmin = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    return res.status(401).json({
      error: "Invalid user Id",
    });
  }
};

//delete User --Admin
exports.deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: `User Not Found with this id: ${req.params.id}`,
      });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successflly",
    });
  } catch (error) {
    return res.status(401).json({
      error: `Invalid User id: ${req.params.id}`,
    });
  }
};

// MAIN AUTH

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      error: "Please Login To Access This Resource",
    });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  try {
    req.user = await User.findById(decodeToken.id);
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Some Problem in Cookies",
    });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Your Are Not Admin",
      });
    }
    next();
  };
};
