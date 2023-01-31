export async function load({ fetch }) {
    const resp = await fetch('http://localhost:8080/api/collections/jobs/records');
  
    const res = await resp.json();
    if (resp.status == 200) {
      return {
        jobs: res.items
      }
    } else {
      return {
        jobs: []
      }
    }
  }