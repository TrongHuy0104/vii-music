// src/utils/eventEmitter.js
class SimpleEventEmitter {
    constructor() {
      this.events = {};
    }
  
    on(eventName, listener) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(listener);
    }
  
    off(eventName, listener) {
      if (!this.events[eventName]) return;
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  
    emit(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(listener => listener(data));
      }
    }
  }
  
  export const downloadEventEmitter = new SimpleEventEmitter();
  