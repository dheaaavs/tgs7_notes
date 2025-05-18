import Catatan from "../models/CatatanModel.js";

// GET
async function getCatatan(req, res) {
  try {
    const response = await Catatan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET BY ONE
async function getCatatanById(req, res) {
    try {
      const response = await Catatan.findOne(
        {
            where: {
                id: req.params.id
            }
        }
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }

// CREATE
async function createCatatan(req, res) {
    try {
      const inputResult = req.body;
      await Catatan.create(inputResult);
      res.status(201).json({ msg: "Catatan Created" });
    } catch (error) {
      console.log(error.message);
    }
  }

// UPDATE
export const updateCatatan = async(req, res) => {
    try {
      await Catatan.update(req.body, {
        where:{
          id: req.params.id
        }
      });
      res.status(200).json({msg: "Catatan Updated"});
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // DELETE
  export const deleteCatatan = async(req, res) => {
    try {
      await Catatan.destroy({
        where:{
          id: req.params.id
        }
      });
      res.status(200).json({msg: "Catatan Deleted"});
    } catch (error) {
      console.log(error.message);
    }
  }
export {getCatatan, getCatatanById, createCatatan};