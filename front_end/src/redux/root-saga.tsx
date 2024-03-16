import { all } from 'redux-saga/effects'
import TestSaga from "@/redux/test/saga";
import AuthSaga from '@/redux/auth/saga';

export default function* rootSaga() {
    yield all([
        TestSaga(),
        AuthSaga(),
    ])
}