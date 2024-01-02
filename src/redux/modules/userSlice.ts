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
      // email로 로그인한 경우
      if (action.payload?.app_metadata.provider === 'email') {
        state = {
          id: action.payload?.id,
          username: action.payload?.user_metadata.username,
          avatar: action.payload?.user_metadata.avatar_url,
        };
        return state;
      }
      // google로 로그인한 경우
      if (action.payload?.app_metadata.provider === 'google') {
        state = {
          id: action.payload.id,
          username: action.payload.identities[0].identity_data.name,
          avatar: action.payload.identities[0].identity_data.avatar_url,
        };
        return state;
      }
      // github로 로그인한 경우
      if (action.payload?.app_metadata.provider === 'github') {
        state = {
          id: action.payload.id,
          username: action.payload.identities[0].identity_data.name,
          avatar: action.payload.identities[0].identity_data.avatar_url,
        };
        return state;
      }
    },
    logoutUser: () => {
      // 로그아웃시 state값을 그냥 초기화 시켜준다.
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {setUserInfo, logoutUser} = userSlice.actions;
