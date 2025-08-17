// utils/sanitize.js

export function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    fname: user.fname,
    lname: user.lname,

  };
}

export function sanitizeMessage(message, user) {
  if (!message) return null;
  const defualtMesg = {
    id: message.id,
    content: message.content,
    title: message.title,
    pinned: message.pinned,
  };
  if (!user) return defualtMesg;

  if (user.role === "admin") return { ...message, editable: true };
  if (user.membership_status)
    if (user.id === message.user_id) {
      return { ...message, editable: true };
    } else return message;
  return defualtMesg;
}
