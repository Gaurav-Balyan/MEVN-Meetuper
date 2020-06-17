import io from "socket.io-client";

// Custom plugin used to initiate socket connection on client
const AppSocket = {
  install(Vue, options) {
    Vue.prototype.$socket = io(options.connection);
  }
};

export default AppSocket;
