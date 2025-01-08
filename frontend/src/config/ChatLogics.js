export const getSender = (loggedUser, users) => {
  if (!Array.isArray(users) || users.length < 2) {
    console.error("Invalid users array:", users);
    return "Unknown User";
  }

  if (!loggedUser || !loggedUser._id) {
    console.error("Invalid loggedUser:", loggedUser);
    return "Unknown User";
  }

  try {
    return users[0]._id === loggedUser._id
      ? users[1]?.name || "Unknown"
      : users[0]?.name || "Unknown";
  } catch (error) {
    console.error("Error in getSender:", error);
    return "Unknown User";
  }
  // return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getProfile = (loggedUser, users) => {
  if (!Array.isArray(users) || users.length < 2) {
    console.error("Invalid users array:", users);
    return "https://via.placeholder.com/40";
  }

  if (!loggedUser || !loggedUser._id) {
    console.error("Invalid loggedUser:", loggedUser);
    return "https://via.placeholder.com/40";
  }
  if (!users || users.length === 0) {
    return "https://via.placeholder.com/40";
  }
  try {
    return users[0]._id === loggedUser._id
      ? users[1].profile
      : users[0].profile;
  } catch (error) {
    console.error("Error determining profile:", error);
    return "https://via.placeholder.com/40"; // Default placeholder image
  }
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 && // Ensure we're not at the last message
    messages[i + 1].sender._id !== m.sender._id && // Next message has a different sender
    m.sender._id !== userId // Current message is not from the logged-in user
  );
};
export const isLastMessage = (messages, i, userId) => {
  return (
    messages[i].sender._id !== userId && // Current message is not from the logged-in user
    (i === messages.length - 1 || // It's the last message in the array
      messages
        .slice(i + 1)
        .every((msg) => msg.sender._id !== messages[i].sender._id)) // No subsequent messages from the same sender
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id && // Same sender for the next message
    m.sender._id !== userId // Current message is not from the logged-in user
  ) {
    return 48; // Margin for same sender messages
  } else if (
    i === messages.length - 1 || // Last message in the array
    messages[i + 1].sender._id !== m.sender._id // Next message is from a different sender
  ) {
    return 0; // No margin for last or different sender
  } else {
    return "auto"; // Default margin
  }
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id; // Same sender as the previous message
};
// export const isSameSender = (messages, m, i, userId) => {
//   return (
//     i < messages.length - 1 &&
//     (messages[i + 1].sender._id !== m.sender._id ||
//       messages[i + 1].sender._id === undefined) &&
//     messages[i].sender._id !== userId
//   );
// };

// export const isLastMessage = (messages, i, userId) => {
//   const val= (
//     i === messages.length - 1 &&
//     messages[messages.length - 1].sender._id !== userId &&
//     messages[messages.length - 1].sender._id
//   );

//   console.log(val);
//   return val;
// };

// export const isSameSenderMargin = (messages, m, i, userId) => {
//   if (
//     i < messages.length - 1 &&
//     messages[i + 1].sender._id === m.sender._id &&
//     messages[i].sender._id !== userId
//   ) {
//     return 33;
//   } else if (
//     i < messages.length - 1 &&
//     messages[i + 1].sender._id !== userId &&
//     i === messages.length - 1 &&
//     messages[i].sender._id !== userId
//   ) {
//     return 0;
//   } else {
//     return "auto";
//   }

// };

// export const isSameUser=(messages,m,i)=>{
//   return i>0 && messages[i-1].sender._id===m.sender._id;
// }
