import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import articlesRoutes from "../modules/articles/articles.routes";
import cartRoutes from "../modules/cart/cart.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import apiariesRoutes from "./apiaries.routes";
import articleCategoriesRoutes from "./article-categories.routes";
import beekeeperApplicationsRoutes from "./beekeeper-applications.routes";
import beekeepersRoutes from "./beekeepers.routes";
import eventsRoutes from "./events.routes";
import honeyBatchesRoutes from "./honey-batches.routes";
import labResultsRoutes from "./lab-results.routes";
import labTestsRoutes from "./lab-tests.routes";
import newsletterSubscribersRoutes from "./newsletter-subscribers.routes";
import ordersRoutes from "./orders.routes";
import productImagesRoutes from "./product-images.routes";
import productCategoriesRoutes from "./product-categories.routes";
import productSubCategoriesRoutes from "./product-sub-categories.routes";
import productsRoutes from "./products.routes";
import sessionsRoutes from "./sessions.routes";
import checkoutRoutes from "./checkout.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/articles", articlesRoutes);
router.use("/users", usersRoutes);
router.use("/events", eventsRoutes);
router.use("/article_categories", articleCategoriesRoutes);
router.use("/newsletter_subscribers", newsletterSubscribersRoutes);
router.use("/beekeeper_applications", beekeeperApplicationsRoutes);
router.use("/beekeepers", beekeepersRoutes);
router.use("/apiaries", apiariesRoutes);
router.use("/honey_batches", honeyBatchesRoutes);
router.use("/lab_tests", labTestsRoutes);
router.use("/lab_results", labResultsRoutes);
router.use("/orders", ordersRoutes);
router.use("/products", productsRoutes);
router.use("/product_categories", productCategoriesRoutes);
router.use("/product_sub_categories", productSubCategoriesRoutes);
router.use("/product_images", productImagesRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;

