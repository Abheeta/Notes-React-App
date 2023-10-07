const express = require("express");
const router = express.Router();
const Note = require("./model");

router.post("/", async (req, res) => {

    

    try {
        let note = req.body;
        const result = await Note.create(note);
        console.log("Post request received!!!!!!!!!!!");
        return res.json({"Success": result})
    }
    catch(err) {
        res.status(500).json({"Message": err})
    }

});

router.get("/", async(req, res) => {

    const { page = 1, limit = 6, pinned = false } = req.query;

    try {

        const notes = await Note.find({pinned})
        .sort({updatedAt: -1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Note.count({pinned});

      res.json({
        notes,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        pinned: pinned,
        count: count
      });

    } 
    catch(err) {
        res.status(500).json({"Message": err})
    }

});

router.delete("/:id", async(req, res) =>{

    let id = req.params.id;

    try {
        const deletedObject = await Note.findByIdAndDelete(id);
        if (!deletedObject) {
            res.json({err: 'Object not found with the given ID.'});
        } else {
            res.json({Success:'Object successfully deleted', deletedObject});
        }
    } catch (err) {
        res.json({err: 'Error deleting object:'});
    }

    
});


router.put("/:id", async(req, res) => {
    let id = req.params.id;

    try {
        const updatedObject = await Note.findByIdAndUpdate(id, req.body);
        if (!updatedObject) {
            res.json({err: 'Object not found with the given ID.'});
        } else {
            res.json({Success:'Object successfully updated', updatedObject});
        }
    } catch (err) {
        res.json({err: 'Error updating object'});
    }
});

module.exports = router;







