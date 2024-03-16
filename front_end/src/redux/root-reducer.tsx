// import { combineReducers } from 'redux';
// import TestReducer from "@/redux/test/slice";
// import AuthReducer from "@/redux/auth/slice";
// const rootReducer = combineReducers({
//     Test: TestReducer,
//     Auth: AuthReducer,
// });

// export default rootReducer;

import TestReducer from "@/redux/test/slice";
import AuthReducer from "@/redux/auth/slice";
const rootReducer = {
    Test: TestReducer,
    Auth: AuthReducer,
};

export default rootReducer;