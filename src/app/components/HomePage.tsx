import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { CategoryFilter } from './CategoryFilter';
import { FilterBar } from './FilterBar';
import { ProjectCard } from './ProjectCard';
import { CreatorCard } from './CreatorCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { projects, creators } from '../data/mock-data';
import type { Project } from '../data/mock-data';

type TabType = 'projects' | 'creators';

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentType, setPaymentType] = useState('Any');
  const [duration, setDuration] = useState('Any');
  const [availability, setAvailability] = useState('Any');
  const [sortBy, setSortBy] = useState('Best Match');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (paymentType !== 'Any' && p.paymentType !== paymentType) return false;
      if (duration !== 'Any' && p.duration !== duration) return false;
      if (availability !== 'Any' && p.availability !== availability) return false;
      return true;
    });
  }, [selectedCategory, paymentType, duration, availability]);

  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (paymentType !== 'Any' && c.paymentType !== paymentType) return false;
      if (duration !== 'Any' && c.duration !== duration) return false;
      if (availability !== 'Any' && c.availability !== availability) return false;
      return true;
    });
  }, [selectedCategory, paymentType, duration, availability]);

  return (
    <div className="flex flex-col gap-[64px] w-full">
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

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

        {/* Filters */}
        <div className="flex flex-col gap-[24px] w-full">
          <FilterBar
            paymentType={paymentType}
            duration={duration}
            availability={availability}
            onPaymentChange={setPaymentType}
            onDurationChange={setDuration}
            onAvailabilityChange={setAvailability}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showAvailability={activeTab === 'projects'}
          />

          {/* Content */}
          {activeTab === 'projects' ? (
            <div className="flex flex-col gap-[16px]">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                ))
              ) : (
                <div className="flex items-center justify-center h-[200px] bg-[#212226] rounded-[8px]">
                  <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.38)]">
                    No projects match your filters
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {filteredCreators.length > 0 ? (
                filteredCreators.map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    onClick={() => navigate(`/creator/${creator.id}`)}
                  />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center h-[200px] bg-[#212226] rounded-[8px]">
                  <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.38)]">
                    No creators match your filters
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}