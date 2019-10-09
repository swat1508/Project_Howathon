import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getUI = ({ui}) => ui

export const getHome = createSelector(
    getUI,
    (uiState) => {
        return uiState.pages.home
    }
)

export const getConversation = createGetSelector(getHome, 'conversations')