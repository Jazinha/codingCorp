const inquirer = require('inquirer');
const fs = require('fs');

// Array to store team members
const teamMembers = [];

// Prompt for team manager's information
function promptManager() {
  console.log('Enter the team manager\'s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Manager\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Manager\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Manager\'s email address:',
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Manager\'s office number:',
      },
    ])
    .then((answers) => {
      const manager = {
        role: 'Manager',
        name: answers.name,
        id: answers.id,
        email: answers.email,
        officeNumber: answers.officeNumber,
      };
      teamMembers.push(manager);
      showMenu();
    });
}

// Prompt for engineer's information
function promptEngineer() {
  console.log('Enter the engineer\'s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Engineer\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Engineer\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Engineer\'s email address:',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Engineer\'s GitHub username:',
      },
    ])
    .then((answers) => {
      const engineer = {
        role: 'Engineer',
        name: answers.name,
        id: answers.id,
        email: answers.email,
        github: answers.github,
      };
      teamMembers.push(engineer);
      showMenu();
    });
}

// Prompt for intern's information
function promptIntern() {
  console.log('Enter the intern\'s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Intern\'s name:',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Intern\'s employee ID:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Intern\'s email address:',
      },
      {
        type: 'input',
        name: 'school',
        message: 'Intern\'s school:',
      },
    ])
    .then((answers) => {
      const intern = {
        role: 'Intern',
        name: answers.name,
        id: answers.id,
        email: answers.email,
        school: answers.school,
      };
      teamMembers.push(intern);
      showMenu();
    });
};

// Display the menu
function showMenu() {
  console.log('\nSelect an option:');
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish Building My Team'],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case 'Add an Engineer':
          promptEngineer();
          break;
        case 'Add an Intern':
          promptIntern();
          break;
        case 'Finish Building My Team':
          generateHTML();
          break;
      }
    });
};

promptManager(); 

// Generate the HTML file
// Generate the HTML file
function generateHTML() {
    const cardsContent = teamMembers.map(member => `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header">
            ${member.name}
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Role: ${member.role}</li>
            <li class="list-group-item">ID: ${member.id}</li>
            <li class="list-group-item">Email: ${member.email}</li>
            ${member.role === 'Engineer' ? `<li class="list-group-item">GitHub: <a href="https://github.com/${member.github}" target="_blank">${member.github}</a></li>` : ''}
            ${member.role === 'Intern' ? `<li class="list-group-item">School: ${member.school}</li>` : ''}
          </ul>
        </div>
      </div>
    `).join('');
  
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Team Roster</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <style>
            .card-deck {
              justify-content: center;
            } 

            body {
              background-color: rgb(135 1 1 / 23%);
            }
            h1 {
              text-align: center;
              margin-bottom: 60px; 
              font-size: 90px;
              color: #c54141;
            } 
      
            .card {
                width: 300px; 
            } 
            .card-header {
              text-align: center; 
              padding: 1.25rem 1.25rem;
              font-size: 30px; 
              color: #b6bedb;
              background-color:#132261 ;
            } 
      
            #team-icon{ 
              text-align: center;
              font-size: 180px;  
              margin-top: 30px;
            } 

            .list-group-item {
                font-size: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
          <div id="team-icon">
            <i class="fa-solid fa-users-line" style="color: #132261;"></i>
        </div>
            <h1>My Team</h1>
            <div class="row">
              <div class="card-deck">
                ${cardsContent}
              </div>
            </div>
          </div>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
          <script src="https://kit.fontawesome.com/3480db5fa3.js" crossorigin="anonymous"></script>
        </body>
      </html>
    `;
  
    fs.writeFile('team-roster.html', htmlContent, (err) => {
      if (err) {
        console.error('An error occurred while generating the HTML file:', err);
      } else {
        console.log('HTML file generated successfully!');
      }
    });
  }
  

  