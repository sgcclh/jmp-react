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

import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import {OAUTH_REQUEST, oauthRequest} from "../../actions/Auth";
import {useDispatch, useSelector} from "react-redux";
import Center from "react-center";
import SocialButton from "../../components/widget/SocialButton";
import {mdiGithubCircle, mdiGoogle} from "@mdi/js";
import {oauth2Discover} from "../../actions/Oauth";
import {APP_NAME} from "../../constants";
import {useTheme} from "@material-ui/core/styles";
import ValidatedTextField from "../../components/field/ValidatedTextField";
import getIconColour from "../../style/getIconColour";
import {resetError} from "../../actions/Generic";
import getProviderCount from "../../selectors/getProviderCount";

const useStyles = makeStyles(theme => ({
	title: {
		fontFamily: "Manrope",
		fontWeight: 500,
		color: theme.palette.text.secondary
	},
	banner: {
		fontFamily: "Manrope",
		fontWeight: 500,
		color: theme.palette.secondary.main
	},
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "transparent",
		pointerEvents: "none"
	},
	resetButton: {
		fontFamily: "Manrope",
		fontWeight: "bold",
		textTransform: "none",
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	oauthMessage: {
		fontFamily: "Manrope",
		fontWeight: 500,
		textAlign: 'center',
		color: theme.palette.text.primary,
	}
}));

const initialUser = {
	value: '',
	error: '',
	regex: new RegExp(/^.{3,}$/)
};
const initialPassword = {
	value: '',
	error: '',
	regex: new RegExp(/^.{8,}$/)
};

export default ({history}) => {
	// hooks
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();

	const {isLoggedIn, providers} = useSelector(state => state.auth);
	const loading = useSelector(state => state.loading[OAUTH_REQUEST]);
	const error = useSelector(state => state.errors[OAUTH_REQUEST]);

	// state hooks
	const [username, setUsername] = useState(initialUser);
	const [password, setPassword] = useState(initialPassword);
	const [page, setPage] = useState(0);
	const [valid, setValid] = useState(false);
	// lifecycle hooks
	useEffect(() => {
		window.document.title = `Login - ${APP_NAME}`;
		resetError(dispatch, OAUTH_REQUEST);
		oauth2Discover(dispatch, "github");
		oauth2Discover(dispatch, "google");
	}, [dispatch]);

	useEffect(() => {
		if(isLoggedIn === true) {
			// The user is already logged in, we can leave here
			const url = new URL(window.location.href);
			const target = url.searchParams.get("target");
			history.push(target != null && target !== "" ? target : "/");
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (page === 0)
			setValid(username.error === "" && username.value.length > 0);
		else if (page === 1)
			setValid(password.error === "" && password.value.length > 0);
	}, [username, password, page]);


	const onNext = () => {
		if (page === 1) {
			const data = window.btoa(`${username.value}:${password.value}`);
			oauthRequest(dispatch, data);
		}
		if (page < 2)
			setPage(page + 1);
	};

	const onReset = () => {
		setPage(0);
		setUsername(initialUser);
		setPassword(initialPassword);
		resetError(dispatch, OAUTH_REQUEST);
	};

	let errorMessage = null;
	if (error != null) {
		errorMessage = (
			<Center>
				<span style={{color: theme.palette.error.main}}>
					{(error.toString().startsWith("Unauthorized") || error.toString().includes("status code 404")) ? "Incorrect username or password" : error.toString()}
				</span>
			</Center>
		);
	}
	return (
		<div className={classes.overlay}>
			{loading || isLoggedIn === true ?
				<CircularProgress/>
				:
				<>
					<Grid style={{height: "100vh"}} container spacing={4} alignContent="center" justify="center">
						<Grid item lg={2} md={false}/>
						<Grid item lg={8} md={12}>
							<CardContent style={{margin: 12, pointerEvents: "initial"}}>
								<Grid container spacing={4} alignContent="center" justify="center">
									<Grid item xs={12}>
										<Center>
											<img src={`${process.env.PUBLIC_URL}/jmp.png`} alt="App icon" height={72}/>
										</Center>
										<Typography className={classes.banner} variant="h2"
										            align="center">{APP_NAME}</Typography>
									</Grid>
									<Grid item xs={12} sm={9} md={6} lg={4}>
										<Card style={{padding: 16, borderRadius: 12}}>
											{page === 0 && <ValidatedTextField
												data={username}
												setData={setUsername}
												invalidLabel="Username must be a minimum of 3 characters"
												fieldProps={{
													required: true,
													autoFocus: true,
													autoComplete: "username",
													margin: "dense",
													id: "username",
													label: "Username",
													variant: "outlined",
													fullWidth: true
												}}
											/>}
											{page === 1 && <ValidatedTextField
												data={password}
												setData={setPassword}
												invalidLabel="Password must be a minimum of 8 characters"
												fieldProps={{
													required: true,
													type: "password",
													autoComplete: "current-password",
													margin: "dense",
													id: "password",
													label: "Password",
													variant: "outlined",
													fullWidth: true
												}}
											/>}
											<Button style={{
												marginTop: 8,
												textTransform: "none",
												color: getIconColour(theme)
											}} className={classes.title} onClick={() => onNext()} variant="contained"
											        color="primary"
											        fullWidth size="large" type="submit"
											        disabled={!valid || page >= 2}>
												Continue
											</Button>
											{(page > 0 || error != null) &&
											<Button className={classes.resetButton} color="primary"
											        onClick={() => onReset()}>Reset</Button>}
										</Card>
									</Grid>
								</Grid>
								<Typography style={{padding: 8}}>
									{errorMessage}
								</Typography>
								{getProviderCount(providers) > 0 &&
									<>
										<p className={classes.oauthMessage}>Alternatively, login with</p>
										<Center>
											{providers['github'] === true &&
												<SocialButton id={"github"} name={"GitHub"} colour={"#171516"}
												              icon={mdiGithubCircle}/>}
											{providers['google'] === true &&
												<SocialButton id={"google"} name={"Google"} colour={"#4285F4"}
												              icon={mdiGoogle}/>}
										</Center>
									</>
								}
							</CardContent>
						</Grid>
						<Grid item lg={2} md={false}/>
					</Grid>
				</>
			}
		</div>
	);
};
