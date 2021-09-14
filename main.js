document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

let count=0;
const closeIssue = id => {
  //count++;
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  let closed=JSON.parse(localStorage.getItem('issues'));
  count=closed.length;
  fetchIssues();

}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  //issuesList.innerHTML = '';
  fetchIssues();
}


let total=0;
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';



  for (var i = 0; i < issues.length; i++) {
    total=issues.length;

    
    const { id, description, severity, assignedTo, status } = issues[i];

    if (status == 'Open') {

      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="open"> ${description}</h3>
                              <h3 id="close" style="display: none;" > ${description}❌</h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
    else {
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="close"  > ${description}❌</h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
  }

  document.getElementById('tracker').innerHTML=(total)+"("+ (count)+")";


}




