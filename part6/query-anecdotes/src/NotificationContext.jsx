import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const NotificationContext = createContext();

// Notification Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATED":
      return `anecdote ${action.payload} was created!`;
    case "VOTED":
      return `anecdote ${action.payload} voted!`;
    case "ERASE":
      return null;
    case "ERROR":
      return `ERROR: ${action.payload}!`;
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  return context[0];
};
export const useNotificationDispatcher = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

export default NotificationContext;
