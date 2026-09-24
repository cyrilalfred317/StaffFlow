const form = document.querySelector<HTMLFormElement>("#employee-form");
const nameInput = document.querySelector<HTMLInputElement>("#employee-name");
const roleInput = document.querySelector<HTMLSelectElement>("#employee-role");
const salaryInput =
  document.querySelector<HTMLInputElement>("#employee-salary");
const detailInput =
  document.querySelector<HTMLInputElement>("#employee-detail");

const employeeList = document.querySelector<HTMLDivElement>("#employee-list");
const detailLabel = document.querySelector<HTMLLabelElement>("#detail-label");
const addEmployeeButton =
  document.querySelector<HTMLButtonElement>("#add-employee");
if (
  form === null ||
  nameInput === null ||
  roleInput === null ||
  salaryInput === null ||
  detailInput === null ||
  detailLabel === null ||
  addEmployeeButton === null ||
  employeeList === null
) {
  throw new Error("One or more form fields were not found");
}

type EmployeeRole = "Dev" | "Designer" | "Manager";

// PARENT CLASS
class Employee {
  #salary: number;
  name: string;
  role: EmployeeRole;
  constructor(name: string, role: EmployeeRole, salary: number) {
    this.name = name;
    this.role = role;
    this.#salary = salary;
  }

  updateSalary(newSalary: number): void {
    if (newSalary > 0) {
      this.#salary = newSalary;
    }
  }

  getSalary(): number {
    return this.#salary;
  }

  work(): void {
    console.log(`${this.name} is working`);
  }

  getRoleDetail(): string {
    return "";
  }
}

class Dev extends Employee {
  programmingLanguage: string;
  constructor(name: string, salary: number, programmingLanguage: string) {
    super(name, "Dev", salary);
    this.programmingLanguage = programmingLanguage;
  }

  work(): void {
    console.log(`${this.name} is writing ${this.programmingLanguage} code.`);
  }

  getRoleDetail(): string {
    return `Programming Language: ${this.programmingLanguage}`;
  }
}

class Designer extends Employee {
  designTool: string;
  constructor(name: string, salary: number, designTool: string) {
    super(name, "Designer", salary);
    this.designTool = designTool;
  }
  work() {
    console.log(`${this.name} is creating designs with ${this.designTool}.`);
  }

  getRoleDetail(): string {
    return `Design Tool: ${this.designTool}`;
  }
}

class Manager extends Employee {
  department: string;
  constructor(name: string, salary: number, department: string) {
    super(name, "Manager", salary);
    this.department = department;
  }
  work() {
    console.log(`${this.name} is managing this ${this.department}.`);
  }

  getRoleDetail(): string {
    return `Department: ${this.department}`;
  }
}

const employees: Employee[] = [
  new Dev("Sam", 2000, "Java"),
  new Designer("Ada", 3000, "Figma"),
  new Manager("Ema", 4000, "Engineering"),
];

function renderEmployees(): void {
  if (employeeList === null) {
    throw new Error("Employee is not found");
  }
  employeeList.innerHTML = "";

  employees.forEach(function (employee) {
    const card = document.createElement("article");

    const name = document.createElement("h3");
    name.textContent = employee.name;

    const role = document.createElement("p");
    role.textContent = `Role: ${employee.role}`;

    const salary = document.createElement("p");
    salary.textContent = `Salary: $${employee.getSalary()}`;

    const detail = document.createElement("p");
    detail.textContent = employee.getRoleDetail();

    const deleteEmployee = document.createElement("button");
    deleteEmployee.classList.add("sack-btn");
    deleteEmployee.dataset;
    deleteEmployee.textContent = "Sack Employee";

    card.append(name, role, salary, detail, deleteEmployee);

    employeeList.append(card);
  });
}

renderEmployees();

// FORM EVENT LISTENER//
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const role = roleInput.value;
  const salary = Number(salaryInput.value);
  const detail = detailInput.value.trim();

  if (!Number.isFinite(salary) || salary <= 0) {
    console.log("Please enter a valid salary");
    return;
  }

  if (!isEmployeeRole(role)) {
    console.log("Please select a valid employee role");
    return;
  }

  if (name === "" || detail === "") {
    console.log("Please complete all required fields");
    return;
  }

  //CREATING NEW EMPLOYEE//
  let newEmployee: Employee;

  if (role === "Dev") {
    newEmployee = new Dev(name, salary, detail);
  } else if (role === "Designer") {
    newEmployee = new Designer(name, salary, detail);
  } else {
    newEmployee = new Manager(name, salary, detail);
  }

  employees.push(newEmployee);
  renderEmployees();
  form.reset();
  detailLabel.textContent = "Role Detail";
});

roleInput.addEventListener("change", function () {
  const role = roleInput.value;

  if (role === "Dev") {
    detailLabel.textContent = "Programming Language";
  } else if (role === "Designer") {
    detailLabel.textContent = "Design Tool";
  } else if (role === "Manager") {
    detailLabel.textContent = "Department";
  } else {
    detailLabel.textContent = "Role Detail";
  }
});

function isEmployeeRole(value: string): value is EmployeeRole {
  return value === "Dev" || value === "Designer" || value === "Manager";
}

employeeList.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked");
  if (event.target === null) {
    throw new Error("something wrong");
  }

  if (
    event.target instanceof Element &&
    event.target.classList.contains("sack-btn")
  ) {
    console.log("btn clicked");
  }
});
