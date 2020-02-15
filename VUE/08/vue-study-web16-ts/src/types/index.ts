export interface Feature {
  id: number;
  name: string;
  desc?: string;
}

export interface RootState {
  counter: number;
}

export interface UserState {
  name: string,
  token: string
}