import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSavedItems } from '../context/SavedItemsContext';
import { ProjectCard } from './ProjectCard';
import { CreatorCard } from './CreatorCard';
import { projects, creators } from '../data/mock-data';

type TabType = 'projects' | 'creators';

export function SavedPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const { savedProjects, savedCreators } = useSavedItems();

  const savedProjectsList = projects.filter((p) => savedProjects.has(p.id));
  const savedCreatorsList = creators.filter((c) => savedCreators.has(c.id));

  return (
    <div className="flex flex-col gap-[48px] w-full">
      <h1 className="font-['Tahoma',sans-serif] font-[700] leading-[1.1] text-[36px] text-[rgba(255,255,255,0.87)]">
        Saved
      </h1>

      <div className="flex flex-col gap-[32px] w-full">
        {/* Tabs */}
        <div className="flex gap-[24px] items-center">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex gap-[8px] items-center justify-center py-[8px] cursor-pointer relative ${
              activeTab === 'projects' ? 'border-b-2 border-[#a5ff5f]' : ''
            }`}
          >
            <span className={`font-['Satoshi',sans-serif] font-[700] leading-[1.1] text-[24px] whitespace-nowrap ${
              activeTab === 'projects' ? 'text-[rgba(255,255,255,0.87)]' : 'text-[rgba(255,255,255,0.6)]'
            }`}>
              Projects
            </span>
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className={`flex gap-[8px] items-center justify-center py-[8px] cursor-pointer relative ${
              activeTab === 'creators' ? 'border-b-2 border-[#a5ff5f]' : ''
            }`}
          >
            <span className={`font-['Satoshi',sans-serif] font-[700] leading-[1.1] text-[24px] whitespace-nowrap ${
              activeTab === 'creators' ? 'text-[rgba(255,255,255,0.87)]' : 'text-[rgba(255,255,255,0.6)]'
            }`}>
              Creators
            </span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' ? (
          <div className="flex flex-col gap-[16px]">
            {savedProjectsList.length > 0 ? (
              savedProjectsList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-[#212226] rounded-[8px]">
                <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.38)]">
                  No saved projects yet
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] justify-items-center">
            {savedCreatorsList.length > 0 ? (
              savedCreatorsList.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  onClick={() => navigate(`/creator/${creator.id}`)}
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-[200px] bg-[#212226] rounded-[8px]">
                <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.38)]">
                  No saved creators yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}