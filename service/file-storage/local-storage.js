import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import Users from "../../repository/users.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.folderAvatars = path.join(__dirname, "../../", "public");
  }

  async saveAvatar() {
    const destination = path.join(
      this.folderAvatars,
      process.env.FOLDER_FOR_AVATARS,
      this.userId
    );
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.filePath, path.join(destination, this.filename));
    const avatarUrl = path.normalize(
      path.join(process.env.FOLDER_FOR_AVATARS, this.userId, this.filename)
    );
    await Users.updateAvatar(this.userId, avatarUrl);
    return avatarUrl;
  }
}

export default LocalStorage;
