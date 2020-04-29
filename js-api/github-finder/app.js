// Init
const github = new GitHub;
// UI
const ui = new UI;

const searchUser = document.getElementById('searchUser');

// Listen for key up
searchUser.addEventListener('keyup', (e) => {

  // Get the value in text input
  const userText = e.target.value;

  if (userText !== '') {
    // from github.js look for profile matching with text in input
    github.getUser(userText)
      .then(data => {
        // check if user exist in github
        if (data.profile.message === 'Not Found') {
          // user doesnot exist, create alert above search
          ui.showAlert('User Not Found', 'alert alert-danger');
        }
        else {
          // user do exist
          ui.showProfile(data.profile)
          ui.showRepos(data.repos)
        }
      })
  }
  else {
    // if there is no input, clear profile
    ui.clearProfile();
  }
});