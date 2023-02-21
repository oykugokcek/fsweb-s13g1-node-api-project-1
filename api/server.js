// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const Users = require("./users/model");

const server = express();
server.use(express.json());

server.get("/api/users", async (req, res) => {
  let users = await Users.find();
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  let user = await Users.findById(req.params.id);
  try {
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.post("/api/users", async (req, res) => {
  let user = req.body;
  console.log(user);
  try {
    if (!user.name || !user.bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      await Users.insert(user);
      res.status(200).json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  let user = await Users.remove(req.params.id);
  try {
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(Users);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  let user = await Users.update(req.params.id, req.body);
  try {
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      if (!user.bio || !user.name) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
