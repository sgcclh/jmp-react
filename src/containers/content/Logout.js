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

import React, {useEffect} from "react";
import Center from "react-center";
import {oauthLogout} from "../../actions/Auth";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import {makeStyles, Typography} from "@material-ui/core";
import {oauth2Logout} from "../../actions/Oauth";
import {APP_NAME} from "../../constants";

const useStyles = makeStyles(theme => ({
	overlay: {
		position: "fixed",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "transparent",
		pointerEvents: "none"
	},
	button: {
		pointerEvents: "initial"
	},
	title: {
		fontFamily: "Manrope",
		fontWeight: 500
	},
	progress: {
		margin: theme.spacing(2)
	}
}));

export default ({history}) => {
	// hooks
	const dispatch = useDispatch();
	const classes = useStyles();

	const {isLoggedIn, headers, request, source} = useSelector(state => state.auth);

	useEffect(() => {
		window.document.title = `Logout - ${APP_NAME}`;
		// copy the request/headers because they will be wiped by a logout request
		const r2 = JSON.parse(JSON.stringify(request));
		const h2 = JSON.parse(JSON.stringify(headers));
		// Log the user out
		oauth2Logout(dispatch, r2, source, h2);
		oauthLogout(dispatch, r2, h2);
	}, []);

	useEffect(() => {
		if(isLoggedIn === false)
			history.push("/");
	}, [isLoggedIn]);


	return (
		<Center className={classes.overlay}>
			<div className={classes.button}>
				<Typography className={classes.title} variant="h4" color="textPrimary">
					Ensuring that you're logged out...
				</Typography>
				<Center>
					<CircularProgress className={classes.padding}/>
				</Center>
				<Center style={{paddingTop: 16}}>
					If you're not redirected in a few seconds, click below
				</Center>
				<Center>
					<IconButton component={Link} to="/" color="primary" centerRipple={false}
					            aria-label="Return to home">
						<HomeIcon/>
					</IconButton>
				</Center>
			</div>
		</Center>
	);
};
