import { useState } from 'react';
import CODMnFlowchart from './COD';
import TN_UVVis_Oxidation_Flow from './T.N';
import TP_UVVis_Oxidation_Flow from './T.P';
import N_N_Flow from './N.N';
import P_P_Flow from './P.P';
import NH_Flow from './nH';
import SS_Flow from './S.S';
import Color_Flow from './Color';
import BOD_Flow from './BOD';
import PH_Flow from './P.H';
import TOC_HTC_Flow from './TOC';
import T_Flow from './T';
import TabNavigation from '../Common/TabNavigation';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'cod' | 'tn' | 'tp' | 'pp' | 'nn' | 'nH' | 'ss' | 'color' | 'bod' | 'PH' | 'toc' | 't'>('cod');
  const tabs = [
    { id: 'cod', label: 'CODₘₙ (산성과망간산칼륨법)', mobileLabel: 'COD' },
    { id: 'tn', label: '총질소 (자외·가시선 분광법)', mobileLabel: 'TN' },
    { id: 'tp', label: '총인(자외·가시선 분광법)', mobileLabel: 'TP' },
    { id: 'pp', label: '인산염인(아스코빈산환원법)', mobileLabel: 'PP' },
    { id: 'nn', label: '질산성질소(자외선/가시선 분광법)', mobileLabel: 'NN' },
    { id: 'nH', label: '노말헥산 추출물질(nH)', mobileLabel: 'nH' },
    { id: 'ss', label: '부유물질(SS)', mobileLabel: 'SS' },
    { id: 'color', label: '색도(Color)', mobileLabel: 'Color' },
    { id: 'bod', label: '생물화학적 산소요구량(BOD)', mobileLabel: 'BOD' },
    { id: 'PH', label: '수소이온농도(PH)', mobileLabel: 'pH' },
    { id: 'toc', label: '총유기탄소(TOC)', mobileLabel: 'TOC' },
    { id: 't', label: '탁도(T)', mobileLabel: 'T' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 탭 네비게이션 */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as any)}
      />
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('cod')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'cod'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              CODₘₙ (산성과망간산칼륨법)
            </button>
            <button
              onClick={() => setActiveTab('tn')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tn'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              총질소 (자외·가시선 분광법)
            </button>    

            <button
              onClick={() => setActiveTab('tp')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tp'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              총인(자외·가시선 분광법)
            </button>

            <button onClick={() => setActiveTab('pp')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pp'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              인산염인(아스코빈산환원법)
            </button>
            
            <button onClick={() => setActiveTab('nn')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'nn'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              질산성질소(자외선/가시선 분광법)
            </button>

            <button onClick={() => setActiveTab('nH')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'nH'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              노말헥산 추출물질(nH)
            </button>

            <button onClick={() => setActiveTab('ss')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'ss'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              부유물질(SS)
            </button>

            <button onClick={() => setActiveTab('color')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'color'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              색도(Color)
            </button>

            <button onClick={() => setActiveTab('bod')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'bod'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              생물화학적 산소요구량(BOD)
            </button>

            <button onClick={() => setActiveTab('PH')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'PH'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              수소이온농도(PH)
            </button>

            <button onClick={() => setActiveTab('toc')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'toc'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              총유기탄소(TOC)
            </button>

            <button onClick={() => setActiveTab('t')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 't'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              탁도(T)
            </button>
          </nav>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="transition-all duration-200">
        {activeTab === 'cod' && <CODMnFlowchart />}
        {activeTab === 'tn' && <TN_UVVis_Oxidation_Flow />}
        {activeTab === 'tp' && <TP_UVVis_Oxidation_Flow />}
        {activeTab === 'pp' && <P_P_Flow />}
        {activeTab === 'nn' && <N_N_Flow />}
        {activeTab === 'nH' && <NH_Flow />}
        {activeTab === 'ss' && <SS_Flow />}
        {activeTab === 'color' && <Color_Flow />}
        {activeTab === 'bod' && <BOD_Flow />}
        {activeTab === 'PH' && <PH_Flow />}
        {activeTab === 'toc' && <TOC_HTC_Flow />}
        {activeTab === 't' && <T_Flow />}
      </div>
    </div>
  );
}
