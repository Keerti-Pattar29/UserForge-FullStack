const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Let React fetch
app.use(express.json());

const users = [
    { id: 1, name: 'Alice', email: 'alice@mail.com', city: 'Pune', company: 'TCS', empId: 'EMP101' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', city: 'Delhi', company: 'Wipro', empId: 'EMP102' },
    { id: 3, name: 'Cara', email: 'cara@mail.com', city: 'Bengaluru', company: 'Infosys', empId: 'EMP103' },
    { id: 4, name: 'David', email: 'david@mail.com', city: 'Mumbai', company: 'Capgemini', empId: 'EMP104' },
    { id: 5, name: 'Ella', email: 'ella@mail.com', city: 'Chennai', company: 'Accenture', empId: 'EMP105' },
    { id: 6, name: 'Fay', email: 'fay@mail.com', city: 'Hyderabad', company: 'IBM', empId: 'EMP106' },
    { id: 7, name: 'George', email: 'george@mail.com', city: 'Kolkata', company: 'HCL', empId: 'EMP107' },
    { id: 8, name: 'Hana', email: 'hana@mail.com', city: 'Ahmedabad', company: 'Oracle', empId: 'EMP108' },
    { id: 9, name: 'Ivan', email: 'ivan@mail.com', city: 'Indore', company: 'Google', empId: 'EMP109' },
    { id: 10, name: 'Jade', email: 'jade@mail.com', city: 'Nagpur', company: 'Facebook', empId: 'EMP110' },
    { id: 11, name: 'Karan', email: 'karan@mail.com', city: 'Pune', company: 'TCS', empId: 'EMP111' },
    { id: 12, name: 'Lara', email: 'lara@mail.com', city: 'Bengaluru', company: 'Infosys', empId: 'EMP112' },
    { id: 13, name: 'Mike', email: 'mike@mail.com', city: 'Delhi', company: 'Wipro', empId: 'EMP113' },
    { id: 14, name: 'Nina', email: 'nina@mail.com', city: 'Mumbai', company: 'Capgemini', empId: 'EMP114' },
    { id: 15, name: 'Omar', email: 'omar@mail.com', city: 'Chennai', company: 'Accenture', empId: 'EMP115' },
    { id: 16, name: 'Priya', email: 'priya@mail.com', city: 'Hyderabad', company: 'IBM', empId: 'EMP116' },
    { id: 17, name: 'Qasim', email: 'qasim@mail.com', city: 'Kolkata', company: 'HCL', empId: 'EMP117' },
    { id: 18, name: 'Riya', email: 'riya@mail.com', city: 'Delhi', company: 'Oracle', empId: 'EMP118' },
    { id: 19, name: 'Steve', email: 'steve@mail.com', city: 'Pune', company: 'Google', empId: 'EMP119' },
    { id: 20, name: 'Tina', email: 'tina@mail.com', city: 'Bengaluru', company: 'Facebook', empId: 'EMP120' }
  ];
  
  

app.get('/api/users', (req, res) => {
  res.json(users);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}/api/users`);
});
