
import { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load employees. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container dashboard-container">
      <div className="dashboard-heading">
        <h2>Employee Dashboard</h2>
        <p>Employee information and contact details</p>
      </div>

      {loading && <p className="status-message">Loading employees...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="employee-grid">
          {employees.map((employee) => (
            <div className="employee-card" key={employee.id}>
              <div className="card-top">
                <div className="avatar">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.1 0-7.5 2.1-7.5 4.8V21h15v-2.2c0-2.7-3.4-4.8-7.5-4.8Z" />
                  </svg>
                </div>

                <span className="employee-id">ID: {employee.id}</span>
              </div>

              <h3>{employee.name}</h3>

              <div className="employee-email">
                <svg
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <span>{employee.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
  }

  return (
    <main className="container form-container">
      <div className="form-card">
        <h2>Employee Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input
              id="designation"
              name="designation"
              type="text"
              className="form-control"
              placeholder="Enter designation"
              value={form.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="form-control"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter salary"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn submit-button">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand">
        <div className="container navbar-container">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-7 8c0-3 3-5 7-5s7 2 7 5v1H5v-1ZM5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c0-2 1-3.5 3-4.2-1 .9-1.5 2-1.5 3.7V20H2v-1Zm20 0v1h-1.5v-1.5c0-1.7-.5-2.8-1.5-3.7 2 .7 3 2.2 3 4.2Z" />
              </svg>
            </span>
            Employee Portal
          </NavLink>

          <div className="navbar-nav ms-auto">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/employee-form" className="nav-link">
              Employee Form
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
