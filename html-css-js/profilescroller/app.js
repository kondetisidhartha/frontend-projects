const data = [
  {
    name: 'User 1',
    age: 30,
    location: 'London UK',
    gender: 'Male',
    lookingfor: 'Female',
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  },
  {
    name: 'User 2',
    age: 28,
    location: 'Koblenz DE',
    gender: 'Female',
    lookingfor: 'Male',
    image: 'https://randomuser.me/api/portraits/women/75.jpg'
  },
  {
    name: 'User 3',
    age: 39,
    location: 'Delhi IN',
    gender: 'Male',
    lookingfor: 'Female',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    name: 'User 4',
    age: 35,
    location: 'Miami US',
    gender: 'Female',
    lookingfor: 'Male',
    image: 'https://randomuser.me/api/portraits/women/55.jpg'
  },
  {
    name: 'User 5',
    age: 39,
    location: 'Singapore',
    gender: 'Male',
    lookingfor: 'Female',
    image: 'https://randomuser.me/api/portraits/men/28.jpg'
  }
]


const profiles = profileIterator(data);

nextProfile();

// Next Event
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
  const currentProfile = profiles.next().value;

  if (currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name : ${currentProfile.name}</li>
      <li class="list-group-item">Age : ${currentProfile.age}</li>
      <li class="list-group-item">Location : ${currentProfile.location}</li>
      <li class="list-group-item">Gender : ${currentProfile.gender}</li>
      <li class="list-group-item">Looking For : ${currentProfile.lookingfor}</li>
    </ul>`;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
  } else {
    // no more profile so reload
    window.location.reload()
  }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: () => {
      return nextIndex < profiles.length ?
        { value: profiles[nextIndex++], done: false } :
        { done: true }
    }
  }
}