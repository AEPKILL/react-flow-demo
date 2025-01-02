import { createContext, useContext, useMemo } from "react";
import { createObservableStore } from "../stores/observable.store";

export interface StoreContext {
	observableStore: ReturnType<typeof createObservableStore>;
}

export const StoreContext = createContext<StoreContext>({
	observableStore: createObservableStore(),
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
	return (
		<StoreContext.Provider
			value={useMemo(() => ({ observableStore: createObservableStore() }), [])}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useFlowStore() {
	return useContext(StoreContext);
}

export function withFlowStore<T extends {}>(Component: React.ComponentType<T>) {
	return function WithFlowStore(props: T) {
		return (
			<StoreProvider>
				<Component {...props} />
			</StoreProvider>
		);
	};
}
