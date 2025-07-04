class FetchUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(role) {
    try {
      const users = await this.userRepository.getUsers(role);
      return users;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
}

module.exports = FetchUsersUseCase;
