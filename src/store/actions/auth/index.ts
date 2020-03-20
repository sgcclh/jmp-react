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

import {AuthLogoutActionType} from "./AuthLogout";
import {AuthVerifyActionType} from "./AuthVerify";
import {AuthRequestActionType} from "./AuthRequest";
import {GetProvidersActionType} from "./GetProviders";
import {DiscoverOAuthActionType} from "./DiscoverOAuth";
import {OAuth2CallbackActionType} from "./OAuth2Callback";
import {OAuth2LogoutActionType} from "./OAuth2Logout";

export type AuthActionType =
	AuthLogoutActionType
	| AuthVerifyActionType
	| AuthRequestActionType
	| GetProvidersActionType
	| DiscoverOAuthActionType
	| OAuth2CallbackActionType
	| OAuth2LogoutActionType;