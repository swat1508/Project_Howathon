import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getUI = ({ui}) => ui

export const getLogin = createSelector(
    getUI,
    (uiState) => {
        return uiState.pages.login
    }
)

export const getUser = createGetSelector(getLogin, 'user')