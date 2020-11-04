export const auth = {
    namespaced: true,
    state: {
        isLoggedIn: !!localStorage.getItem('token')
    }
}