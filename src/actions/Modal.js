export const MODAL_JUMP_NEW = "MODAL_JUMP_NEW";
export const MODAL_JUMP_EDIT = "MODAL_JUMP_EDIT";
export const MODAL_DELETE = "MODAL_DELETE";

export const MODAL_GROUP_NEW = "MODAL_GROUP_NEW";
export const MODAL_GROUP_EDIT = "MODAL_GROUP_EDIT";

export const MODAL_USER_GROUPS = "MODAL_USER_GROUPS";

export const SET_DIALOG = "SET_DIALOG";

export const DELETABLE_JUMP = "DELETABLE_JUMP";

export const setDelete2 = (dispatch, open, deletable, requireApproval = false, item = null) => setDialog(dispatch, MODAL_DELETE, open, {
	requireApproval,
	item,
	deletable
});
export const setDialog = (dispatch, name, open, other = {}, ...props) => dispatch({
	type: SET_DIALOG,
	payload: {name, open, other: JSON.parse(JSON.stringify(other)), ...props}
});
