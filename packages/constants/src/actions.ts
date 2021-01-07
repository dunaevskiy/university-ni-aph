export const ACTION = {
	START_GAME: 'START_GAME',
	END_GAME: 'END_GAME',

	ADD_SCORE: 'ADD_SCORE',

	// Send shift of x and y according to players movement
	UPDATE_ACCORDING_MOVEMENT: 'UPDATE_ACCORDING_MOVEMENT',
	// Send current person position in {x, y}
	UPDATE_PERSON_COORDINATE: 'UPDATE_PERSON_COORDINATE',
	// Teleports person at coords
	TELEPORT_PERSON: 'TELEPORT_PERSON',
};
