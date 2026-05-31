// Sorts education table rows by Year column (ascending/descending)
document.getElementById("sortBtn").addEventListener("click", () => {
  const table = document.getElementById("educationTable");
  const rows = Array.from(table.rows).slice(1);
  const ascending = table.getAttribute("data-sort") !== "asc";

  rows.sort((a, b) => {
    const yearA = parseInt(a.cells[2].innerText);
    const yearB = parseInt(b.cells[2].innerText);
    return ascending ? yearA - yearB : yearB - yearA;
  });

  rows.forEach(row => table.appendChild(row));
  table.setAttribute("data-sort", ascending ? "asc" : "desc");
});
