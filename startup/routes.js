
const express = require("express");
const authRoutes = require("../routes/auth");
const placeRoutes = require("../routes/places");// adauga places ro

module.exports = (app) => {
  app.use(express.json());
  app.use(authRoutes);//app.use("/auth", authRoutes);
  app.use("/places", placeRoutes);// app.use('/place' );
};