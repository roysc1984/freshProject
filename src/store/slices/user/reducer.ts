import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearAll } from 'store/actions/actions';
import { SetUserAction } from './payloads';

type SliceState = {
  name: string;
};

const initialState: SliceState = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<SetUserAction>) {
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});

export default userSlice.reducer;
export const { setUserName } = userSlice.actions;
