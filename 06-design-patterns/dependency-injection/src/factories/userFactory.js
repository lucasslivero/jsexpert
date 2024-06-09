const { UserRepository } = require("../repositories/userRepository.js");
const { UserService } = require("../services/userService.js");
const { Database } = require("../utils/database.js");

class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: "mongdb://localhost" });
    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });
    const userService = new UserService({ userRepository });
    return userService;
  }
}

module.exports = {
  UserFactory,
};
