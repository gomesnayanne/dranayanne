import React from 'react';
import { Pill, Syringe, Heart, FileText, AlertOctagon } from 'lucide-react';

export type ActiveTab = 'medicamentos' | 'anestesicos' | 'sos' | 'profilaxia' | 'receita';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  prescriptionCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  prescriptionCount
}) => {
  const tabs = [
    {
      id: 'medicamentos' as ActiveTab,
      label: 'Doses & Gotas',
      icon: Pill,
      color: 'bg-[#FFE500]'
    },
    {
      id: 'anestesicos' as ActiveTab,
      label: 'Anestésicos',
      icon: Syringe,
      color: 'bg-[#67E8F9]'
    },
    {
      id: 'sos' as ActiveTab,
      label: 'SOS / Traumas',
      icon: AlertOctagon,
      color: 'bg-[#FED7AA]'
    },
    {
      id: 'profilaxia' as ActiveTab,
      label: 'Profilaxia',
      icon: Heart,
      color: 'bg-[#FDA4AF]'
    },
    {
      id: 'receita' as ActiveTab,
      label: 'Receita',
      icon: FileText,
      color: 'bg-[#A7F3D0]',
      badge: prescriptionCount
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-3 border-[#18181B] px-1.5 py-1.5 shadow-[0_-4px_0px_rgba(24,24,27,0.1)] no-print">
      <div className="max-w-lg mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[50px] flex flex-col items-center justify-center rounded-xl p-1 relative transition-all border-2 ${
                isActive
                  ? `${tab.color} border-[#18181B] shadow-[2px_2px_0px_#18181B] translate-y-[-2px]`
                  : 'bg-transparent border-transparent hover:bg-slate-100 text-[#52525B]'
              }`}
            >
              {/* Badge for prescription items count */}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute top-0.5 right-1.5 bg-[#18181B] text-[#FFE500] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {tab.badge}
                </span>
              )}

              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isActive ? 'text-[#18181B] stroke-[2.5]' : 'text-[#71717A] stroke-[2]'
                }`}
              />
              <span
                className={`text-[9.5px] sm:text-[10px] tracking-tight leading-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'font-black text-[#18181B]' : 'font-semibold text-[#71717A]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
