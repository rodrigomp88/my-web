const { types } = require("@/types/types");

export const projectReducer = (state, action) => {
  switch (action.type) {
    case types.getProjects:
      return {
        ...state,
        projects: action.payload.projects,
      };
    default:
      return state;
  }
};
