function generateResume() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const experience = document.getElementById("experience").value;

    if (!name || !email || !experience) {
        alert("Please fill in all fields!");
        return;
    }

    document.getElementById("resume-preview").innerHTML = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${experience}</p>
    `;
}
