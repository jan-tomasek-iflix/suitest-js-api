const composers = {
	ABANDON: Symbol('abandon'),
	ACCEPT_MODAL: Symbol('acceptModal'),
	ASSERT: Symbol('assert'),
	CLICK: Symbol('click'),
	CLONE: Symbol('clone'),
	CONTAIN: Symbol('contain'),
	DISMISS_MODAL: Symbol('dismissModal'),
	END_WITH: Symbol('endWith'),
	EQUAL: Symbol('equal'),
	EXIST: Symbol('exist'),
	GO_BACK: Symbol('goBack'),
	GO_FORWARD: Symbol('goForward'),
	HAS_EXITED: Symbol('hasExited'),
	INTERVAL: Symbol('interval'),
	MATCH: Symbol('match'),
	MATCH_JS: Symbol('matchJS'),
	MATCH_REPO: Symbol('matchRepo'),
	MOVE_TO: Symbol('moveTo'),
	NOT: Symbol('not'),
	REFRESH: Symbol('refresh'),
	REPEAT: Symbol('repeat'),
	SEND_TEXT: Symbol('sendText'),
	SET_SIZE: Symbol('setSize'),
	START_WITH: Symbol('startWith'),
	THEN: Symbol('then'),
	TIMEOUT: Symbol('timeout'),
	TO_STRING: Symbol('toString'),
	TO_JSON: Symbol('toJSON'),
	GETTERS: Symbol('getters'),
	WAS_MADE: Symbol('wasMade'),
	WILL_BE_MADE: Symbol('willBeMade'),
	REQUEST_MATCHES: Symbol('requestMatches'),
	RESPONSE_MATCHES: Symbol('responseMatches'),
	UNTIL: Symbol('until'),
};

Object.freeze(composers);

module.exports = composers;