export const initialProfile = {
  // About
  fullName: "",
  email: "",
  age: "",
  avatarFile: null,
  avatarUrl: "",

  // Account
  username: "",
  password: "",
  confirmPassword: "",
  secretQuestion: "",
  secretAnswer: "",

  // Address
  address1: "",
  address2: "",
  city: "",
  country: "",
  zip: ""
};

export function profileReducer(state, action) {
  switch (action.type) {
    case "FIELD_CHANGE":
      return { ...state, [action.field]: action.value };
    case "SET_AVATAR":
      return { ...state, avatarFile: action.file, avatarUrl: action.url };
    case "RESET":
      return initialProfile;
    default:
      return state;
  }
}
