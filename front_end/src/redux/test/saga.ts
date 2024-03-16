import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { _testAction, _testActionSuccess } from "./slice";
import { TestAPI } from "@/api/TestApi";
function* watchTest() {
  yield takeLatest(_testAction.type, function* (payload): Generator<any, void, any> {
    try {
      const res = yield call(TestAPI, payload);
      yield put(
        _testActionSuccess({
          message: res.message
        })
      );
    } catch (error) {
    } finally {
    }
  });
}

export default function* TestSaga() {
  yield all([
    fork(watchTest),
  ]);
}