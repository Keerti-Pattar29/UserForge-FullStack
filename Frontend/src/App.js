// START OF App.js
import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
    empId: ""
  });
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [filterCity, setFilterCity] = useState("All");
  const [filterCompany, setFilterCompany] = useState("All");
  const [searchEmpId, setSearchEmpId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => showToast("Failed to load users", "error"));
  }, []);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddUser = () => {
    const { name, email, city, company, empId } = newUser;
    if (!name || !email || !city || !company || !empId) {
      showToast("All fields required", "error");
      return;
    }
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const added = { id, ...newUser };
    setUsers([...users, added]);
    setNewUser({ name: "", email: "", city: "", company: "", empId: "" });
    showToast("User added", "success");
  };

  const handleUpdateUser = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
    showToast("User updated", "success");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      showToast("User deleted", "success");
    }
  };

  const handleExportCSV = () => {
    const csvRows = [
      ["ID", "Name", "Email", "City", "Company", "Employee ID"],
      ...users.map((u) => [u.id, u.name, u.email, u.city, u.company, u.empId])
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const filteredUsers = users.filter(
    (u) =>
      (filterCity === "All" || u.city === filterCity) &&
      (filterCompany === "All" || u.company === filterCompany) &&
      (searchEmpId === "" || u.empId.includes(searchEmpId))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const allCities = [...new Set(users.map((u) => u.city))];
  const allCompanies = [...new Set(users.map((u) => u.company))];

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <h1>UserHub Pro</h1>

      <div className="top-controls">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        <select onChange={(e) => setFilterCity(e.target.value)} value={filterCity}>
          <option value="All">All Cities</option>
          {allCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select onChange={(e) => setFilterCompany(e.target.value)} value={filterCompany}>
          <option value="All">All Companies</option>
          {allCompanies.map((comp) => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>

        <input
          placeholder="Search Emp ID..."
          value={searchEmpId}
          onChange={(e) => setSearchEmpId(e.target.value)}
        />

        <button onClick={handleExportCSV}>⬇️ Export CSV</button>
      </div>

      <div className="form">
        <input placeholder="Name" value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
        <input placeholder="Email" value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
        <input placeholder="City" value={newUser.city}
          onChange={e => setNewUser({ ...newUser, city: e.target.value })} />
        <input placeholder="Company" value={newUser.company}
          onChange={e => setNewUser({ ...newUser, company: e.target.value })} />
        <input placeholder="Emp ID" value={newUser.empId}
          onChange={e => setNewUser({ ...newUser, empId: e.target.value })} />
        <button onClick={handleAddUser}>➕ Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>City</th>
            <th>Company</th><th>Emp ID</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.city}</td>
              <td>{u.company}</td><td>{u.empId}</td>
              <td>
                <button onClick={() => setEditingUser(u)}>✏️</button>
                <button onClick={() => handleDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
          {currentUsers.length === 0 && (
            <tr><td colSpan="7">No users found</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >{i + 1}</button>
        ))}
      </div>

      {editingUser && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit User</h3>
            <input value={editingUser.name}
              onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} />
            <input value={editingUser.email}
              onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
            <input value={editingUser.city}
              onChange={e => setEditingUser({ ...editingUser, city: e.target.value })} />
            <input value={editingUser.company}
              onChange={e => setEditingUser({ ...editingUser, company: e.target.value })} />
            <input value={editingUser.empId}
              onChange={e => setEditingUser({ ...editingUser, empId: e.target.value })} />
            <button onClick={handleUpdateUser}>💾 Save</button>
            <button onClick={() => setEditingUser(null)}>❌ Cancel</button>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
// END OF App.js
