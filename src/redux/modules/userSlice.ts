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
      const user = {
        id: action.payload?.[0].id,
        username: action.payload?.[0].username,
        avatar: action.payload?.[0].avatar_url,
      };

      return (state = user);
    },
    logoutUser: () => {
      // 로그아웃시 state값을 그냥 초기화 시켜준다.
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {setUserInfo, logoutUser} = userSlice.actions;
