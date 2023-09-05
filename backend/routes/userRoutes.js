const router=require("express").Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUserDetails, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/me",isAuthenticatedUser,getUserDetails);
router.put("/password/update",isAuthenticatedUser,updatePassword);
router.put("/me/update",isAuthenticatedUser,updateProfile);
router.get("/admin/getallusers",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetails);
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser);




module.exports=router;