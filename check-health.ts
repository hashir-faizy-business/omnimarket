
async function checkHealth() {
  try {
    const [catRes, secRes, vidRes] = await Promise.all([
      fetch('http://localhost:3000/api/categories'),
      fetch('http://localhost:3000/api/sections'),
      fetch('http://localhost:3000/api/videos')
    ]);
    
    const cats = await catRes.json();
    const secs = await secRes.json();
    const vids = await vidRes.json();
    
    console.log(`Categories: ${cats.length}`);
    console.log(`Sections: ${secs.length}`);
    console.log(`Videos: ${vids.length}`);
    
    if (secs.length > 0) {
      console.log('First section:', secs[0].title);
    }
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}
checkHealth();
