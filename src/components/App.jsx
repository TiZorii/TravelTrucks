import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Catalog = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const Details = lazy(() => import("../pages/DetailsPage/DetailsPage"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Details />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};