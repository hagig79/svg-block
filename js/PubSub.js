class PubSub {
  listeners = [];

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  publish(eventType, args = []) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach((callback) => {
        callback(...args);
      });
    }
  }
}

export { PubSub };
