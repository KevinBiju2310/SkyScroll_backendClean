const UserRepository = require("../../Domain/Repositories/UserRepository");
const User = require("../../Domain/Entities/User");
const userModel = require("../Database/Models/UserModel");

class MongoUserRepository extends UserRepository {
  async findById(id) {
    try {
      const userDoc = await userModel.findById(id);
      if (!userDoc) return null;
      return new User({
        id: userDoc._id.toString(),
        ...userDoc.toObject(),
      });
    } catch (error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const userDoc = await userModel.findOne({ email });
      if (!userDoc) return null;
      return User({
        id: userDoc._id.toString(),
        ...userDoc.toObject(),
      });
    } catch (error) {
      throw new Error(`Failed to find User by email: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      const newUser = new userModel(userData);
      const savedUser = await newUser.save();
      return new User(savedUser.toObject());
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async save(user) {
    try {
      return await userModel.save(user);
    } catch (error) {
      throw new Error(`Failed to save user: ${error.message}`);
    }
  }

  async updateUser(id, updateobj) {
    try {
      const updatedDoc = await userModel.findByIdAndUpdate(id, updateobj, {
        new: true,
      });
      return new User(updatedDoc.toObject());
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async getUsers(role) {
    try {
      const users = await userModel.find({ role });
      return new User(users.toObject());
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async getAirlines(role) {
    try {
      const airlines = await userModel.find({ role });
      return new User(airlines.toObject());
    } catch (error) {
      throw new Error(`Failed to fetch airlines: ${error.message}`);
    }
  }
}

module.exports = MongoUserRepository;
