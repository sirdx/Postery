export async function getPosts() {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}