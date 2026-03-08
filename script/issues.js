const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((json) => displayIssues(json.data));
}

const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    for (const issue of issues) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                     <div class="card bg-base-100 h-full shadow-md border-t-4 
    ${issue.status === "open" ? "border-green-400" : ""}
    ${issue.status === "closed" ? "border-purple-400" : ""}">

<div class="card-body">

<div class="flex justify-between items-center">
<h2 class="card-title text-sm">${issue.title}</h2>

<span class="badge 
    ${issue.priority === "high" ? "badge-error" : ""}
    ${issue.priority === "medium" ? "badge-warning" : ""}
    ${issue.priority === "low" ? "badge-ghost" : ""}">
    ${issue.priority.toUpperCase()}
</span>

</div>

<p class="text-sm text-gray-500">${issue.description}</p>
<div class="mt-2">
${issue.labels.map(label => {
     const lowerLabel = label.toLowerCase();
        return `<span class="badge 
        ${lowerLabel === "bug" ? "badge-error" : ""}
        ${lowerLabel === "help wanted" ? "badge-warning" : ""}
        ${lowerLabel === "enhancement" ? "badge-success" : ""}
        ${lowerLabel === "documentation" ? "badge-info" : ""}
        ${lowerLabel === "good first issue" ? "badge-warning" : ""}
    mr-1 mb-2">${label.toUpperCase()}</span>`;
})
.join("")
};
</div>

<div class="mt-3 text-xs text-gray-500">
 <p>#1 by ${issue.author}
 </p>
  <p>${new Date(issue.createdAt).toLocaleDateString()}
 </p>
</div>

</div>
</div>
        `;
        issueContainer.append(btnDiv);
    }
};


// const btnAll = document.getElementById("all-container");
// const btnOpen = document.getElementById("btn-open");
// const btnClosed = document.getElementById("btn-closed");

// btnAll.addEventListener("click", () => {
//   displayIssues(allIssues);
//   btnAll.className = "btn btn-outline btn-sm btn-active";
//   btnOpen.className = "btn btn-outline btn-sm";
//   btnClosed.className = "btn btn-outline btn-sm";
// });

// btnOpen.addEventListener("click", () => {
//   displayIssues(allIssues.filter(i => i.status === "open"));
//   btnOpen.className = "btn btn-success btn-sm"; // green
//   btnAll.className = "btn btn-outline btn-sm";
//   btnClosed.className = "btn btn-outline btn-sm";
// });

// btnClosed.addEventListener("click", () => {
//   displayIssues(allIssues.filter(i => i.status === "closed"));
//   btnClosed.className = "btn btn-purple btn-sm"; // purple
//   btnAll.className = "btn btn-outline btn-sm";
//   btnOpen.className = "btn btn-outline btn-sm";
// });


// loadIssues();