import * as actions from '../actions/hpMonitorActions';

const initialState = {
    filter: '',
    filterType: {
        "Running": true,
        "Failed": true,
        "Succeeded": true,
    },
    jobsList: [
        {
            name: "Test 1",
            status: "Running",
            id: "103askdaksdas"
        }
    ],
    filteredJobsList: [
        {
            name: "Test 1",
            status: "Running",
            id: "103askdaksdas"
        }
    ],
    jobData: [],
    dialogOpen: false
};

const hpMonitorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FILTER_JOBS:
            const jobs = state.jobsList.slice();
            const newList = jobs.filter(job => job.name.includes(action.filter));

            const avTypes = Object.assign({}, state.filterType);
            var typeKeys = Object.keys(avTypes);

            var avFilters = typeKeys.filter((key) => {
                return avTypes[key]
            });

            const filteredJobs = newList.filter(job => avFilters.includes(job.status));

            return {
                ...state,
                filteredJobsList: filteredJobs,
                filter: action.filter,
            }
        case actions.CHANGE_TYPE:
            const types = Object.assign({}, state.filterType)
            types[action.filter] = action.checked;
            var keys = Object.keys(types);

            var filters = keys.filter((key) => {
                return types[key]
            });
            const jobsList = state.jobsList.slice();
            const filtered = jobsList.filter(job => filters.includes(job.status));
            
            return {
                ...state,
                filterType: types,
                filteredJobsList: filtered,
            }
        case actions.FETCH_HP_JOBS_SUCCESS:
            return {
                ...state,
                jobsList: action.jobs,
                filteredJobsList: action.jobs,
            }
        case actions.FETCH_JOB_INFO_SUCCESS:
            return {
                ...state,
                jobData: action.data,
            }
        case actions.OPEN_DIALOG:
            return {
                ...state,
                dialogOpen: true,
            }
        case actions.CLOSE_DIALOG:
            return {
                ...state,
                dialogOpen: false,
            }
        default:
            return state;
    }
};

export default hpMonitorReducer;