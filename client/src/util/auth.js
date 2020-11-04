let DAYS = 7;

export const AUTH_KEY = "AUTH_GALPI";

export const TTL = DAYS * 24 * 60 * 60 * 1000;

export const setExp = (key, user, ttl) => {
  const now = new Date();

  const item = {
    username: user.username,
    userId: user.userId,
    exp: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getExp = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return false; // 없을 때 리턴. TODO: false => 서버에서 auth 미들웨어에서 logout
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return false; // 만료 되어서 삭제. TODO: false => 클라이언트에서 다시 login
  }

  return item; // username 반환
};

export const delExp = (key) => {
  localStorage.removeItem(key);
  return true; // TODO: 로그아웃 이후 리다이렉트
};
