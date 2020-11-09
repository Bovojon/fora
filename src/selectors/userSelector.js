const UserSelector = {
  getCurrentUser: (state) => { return state.user },
  getCurrentUserId: (state) => { return state.user.id }
}

export default UserSelector;