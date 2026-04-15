"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProjectModalContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  pendingOpenProjectId: string | null;
  requestOpenProject: (id: string) => void;
  clearPendingOpenProject: () => void;
};

const ProjectModalContext = createContext<ProjectModalContextValue | null>(
  null,
);

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpenState] = useState(false);
  const [pendingOpenProjectId, setPendingOpenProjectId] = useState<
    string | null
  >(null);

  const setOpen = useCallback((open: boolean) => {
    setOpenState(open);
  }, []);

  const requestOpenProject = useCallback((id: string) => {
    setPendingOpenProjectId(id);
  }, []);

  const clearPendingOpenProject = useCallback(() => {
    setPendingOpenProjectId(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      setOpen,
      pendingOpenProjectId,
      requestOpenProject,
      clearPendingOpenProject,
    }),
    [
      isOpen,
      setOpen,
      pendingOpenProjectId,
      requestOpenProject,
      clearPendingOpenProject,
    ],
  );
  return (
    <ProjectModalContext.Provider value={value}>
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  return useContext(ProjectModalContext);
}
