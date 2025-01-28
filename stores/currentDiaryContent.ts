import { create } from 'zustand';

interface DiaryContentState {
    content: string;
    setContent: (content: string) => void;
}

const useCurrentDiaryContent = create<DiaryContentState>((set) => ({
    content: '',
    setContent: (content) => set({ content }),
}));

export default useCurrentDiaryContent;