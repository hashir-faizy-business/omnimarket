
async function test() {
  try {
    const res = await fetch('http://localhost:3000/');
    const data = await res.text();
    console.log("Response:", data);
  } catch (err) {
    console.error("Server not reachable:", err.message);
  }
}
test();
