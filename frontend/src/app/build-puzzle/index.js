export const types = {
    CELL_CLICK: "build-puzzle/CELL_CLICK"
};

export const initialState = {
        cells: '000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        selectedCell: {
            box: 10,
            cell: 10
        }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CELL_CLICK:
            const {box, cell} = action;
            return {
                ...state,
                selectedCell: {
                    box: box,
                    cell: cell
                }
            };
        default:
            return state;
    }
};