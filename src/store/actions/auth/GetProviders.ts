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

import {Pair} from "../../../types";
import {Dispatch} from "redux";
import {RSAA} from "redux-api-middleware";
import {BASE_URL} from "../../../constants";

export const GET_PROVIDERS = "GET_PROVIDERS";
export const GET_PROVIDERS_REQUEST = "GET_PROVIDERS_REQUEST";
export const GET_PROVIDERS_SUCCESS = "GET_PROVIDERS_SUCCESS";
export const GET_PROVIDERS_FAILURE = "GET_PROVIDERS_FAILURE";

interface GetProvidersRequestAction {
	type: typeof GET_PROVIDERS_REQUEST;
}

interface GetProvidersSuccessAction {
	type: typeof GET_PROVIDERS_SUCCESS;
	payload: Array<Pair<string, number>>;
}

interface GetProvidersFailureAction {
	type: typeof GET_PROVIDERS_FAILURE;
	payload: Error;
}

export const getProviders = (dispatch: Dispatch, headers: any): void => {
	dispatch({
		[RSAA]: {
			endpoint: `${BASE_URL}/api/v2/providers`,
			method: "GET",
			headers: headers,
			types: [GET_PROVIDERS_REQUEST, GET_PROVIDERS_SUCCESS, GET_PROVIDERS_FAILURE]
		}
	});
};

export type GetProvidersActionType = GetProvidersRequestAction | GetProvidersSuccessAction | GetProvidersFailureAction;