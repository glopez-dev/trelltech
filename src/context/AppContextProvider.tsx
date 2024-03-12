import React from "react";
import Workspace from "@src/api/Workspace";

type AppContextData = {
    workspaces: Workspace[],
    setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>,
    addWorkspace: (workspace: Workspace) => Promise<boolean>,
    deleteWorkspace: (deletedWorkspace: Workspace) => Promise<boolean>,
    reload: boolean,
    triggerReload: () => void
};

const AppContext = React.createContext<AppContextData | null>(null);

/**
 * Returns the AppContextData by using React's useContext hook to access the AppContext.
 *
 * @return {AppContextData} The AppContextData object
 */
export function useAppContext(): AppContextData {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {

    const [workspaces, setWorkspaces] = React.useState<Workspace[] | null>(null);
    const [reload, setReload] = React.useState(false);

    const triggerReload = () => {
        setReload(!reload);
    }

    /**
     * Adds a new workspace to the list of workspaces.
     *
     * @param workspace The workspace to add. Must have a non-null displayName property.
     * @return {Promise<boolean>} True if the workspace was added successfully, false otherwise.
     */
    const addWorkspace = async (displayName: string): Promise<boolean> => {

        const newWorkspace: Workspace | null = await Workspace.create(displayName);

        if (!newWorkspace) {
            return false;
        }

        setWorkspaces([...workspaces, newWorkspace]);
        return true;
    };

    const deleteWorkspace = async (deletedWorkspace: Workspace): Promise<boolean> => {

        const success: boolean = await Workspace.delete(deletedWorkspace.id);

        if (!success) {
            return false;
        }

        setWorkspaces(workspaces.filter((workspace: Workspace) => workspace.id !== deletedWorkspace.id));
        return true;

    };

    const value: AppContextData = {
        workspaces,
        setWorkspaces,
        reload,
        triggerReload,
        addWorkspace,
        deleteWorkspace,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

