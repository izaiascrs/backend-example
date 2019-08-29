const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:plataform/:gamertag', async (req, res) => {
  try {
      const headers = {
          'TRN-Api-Key': process.env.TRACKER_API_KEY
      }
      const { plataform , gamertag } = req.params;

      const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${plataform}/${gamertag}`, {headers});
      const data = await response.json();
      
      if(data.errors && data.errors.length > 0) {
          return res.status(404).json({
              message: 'Profile Not Found'
            })
        }
        res.json(data);
  } 
  catch (error) {
      console.error(error);
      res.status(5000).json({
          message: "Server error"
      })
  }
})

module.exports = router;