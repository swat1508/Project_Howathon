export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:80/health");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
