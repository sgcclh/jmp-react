/*
 *    Copyright 2019 Django Cass
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import {Dispatch} from "redux";
import {RSAA} from "redux-api-middleware";
import {BASE_URL} from "../../../constants";

export const PUT_JUMP = "PUT_JUMP";
export const PUT_JUMP_REQUEST = "PUT_JUMP_REQUEST";
export const PUT_JUMP_SUCCESS = "PUT_JUMP_SUCCESS";
export const PUT_JUMP_FAILURE = "PUT_JUMP_FAILURE";

interface PutJumpRequestAction {
	type: typeof PUT_JUMP_REQUEST;
	payload: string;
}

interface PutJumpSuccessAction {
	type: typeof PUT_JUMP_SUCCESS;
	payload: void;
}

interface PutJumpFailureAction {
	type: typeof PUT_JUMP_FAILURE;
	payload: Error;
}

export const putJump = (dispatch: Dispatch, headers: any, jump: string, gid?: string): void => {
	dispatch({
		[RSAA]: {
			endpoint: `${BASE_URL}/api/v2/jump${gid}`,
			method: "PUT",
			headers,
			body: jump,
			types: [PUT_JUMP_REQUEST, PUT_JUMP_SUCCESS, PUT_JUMP_FAILURE]
		}
	});
};

export type PutJumpActionType = PutJumpRequestAction | PutJumpSuccessAction | PutJumpFailureAction;