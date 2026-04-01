const initialSate = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialSate, action){
        const { type, payload } = action;

        switch(type){
            case 'GET_PROFILE':
                return {
                    ...state,
                    profile: payload,
                    loading: false
                }
            case 'PROFILE_ERROR':
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
            default:
                return state;
        }
}