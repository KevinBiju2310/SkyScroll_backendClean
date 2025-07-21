class Notification {
  constructor({
    id,
    recipient,
    sender,
    type = "MESSAGE",
    content,
    conversationId = null,
    read = false,
    createdAt = new Date(),
  }) {
    this.id = id;
    this.recipient = recipient;
    this.sender = sender;
    this.type = type;
    this.content = content;
    this.conversationId = conversationId;
    this.read = read;
    this.createdAt = createdAt;
  }
}

module.exports = Notification;
