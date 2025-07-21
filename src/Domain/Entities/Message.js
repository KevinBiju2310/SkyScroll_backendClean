class Message {
  constructor({ id, text, sender, seen = false, timestamp = new Date() }) {
    this.id = id;
    this.text = text;
    this.sender = sender;
    this.seen = seen;
    this.timestamp = timestamp;
  }
}

class Conversation {
  constructor({ id, sender, receiver, messages = [] }) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.messages = messages.map((msg) => new Message(msg));
  }
}

module.exports = Conversation;
