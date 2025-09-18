import { useState } from 'react';
import CategoryNavigation from '../Common/CategoryNavigation';
import TabNavigation from '../Common/TabNavigation';

// Ion 카테고리 컴포넌트들
import ABS_Flow from './ion/ABS';
import C_Flow from './ion/C';
import CN_Flow from './ion/CN';
import F_Flow from './ion/F';
import NH3_N_Flow from './ion/NH3-N';
import NO2_N_Flow from './ion/NO2-N';
import NO3_N_Flow from './ion/NO3-N';
import PP_Flow from './ion/P.P';
import Phenols_Flow from './ion/Phenols';
import TN_Flow from './ion/T.N';
import TP_Flow from './ion/T.P';

// Normal 카테고리 컴포넌트들
import BOD_Flow from './nomal/BOD';
import COD_Flow from './nomal/COD';
import Color_Flow from './nomal/Color';
import NH_Flow from './nomal/nH';
import PH_Flow from './nomal/P.H';
import SS_Flow from './nomal/S.S';
import TC_Flow from './nomal/T.C';
import T_Flow from './nomal/T';
import TOC_Flow from './nomal/TOC';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'ion' | 'normal'>('ion');
  const [activeTab, setActiveTab] = useState<string>('tn');

  const categories = [
    { id: 'ion', label: 'Ion' },
    { id: 'normal', label: 'Normal' },
  ];

  const ionTabs = [
    { id: 'tn', label: '총질소 (자외·가시선 분광법)', mobileLabel: 'TN' },
    { id: 'tp', label: '총인(자외·가시선 분광법)', mobileLabel: 'TP' },
    { id: 'no3-n', label: '질산성질소(자외선/가시선 분광법)', mobileLabel: 'NO3-N' },
    { id: 'pp', label: '인산염인(아스코빈산환원법)', mobileLabel: 'PP' },
    { id: 'f', label: '불소(Fluoride)', mobileLabel: 'F' },
    { id: 'no2-n', label: '아질산성질소', mobileLabel: 'NO2-N' },
    { id: 'nh3-n', label: '암모니아성질소', mobileLabel: 'NH3-N' },
    { id: 'cn', label: '시안(CN)', mobileLabel: 'CN' },
    { id: 'c', label: '염소(Cl)', mobileLabel: 'Cl' },
    { id: 'abs', label: 'ABS', mobileLabel: 'ABS' },
    { id: 'phenols', label: '페놀류', mobileLabel: 'Phenols' },
  ];

  const normalTabs = [
    { id: 'cod', label: 'CODₘₙ (산성과망간산칼륨법)', mobileLabel: 'COD' },
    { id: 'bod', label: '생물화학적 산소요구량(BOD)', mobileLabel: 'BOD' },
    { id: 'ss', label: '부유물질(SS)', mobileLabel: 'SS' },
    { id: 'color', label: '색도(Color)', mobileLabel: 'Color' },
    { id: 'nh', label: '노말헥산 추출물질(nH)', mobileLabel: 'nH' },
    { id: 'ph', label: '수소이온농도(PH)', mobileLabel: 'pH' },
    { id: 'toc', label: '총유기탄소(TOC)', mobileLabel: 'TOC' },
    { id: 't', label: '탁도(T)', mobileLabel: 'T' },
    { id: 'tc', label: '총탄소(T.C)', mobileLabel: 'TC' },
  ];

  const currentTabs = activeCategory === 'ion' ? ionTabs : normalTabs;

  const renderContent = () => {
    if (activeCategory === 'ion') {
      switch (activeTab) {
        case 'tn': return <TN_Flow />;
        case 'tp': return <TP_Flow />;
        case 'no3-n': return <NO3_N_Flow />;
        case 'pp': return <PP_Flow />;
        case 'f': return <F_Flow />;
        case 'no2-n': return <NO2_N_Flow />;
        case 'nh3-n': return <NH3_N_Flow />;
        case 'cn': return <CN_Flow />;
        case 'c': return <C_Flow />;
        case 'abs': return <ABS_Flow />;
        case 'phenols': return <Phenols_Flow />;
        default: return <TN_Flow />;
      }
    } else {
      switch (activeTab) {
        case 'cod': return <COD_Flow />;
        case 'bod': return <BOD_Flow />;
        case 'ss': return <SS_Flow />;
        case 'color': return <Color_Flow />;
        case 'nh': return <NH_Flow />;
        case 'ph': return <PH_Flow />;
        case 'toc': return <TOC_Flow />;
        case 't': return <T_Flow />;
        case 'tc': return <TC_Flow />;
        default: return <COD_Flow />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상위 카테고리 네비게이션 */}
      <CategoryNavigation 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(categoryId) => {
          setActiveCategory(categoryId as 'ion' | 'normal');
          // 카테고리 변경 시 첫 번째 탭으로 이동
          if (categoryId === 'ion') {
            setActiveTab('tn');
          } else {
            setActiveTab('cod');
          }
        }}
      />

      {/* 하위 탭 네비게이션 */}
      <TabNavigation 
        tabs={currentTabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      {/* 탭 컨텐츠 */}
      <div className="transition-all duration-200">
        {renderContent()}
      </div>
    </div>
  );
}