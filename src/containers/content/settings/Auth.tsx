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

import React, {ReactNode, useEffect, useState} from "react";
import {List, ListItem, ListItemAvatar, ListItemText, ListSubheader, makeStyles, Theme} from "@material-ui/core";
import InfoItem from "../../../components/content/settings/InfoItem";
import Icon from "@mdi/react";
import {mdiAccountDetailsOutline, mdiAccountOutline} from "@mdi/js";
import {useTheme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {TState} from "../../../store/reducers";
import {AuthState} from "../../../store/reducers/auth";
import {getProviders} from "../../../store/actions/auth/GetProviders";
import {getProviderData, plural} from "../../../util";

const useStyles = makeStyles((theme: Theme) => ({
	title: {
		fontFamily: "Manrope", fontWeight: 500
	},
	content: {
		fontSize: 14,
		flex: 1
	},
	statusOK: {
		color: theme.palette.success.main
	},
	statusFail: {
		color: theme.palette.error.main
	},
}));

const Auth: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	const {palette} = theme;

	const {allProviders, headers} = useSelector<TState, AuthState>(state => state.auth);

	const [data, setData] = useState<ReactNode | null>(null);
	const [providers] = useState<any>(getProviderData(theme));

	useEffect(() => {
		getProviders(dispatch, headers);
	}, [dispatch, headers]);

	useEffect(() => {
		setData(allProviders.map(i => (
			<ListItem component="li" key={i.first}>
				<ListItemAvatar>
					<Icon path={providers[i.first]?.icon || mdiAccountOutline} size={1}
					      color={providers[i.first]?.colour || palette.primary.main}/>
				</ListItemAvatar>
				<ListItemText primary={providers[i.first]?.name || i.first}
				              secondary={`${i.second} ${plural(i.second, "user")}`}/>
			</ListItem>
		)));
	}, [allProviders, providers]);

	return (
		<div>
			<ListSubheader>Authentication</ListSubheader>
			<InfoItem title={<span>Identity Provider</span>} content={<List component="ul">
				{data}
			</List>} icon={
				<Icon style={{paddingRight: 8}} path={mdiAccountDetailsOutline} size={1}
				      color={palette.success.dark}/>
			}/>
		</div>
	);
};

export default Auth;
