# Student Part - ERP 2021

### Baptiste CERDAN, Victor VOGT, Thomas STEINMETZ, Janos FALKE

### REST endpoints
Features the following REST endpoints:

- **/api/signup**

- **/api/login**

- **/api/pay_adhesion** (POST) body : {"student_number" : 12345678}

- **/api/me**

- **/api/me/update**

- **/api/etudiants** (GET)

### Development
- Run `docker-compose up --build`, server will run at `http://localhost:8005` and MongoDB `http://localhost:27017`
