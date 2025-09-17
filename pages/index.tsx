import { useState } from 'react';
import TabNavigation from '../Common/TabNavigation';
import CODMnFlowchart from './nomal/COD';
import TN_UVVis_Oxidation_Flow from './ion/T.N';
import TP_UVVis_Oxidation_Flow from './ion/T.P';
import NO3_N_Flow from './ion/NO3-N';
import P_P_Flow from './ion/P.P';
import F_Flow from './ion/F';
import NO2_N_Flow from './ion/NO2-N';
import NH3_N_Flow from './ion/NH3-N';
import CN_Flow from './ion/CN';
import Chloride_Flow from './ion/C';

import NH_Flow from './nomal/nH';
import SS_Flow from './nomal/S.S';
import Color_Flow from './nomal/Color';
import BOD_Flow from './nomal/BOD';
import PH_Flow from './nomal/P.H';
import TOC_HTC_Flow from './nomal/TOC';
import T_Flow from './nomal/T';
import T_C_Flow from './nomal/T.C';
import ABS_Flow from './ion/ABS';
import Phenols_Flow from './ion/Phenols';


export default function Home() {
  const [activeTab, setActiveTab] = useState<'cod' | 'tn' | 'tp' | 'pp' | 'no3-n' | 'nH' | 'ss' | 'color' | 'bod' | 'PH' | 'toc' | 't' | 'tc' | 'f' | 'no2-n' | 'nh3-n' | 'cn' | 'abs' | 'phenols' | 'chloride'>('cod');
  const tabs = [
    { id: 'cod', label: 'CODₘₙ (산성과망간산칼륨법)', mobileLabel: 'COD' },
    { id: 'tn', label: '총질소 (자외·가시선 분광법)', mobileLabel: 'TN' },
    { id: 'tp', label: '총인(자외·가시선 분광법)', mobileLabel: 'TP' },
    { id: 'pp', label: '인산염인(아스코빈산환원법)', mobileLabel: 'PP' },
    { id: 'no3-n', label: '질산성질소(자외선/가시선 분광법)', mobileLabel: 'NO3-N' },
    { id: 'nH', label: '노말헥산 추출물질(nH)', mobileLabel: 'nH' },
    { id: 'ss', label: '부유물질(SS)', mobileLabel: 'SS' },
    { id: 'color', label: '색도(Color)', mobileLabel: 'Color' },
    { id: 'bod', label: '생물화학적 산소요구량(BOD)', mobileLabel: 'BOD' },
    { id: 'PH', label: '수소이온농도(PH)', mobileLabel: 'pH' },
    { id: 'toc', label: '총유기탄소(TOC)', mobileLabel: 'TOC' },
    { id: 't', label: '탁도(T)', mobileLabel: 'T' },
    { id: 'tc', label: '총대장균군(건조필름법)', mobileLabel: 'TC' },
    { id: 'f', label: '불소(란탄–알리자린 콤프렉손)', mobileLabel: 'F' },
    { id: 'no2-n', label: '아질산성질소(자외·가시선 분광법)', mobileLabel: 'NO2-N' },
    { id: 'nh3-n', label: '질산성질소(자외·가시선 분광법)', mobileLabel: 'NH3-N' },
    { id: 'cn', label: '시안(자외·가시선 분광법)', mobileLabel: 'CN' },
    { id: 'abs', label: '음이온계면활성제(MBAS)', mobileLabel: 'ABS' },
    { id: 'phenols', label: '페놀류(Phenols)', mobileLabel: 'Phenols' },
    { id: 'chloride', label: '염소이온(Chloride)', mobileLabel: 'Chloride' },
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
            
            <button onClick={() => setActiveTab('no3-n')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'no3-n'
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

            <button onClick={() => setActiveTab('tc')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tc'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              총대장균군(건조필름법)
            </button>

            <button onClick={() => setActiveTab('f')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'f'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              불소(란탄–알리자린 콤프렉손)
            </button>

            <button onClick={() => setActiveTab('no2-n')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'no2-n'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              아질산성질소(자외·가시선 분광법)
            </button>

            <button onClick={() => setActiveTab('nh3-n')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'nh3-n'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              질산성질소(자외·가시선 분광법)
            </button>

            <button onClick={() => setActiveTab('cn')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'cn'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              시안(자외·가시선 분광법)
            </button>

            <button onClick={() => setActiveTab('chloride')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'chloride'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              염소이온(Chloride)
            </button>

            <button onClick={() => setActiveTab('abs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'abs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              음이온계면활성제(MBAS)
            </button>

            <button onClick={() => setActiveTab('phenols')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'phenols'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              페놀류(Phenols)
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
        {activeTab === 'no3-n' && <NO3_N_Flow />}
        {activeTab === 'nH' && <NH_Flow />}
        {activeTab === 'ss' && <SS_Flow />}
        {activeTab === 'color' && <Color_Flow />}
        {activeTab === 'bod' && <BOD_Flow />}
        {activeTab === 'PH' && <PH_Flow />}
        {activeTab === 'toc' && <TOC_HTC_Flow />}
        {activeTab === 't' && <T_Flow />}
        {activeTab === 'tc' && <T_C_Flow />}
        {activeTab === 'f' && <F_Flow />}
        {activeTab === 'no2-n' && <NO2_N_Flow />}
        {activeTab === 'nh3-n' && <NH3_N_Flow />} 
        {activeTab === 'abs' && <ABS_Flow />}
        {activeTab === 'cn' && <CN_Flow />}
        {activeTab === 'phenols' && <Phenols_Flow />}
        {activeTab === 'chloride' && <Chloride_Flow />}
      </div>
    </div>
  );
}
