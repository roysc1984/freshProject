export type MenuButtons = 'Home' | 'Profile';

export interface HomeTabsRef {
  updateActiveTab: (activeTab: MenuButtons) => void;
}
