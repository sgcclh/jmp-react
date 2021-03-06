import React, {useEffect} from "react";
import Center from "react-center";
import {Avatar, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {APP_NAME} from "../../constants";
import {TState} from "../../store/reducers";
import {AuthState} from "../../store/reducers/auth";
import Auth from "./settings/Auth";
import General from "./settings/General";
import Info from "./settings/Info";

const useStyles = makeStyles((theme: Theme) => ({
	name: {
		fontFamily: "Manrope",
		fontWeight: 500,
		color: theme.palette.secondary.main,
		margin: theme.spacing(2)
	},
	avatar: {
		width: 56,
		height: 56,
		borderRadius: 100,
		margin: 24,
		padding: 6,
		backgroundColor: theme.palette.background.default
	},
}));

const Settings: React.FC = () => {
	const classes = useStyles();

	useEffect(() => {
		window.document.title = `Settings - ${APP_NAME}`;
	}, []);

	const {isAdmin} = useSelector<TState, AuthState>(state => state.auth);

	return (
		<div>
			<Center>
				<Avatar
					className={classes.avatar}
					component={Paper}
					src={`${process.env.PUBLIC_URL}/jmp2.png`}
					alt={APP_NAME}
				/>
			</Center>
			<Center>
				<img height={192} src="/draw/undraw_preferences_uuo2.svg" alt=""/>
			</Center>
			<Center>
				<Typography variant="h4" className={classes.name}>Settings</Typography>
			</Center>
			<General/>
			{isAdmin && <Auth/>}
			<Info/>
		</div>
	);
};

export default Settings;
