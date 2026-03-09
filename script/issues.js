const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchbtn");
const issueContainer = document.getElementById("issue-container");
const loader = document.getElementById("loader");

let allIssues = [];

const showLoader = () => loader.classList.remove("hidden");
const hideLoader = () => loader.classList.add("hidden");

const fetchIssues = async (query) => {

    issueContainer.innerHTML = "";
    showLoader();

    const data = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const response = await data.json();

    hideLoader();

    if (response.data.length === 0) {
        issueContainer.innerHTML = "<p class='text-center text-gray-500 py-4'>No issues found.</p>";
        return;
    }

    displayIssues(response.data);
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchText = searchBox.value.trim();
    if (searchText !== "") {
        fetchIssues(searchText);
    }
});

const loadIssues = async () => {

    showLoader();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();

    allIssues = json.data;

    displayIssues(allIssues);

    hideLoader();
};

const displayIssues = (issues) => {

    issueContainer.innerHTML = "";

    let allcount = document.getElementById("all-count");
    if (allcount) {
        allcount.innerText = `${issues.length} Issues`;
    }

    for (const issue of issues) {

        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `
<div onclick="showDetails('${issue.id}')" class="card bg-base-100 h-full shadow-md border-t-4 
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

        }).join("")}
</div>

<div class="mt-3 text-xs text-gray-500">
<p>#1 by ${issue.author}</p>
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>
</div>

</div>
</div>
        `;

        issueContainer.append(btnDiv);
    }
};

const btnAll = document.getElementById("all-container");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

function toggleStyle(id) {

    btnAll.classList.remove("btn-active");
    btnOpen.classList.remove("btn-active");
    btnClosed.classList.remove("btn-active");

    document.getElementById(id).classList.add("btn-active");

}

btnAll.addEventListener("click", () => {

    showLoader();

    setTimeout(() => {
        displayIssues(allIssues);
        toggleStyle("all-container");
        hideLoader();
    }, 300);

});

btnOpen.addEventListener("click", () => {

    showLoader();

    setTimeout(() => {
        displayIssues(allIssues.filter(i => i.status === "open"));
        toggleStyle("btn-open");
        hideLoader();
    }, 300);

});

btnClosed.addEventListener("click", () => {

    showLoader();

    setTimeout(() => {
        displayIssues(allIssues.filter(i => i.status === "closed"));
        toggleStyle("btn-closed");
        hideLoader();
    }, 300);

});

const showDetails = (issueId) => {

    showLoader();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
        .then(res => res.json())
        .then(data => {

            hideLoader();

            const issue = data.data;

            if (issue) {

                document.getElementById("modal-title").innerText = issue.title;
                document.getElementById("modal-description").innerText = issue.description;
                document.getElementById("modal-assignee").innerText = issue.assignee || "Not Assigned";
                document.getElementById("modal-priority").innerText = issue.priority.toUpperCase();
                document.getElementById("modal-meta").innerText =
                    `Created ${new Date(issue.createdAt).toLocaleDateString()}`;
                document.getElementById("modal-labels").innerHTML = issue.labels.map(label => {

                    const lowerLabel = label.toLowerCase();

                    return `<span class="badge 
                 ${lowerLabel === "bug" ? "badge-error" : ""}
                ${lowerLabel === "help wanted" ? "badge-warning" : ""}
                ${lowerLabel === "enhancement" ? "badge-success" : ""}
                ${lowerLabel === "documentation" ? "badge-info" : ""}
                ${lowerLabel === "good first issue" ? "badge-warning" : ""}
                mr-1 mb-2">${label.toUpperCase()}</span>`;

                }).join("");
                const statusEl = document.getElementById("modal-status");

                if (statusEl) {
                    statusEl.innerText = issue.status.toUpperCase();
                }

                my_modal_5.showModal();
            }
        })
        .catch(err => console.error("Error:", err));
};

loadIssues();
toggleStyle("all-container");

function toggleStyle(id) {
    const buttons = ["all-container", "btn-open", "btn-closed"];

    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.classList.remove("btn-primary", "text-white", "bg-gray-300");
            btn.classList.add("btn-outline");
        }
    });
    const selected = document.getElementById(id);
    if (selected) {
        selected.classList.remove("btn-outline");
        selected.classList.add("btn-primary", "text-white");
    }
}
