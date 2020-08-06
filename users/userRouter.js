const express = require('express');
const router = express.Router();
const Users = require("./userDb.js");
const Posts = require("./../posts/postDb.js");
// const user = {
//   id: "",
//   name: ""
// }
// const users = [];

router.post("/", validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    if (newUser) {
      res.status(201).json(newUser)
    } else {
      res.status(500).json({ message: "unable to add user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // do your magic!
  try {
    const newPost = await Posts.insert({ user_id:req.params.id, ...req.body });
    if (newPost) {
      res.status(201).json(newPost)
    } else {
      res.status(500).json({ message: "unable to add post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const getUsers = await Users.get();
    if (getUsers.length >  0) {
      res.status(201).json(getUsers)
    } else {
      res.status(500).json({ message: "no users yet" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', validateUserId, async(req, res) => {
  // do your magic!
  try {
    const getUser = await Users.getById(req.params.id);
    if (getUser) {
      res.status(201).json(getUser)
    } else {
      res.status(500).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/posts', validateUserId, async(req, res) => {
  // do your magic!
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    if (userPosts) {
      res.status(201).json(userPosts)
    } else {
      res.status(500).json({ message: "no posts yet" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', validateUserId, async(req, res) => {
  // do your magic!
  try {
    const deleteUser = await Users.remove(req.params.id);
    if (deleteUser) {
      res.status(201).end()
    } else {
      res.status(500).json({ message: "could not delete user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', validateUserId, validateUser, async(req, res) => {
  // do your magic!
  try {
    const editUser = await Users.update(req.params.id, req.body);
    if (editUser) {
      res.status(201).json(editUser)
    } else {
      res.status(500).json({ message: "could not edit user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  try {
    const getUserById = await Users.getById(req.params.id);
    if (getUserById){
      next()
    } else {
      res.status(400).json({message: "no user with this id"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body.name) {
    next()
  } else {
    res.status(400).json({ message: "provide user name" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body.text) {
    next()
  } else {
    res.status(400).json({ message: "provide post text" });
  }
}

module.exports = router;
