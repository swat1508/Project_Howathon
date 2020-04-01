export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export const updateUserDetails = (user) => {
    return {
        type: UPDATE_USER_INFO,
        payload: {user}
    }
} 