class ToggleBlockUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      user.isBlocked = !user.isBlocked;
      await this.userRepository.updateUser(userId, {
        isBlocked: user.isBlocked,
      });
      return "Block status changed";
    } catch (error) {
      throw new Error("Error block/unblock Usecase");
    }
  }
}

module.exports = ToggleBlockUsersUseCase;
