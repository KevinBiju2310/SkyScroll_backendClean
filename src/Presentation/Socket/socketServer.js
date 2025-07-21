class SocketServer {
  constructor(io, container) {
    this.io = io;
    this.container = container;
    this.connectedUsers = new Map();
    this.onlineUsers = new Set();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("join", (userId) => {
        this.connectedUsers.set(socket.id, userId);
        this.onlineUsers.add(userId);
        socket.join(userId);
        this.io.emit("userOnline", userId);
      });

      socket.on("sendMessage", async (data) => {
        const sendMessageUseCase = this.container.resolve("sendMessageUseCase");
        try {
          const result = await sendMessageUseCase.execute(data);
          this.io.to(data.senderId).emit("messageReceived", result.message);
          this.io.to(data.receiverId).emit("messageReceived", result.message);
          this.io
            .to(data.receiverId)
            .emit("newNotification", result.notification);
        } catch (err) {
          socket.emit("messageError", { error: err.message });
        }
      });

      socket.on("disconnect", () => {
        const userId = this.connectedUsers.get(socket.id);
        this.connectedUsers.delete(socket.id);

        let hasOtherConnections = false;
        for (let [, id] of this.connectedUsers) {
          if (id === userId) {
            hasOtherConnections = true;
            break;
          }
        }
        if (!hasOtherConnections) {
          this.onlineUsers.delete(userId);
          this.io.emit("userOffline", userId);
        }
      });
    });
  }
}

module.exports = SocketServer;
