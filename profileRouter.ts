import express from 'express';
import multer from 'multer';
import { profileController } from './profileController';

export const profileRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/uploads`);
  },
  filename: function (req, file, cb) {
    //TODO: Input, File Upload, name="image"
    //image/jpeg OR image/png
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});
const upload = multer({storage});

profileRouter.get('/profile',profileController.profilePage);

profileRouter.put("/profilePic",upload.single("image"),profileController.uploadProfilePic);

profileRouter.get("/profileInfo",profileController.profileInfo);

profileRouter.delete("/deletePic",profileController.deletePic);

profileRouter.get("/histroiesList",profileController.histroiesList);

profileRouter.delete("/histroiesList",profileController.deleteHistroies);

profileRouter.put("/changeUsername",profileController.changeUsername);

profileRouter.put("/changePassword",profileController.changePassword);

profileRouter.post("/confirmPassword",profileController.confirmPassword);

profileRouter.get('/preferColor',profileController.preferColor);

profileRouter.get('/performance',profileController.performance);

profileRouter.get('/hitRate',profileController.hitRate);
profileRouter.get("/logout",profileController.logout);





