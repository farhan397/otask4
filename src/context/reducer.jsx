export const reducer = (state, action) => {

    switch (action.type) {

        case 'load_images':
            return {
                ...state,
                imag: action.payload
            }
        case 'Empty_images':
            return {
                ...state,
                imag: action.payload,
                storedImages: action.payload,
                gridImages: action.payload
            }

            case 'Empty_Storeimages':
                return {
                    ...state,
                 
                    storedImages: action.payload,
                    gridImages: action.payload
                }
        case 'Add_images':
            return {
                ...state,
                storedImages: [...state.storedImages, action.payload]
            }
            case 'Add_gridimages':
                return {
                    ...state,
                    gridImages: action.payload
                }

        case 'Remove_images':
            return {
                ...state,
                storedImages: state.storedImages.filter((obj) => obj.id != action.payload),
                gridImages: state.gridImages.filter((obj) => obj.id != action.payload)
            }


        default:
            return state;
    }
}