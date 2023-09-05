
const router=require("express").Router();
const { getAllProducts ,createProducts,updateProduct,deleteProduct,getSingleProduct, createReview, getAllReviews, deleteReview, getAdminProducts} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


router.get("/products",getAllProducts);
router.get("/admin/products",isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin") , createProducts);
router.put("/admin/product/update/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete("/admin/product/delete/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.get("/product/:id",getSingleProduct);
router.put("/product/review",isAuthenticatedUser,createReview);
router.get("/reviews",getAllReviews);
router.delete("/reviews",isAuthenticatedUser,deleteReview)

module.exports=router;