const express = require("express");
const router = express.Router();

const MeetupsCtrl = require("../controllers/meetups");
const AuthCtrl = require("../controllers/auth");

router.get("", MeetupsCtrl.getMeetups);

router.get("/secret", AuthCtrl.onlyAuthUser, MeetupsCtrl.getSecret);

router.get("/:id", MeetupsCtrl.getMeetupById);

router.post("/:id/join", AuthCtrl.onlyAuthUser, MeetupsCtrl.joinMeetup);

router.post("/:id/leave", AuthCtrl.onlyAuthUser, MeetupsCtrl.leaveMeetup);

router.patch("/:id", AuthCtrl.onlyAuthUser, MeetupsCtrl.updateMeetup);

router.delete("/:id", AuthCtrl.onlyAuthUser, MeetupsCtrl.deleteMeetup);

router.post("", AuthCtrl.onlyAuthUser, MeetupsCtrl.createMeetup);

module.exports = router;
