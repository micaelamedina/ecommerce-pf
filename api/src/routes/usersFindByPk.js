const { Router } = require("express");
const { Users } = require("../db");
const router = Router();
  
router.get("/:user_name", async (req, res) => {
    const { user_name } = req.params;
    let user = await Users.findByPk(user_name)
        try {
            user
			? res.status(200).send(user)
			: res.status(404).send("Usuario no encontrado");
        } catch (error) {
            console.log('AQUI ME HAGO PINGO HNO____' + error)
        }
  
});
  
 module.exports = router;