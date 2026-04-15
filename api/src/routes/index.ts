import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import articlesRoutes from "../modules/articles/articles.routes";
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
import productsRoutes from "./products.routes";
import sessionsRoutes from "./sessions.routes";
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
router.use("/product_images", productImagesRoutes);
router.use("/sessions", sessionsRoutes);

export default router;

