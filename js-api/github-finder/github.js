class GitHub {
  constructor() {
    this.client_id = '5bbb57e72d73602227aa';
    this.client_secret = '511d6c74e67d2d1d982d290ddb5be08297c002b0';
    this.repos_count = 5;
    this.repos_sort = 'created';
    this.repos_sort_direction = 'desc'
  }

  async getUser(user) {
    // fetch profile
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)

    // fetch repos
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&direction=${this.repos_sort_direction}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

    // profileResponse json promise 
    const profile = await profileResponse.json();

    // reposResponse json promise
    const repos = await reposResponse.json();
    return {
      // below same as profile:profile
      profile,
      repos
    };
  }
}