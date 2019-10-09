import {createSelector} from 'reselect'

export const getUI = ({ui}) => ui

export const getPages = createSelector(
    getUI,
    ({pages}) => pages
)

export const getHome = createSelector(
    getPages,
    ({home}) => home
)