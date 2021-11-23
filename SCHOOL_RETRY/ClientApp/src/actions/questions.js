import * as Constants from './constants';

//internal client data
export function questionsIsInCreation(bool) {
    return {
        type: Constants.QUESTIONS_IS_IN_CREATION,
        isInCreation: bool
    }
}
export function questionsDataInternal(items) {
    return {
        type: Constants.QUESTIONS_DATA_INTERNAL,
        items
    }
}
export function questionsInternalHasErrored(bool) {
    return {
        type: Constants.QUESTIONS_INTERNAL_HAS_ERRORED,
        isErrored: bool
    }
}
export function questionsClearData() {
    return { type: Constants.QUESTIONS_CLEAR_DATA }
}

// action creators before posting on server
export function questionInternalCreate(question, indexTest) {
    return (dispatch, getState) => {
        const state = getState();
        let arr = state.tests.internalEditTest.items[indexTest].questions;
        arr.push(question);
        dispatch(questionsIsInCreation(true));
        dispatch(questionsDataInternal(arr));
    }
}
export function questionInternalUpdate(question, indexTest, indexQuestion) {
    return (dispatch, getState) => {
        const state = getState();
        let items = state.tests.internalEditTest.items[indexTest].questions;
        //  state.tests.internalEditTest.
        if (items && items.length >= indexQuestion) {
            items[indexQuestion] = question;
            dispatch(questionsDataInternal(items));
        } else {
            dispatch(questionsInternalHasErrored(true));
        }
    }
}
export function questionInternalDelete(index) {
    return (dispatch, getState) => {
        const state = getState();
        let items = state.test.internaEditTest.items;
        items.question.splice(index, 1);
        dispatch(questionsDataInternal(items));
    }
}
export function questionsInternalDataClear() {
    return (dispatch) => {
        dispatch(questionsClearData());
    }
}
