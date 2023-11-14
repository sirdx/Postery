export async function getRecentActiveUsers() {
  try {
    const response = await fetch('/api/users/recent');
    const data = await response.json();
    
    return data;
  } catch (error) {
    return console.warn(error);
  }
}