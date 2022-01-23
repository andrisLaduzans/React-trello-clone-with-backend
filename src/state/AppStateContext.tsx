import {
  createContext,
  useContext,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";
import { useImmerReducer } from "use-immer";

import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  draggedItem: DragItem | null;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    const { lists, draggedItem } = state;

    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    useEffect(() => {
      save(state);
    }, [state]);

    return (
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
