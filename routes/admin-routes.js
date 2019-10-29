const express = require('express');
const router = express.Router();

const profession_ctrl = require('../controllers/profession_ctrl');
const user_ctrl = require('../controllers/users_ctrl');

router.get('/get_professions', profession_ctrl.getProfessions);
router.post('/create_profession', profession_ctrl.createProfession);
router.post('/del_profession', profession_ctrl.delProfession);
router.post('/update_prof', profession_ctrl.updateProf);
router.post('/active_block_user', user_ctrl.ActiveBlockUser);


module.exports = router;

