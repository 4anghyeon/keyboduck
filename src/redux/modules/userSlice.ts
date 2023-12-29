import {createSlice} from '@reduxjs/toolkit';

interface UserType {
  id: string;
  username: string;
  avatar: string;
}

const initialState: UserType = {id: '', username: '', avatar: ''};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      if (action.payload?.app_metadata.provider === 'email') {
        const userinfo = {
          id: action.payload?.id,
          username: action.payload?.user_metadata.username,
          avatar: action.payload?.user_metadata.avatar_url,
        };
        state = userinfo;
        console.log(state);
      }
      if (action.payload?.app_metadata.provider === 'google') {
        state = action.payload?.identities?.[0].identity_data;
        console.log(state);
      }
      if (action.payload?.app_metadata.provider === 'github') {
        state = action.payload?.identities?.[0].identity_data;
        console.log(state);
      }
    },
  },
});

export default userSlice.reducer;
export const {setUserInfo} = userSlice.actions;
