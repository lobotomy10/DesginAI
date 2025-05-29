import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Code, Rocket, Clock, CheckCircle, Play, Pause, Zap, Brain, Globe } from 'lucide-react';

/**
 * ⏰ TIME MATRIX カスタマイズガイド
 * 
 * 【時間設定箇所】
 * 1. 初期時間: 行14 - setTimeRemaining の初期値
 * 2. カウントダウン間隔: 行65 - setInterval の間隔 (ms)
 * 3. カウントダウン減少量: 行62 - prev から引く値
 * 4. リセット時間: 行775 - setTimeRemaining の値
 * 
 * 【設定例】
 * - 30分: 1800秒
 * - 1時間: 3600秒  
 * - 2時間: 7200秒
 * - 高速テスト: 60秒
 * 
 * 【間隔例】
 * - リアルタイム: 1000ms (1秒)
 * - 高速: 500ms (0.5秒)
 * - ゆっくり: 2000ms (2秒)
 */

const BusinessCreationDemo = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [developmentProgress, setDevelopmentProgress] = useState(0);
  
  // ⏰ TIME MATRIX設定 - 初期時間の設定
  // 86400 = 24時間 (1日), 3600 = 1時間, 1800 = 30分
  const [timeRemaining, setTimeRemaining] = useState(86400);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // 🌐 言語切り替え機能
  const [language, setLanguage] = useState('ja'); // 'ja' or 'en'

  // 🌐 言語設定オブジェクト
  const texts = {
    ja: {
      // Stage 0 - 投票画面
      votingSystemTitle: "NEURAL VOTING SYSTEM",
      votingSystemSubtitle: "次世代事業案投票プラットフォーム",
      businessName: "AI健康管理アシスタント",
      businessDescription: "個人の健康データを分析し、パーソナライズされた健康アドバイスを提供するアプリ",
      keywords: ["健康", "AI", "パーソナライズ", "データ分析", "ウェルネス"],
      neuralConsensus: "NEURAL CONSENSUS",
      processingData: "PROCESSING NEURAL DATA...",
      consensusAchieved: "CONSENSUS ACHIEVED",
      initiateVoting: "INITIATE VOTING PROTOCOL",
      
      // Stage 1 - 事業決定画面  
      consensusLocked: "CONSENSUS LOCKED",
      aiSystemReady: "デザインAIエージェント始動準備完了",
      projectApproved: "PROJECT APPROVED",
      neuralConsensusStatus: "Neural Consensus",
      statusActive: "Status: ACTIVE",
      initializeMatrix: "INITIALIZE AI DEVELOPMENT MATRIX",
      
      // Stage 2 - 開発プロセス画面
      developmentMatrix: "AI DEVELOPMENT MATRIX", 
      architectureGenerated: "Neural Network Architecture Generated",
      techStackMatrix: "TECH STACK MATRIX",
      executionProtocol: "EXECUTION PROTOCOL",
      neuralProcessingTime: "NEURAL PROCESSING TIME",
      quantumDevelopment: "Quantum AI Development Cycle",
      executeProtocol: "EXECUTE NEURAL PROTOCOL",
      neuralConfiguring: "NEURAL PATHWAYS CONFIGURING...",
      techStackStatuses: {
        completed: "ONLINE",
        inProgress: "SYNCING", 
        pending: "STANDBY"
      },
      
      // Stage 3 - 開発進行画面
      synthesisActive: "NEURAL SYNTHESIS ACTIVE",
      quantumProgress: "Quantum Development in Progress",
      neuralProgress: "NEURAL PROGRESS",
      timeMatrix: "TIME MATRIX",
      countdownLaunch: "Countdown to Launch",
      currentProcess: "CURRENT PROCESS",
      neuralProcess: "Neural Process",
      systemStatus: "System Status",
      processMessages: [
        "Initializing quantum matrices...",
        "Generating neural UI patterns...", 
        "Architecting data structures...",
        "Synthesizing API pathways...",
        "Integrating AI consciousness...",
        "Running quantum tests...",
        "Preparing for neural deployment..."
      ],
      
      // Stage 4 - 完了画面
      launchComplete: "🚀 NEURAL LAUNCH COMPLETE",
      synthesisComplete: "Quantum AI has successfully synthesized your application",
      developmentComplete: "Neural Development Complete",
      launchApplication: "LAUNCH APPLICATION", 
      viewReport: "VIEW NEURAL REPORT",
      neuralSynthesis: "Neural Synthesis",
      developmentTime: "Development Time",
      neuralModules: "Neural Modules",  
      newVenture: "INITIALIZE NEW NEURAL VENTURE",
      
      // 技術スタック
      techStack: [
        { name: "フロントエンド", tech: "React Native" },
        { name: "バックエンド", tech: "Node.js + Express" },
        { name: "データベース", tech: "MongoDB" },
        { name: "AI/ML", tech: "TensorFlow.js" },
        { name: "認証", tech: "Firebase Auth" },
        { name: "クラウド", tech: "AWS" }
      ],
      
      // 開発ステップ
      developmentSteps: [
        "プロジェクト初期化",
        "UI/UXデザイン生成", 
        "データベース設計",
        "API開発",
        "AIモデル統合",
        "テスト実装",
        "デプロイ準備"
      ]
    },
    
    en: {
      // Stage 0 - 投票画面
      votingSystemTitle: "NEURAL VOTING SYSTEM",
      votingSystemSubtitle: "Next-Gen Business Proposal Voting Platform",
      businessName: "AI Health Management Assistant",
      businessDescription: "An app that analyzes personal health data and provides personalized health advice",
      keywords: ["Health", "AI", "Personalization", "Data Analysis", "Wellness"],
      neuralConsensus: "NEURAL CONSENSUS",
      processingData: "PROCESSING NEURAL DATA...",
      consensusAchieved: "CONSENSUS ACHIEVED",
      initiateVoting: "INITIATE VOTING PROTOCOL",
      
      // Stage 1 - 事業決定画面
      consensusLocked: "CONSENSUS LOCKED", 
      aiSystemReady: "Design AI Agent ready for launch",
      projectApproved: "PROJECT APPROVED",
      neuralConsensusStatus: "Neural Consensus",
      statusActive: "Status: ACTIVE",
      initializeMatrix: "INITIALIZE AI DEVELOPMENT MATRIX",
      
      // Stage 2 - 開発プロセス画面
      developmentMatrix: "AI DEVELOPMENT MATRIX",
      architectureGenerated: "Neural Network Architecture Generated", 
      techStackMatrix: "TECH STACK MATRIX",
      executionProtocol: "EXECUTION PROTOCOL",
      neuralProcessingTime: "NEURAL PROCESSING TIME",
      quantumDevelopment: "Quantum AI Development Cycle",
      executeProtocol: "EXECUTE NEURAL PROTOCOL",
      neuralConfiguring: "NEURAL PATHWAYS CONFIGURING...",
      techStackStatuses: {
        completed: "ONLINE",
        inProgress: "SYNCING",
        pending: "STANDBY"
      },
      
      // Stage 3 - 開発進行画面
      synthesisActive: "NEURAL SYNTHESIS ACTIVE",
      quantumProgress: "Quantum Development in Progress",
      neuralProgress: "NEURAL PROGRESS", 
      timeMatrix: "TIME MATRIX",
      countdownLaunch: "Countdown to Launch",
      currentProcess: "CURRENT PROCESS",
      neuralProcess: "Neural Process",
      systemStatus: "System Status",
      processMessages: [
        "Initializing quantum matrices...",
        "Generating neural UI patterns...",
        "Architecting data structures...", 
        "Synthesizing API pathways...",
        "Integrating AI consciousness...",
        "Running quantum tests...",
        "Preparing for neural deployment..."
      ],
      
      // Stage 4 - 完了画面
      launchComplete: "🚀 NEURAL LAUNCH COMPLETE",
      synthesisComplete: "Quantum AI has successfully synthesized your application",
      developmentComplete: "Neural Development Complete",  
      launchApplication: "LAUNCH APPLICATION",
      viewReport: "VIEW NEURAL REPORT", 
      neuralSynthesis: "Neural Synthesis",
      developmentTime: "Development Time",
      neuralModules: "Neural Modules",
      newVenture: "INITIALIZE NEW NEURAL VENTURE",
      
      // 技術スタック
      techStack: [
        { name: "Frontend", tech: "React Native" },
        { name: "Backend", tech: "Node.js + Express" },
        { name: "Database", tech: "MongoDB" },
        { name: "AI/ML", tech: "TensorFlow.js" },
        { name: "Auth", tech: "Firebase Auth" },
        { name: "Cloud", tech: "AWS" }
      ],
      
      // 開発ステップ  
      developmentSteps: [
        "Project Initialization",
        "UI/UX Design Generation",
        "Database Architecture", 
        "API Development",
        "AI Model Integration",
        "Testing Implementation",
        "Deployment Preparation"
      ]
    }
  };

  const t = texts[language];

  // パーティクル効果
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, [currentStage]);

  const simulateVoting = () => {
    setIsVoting(true);
    const interval = setInterval(() => {
      setVoteCount(prev => {
        if (prev >= 12) {
          clearInterval(interval);
          setIsVoting(false);
          setTimeout(() => setCurrentStage(1), 1000);
          return prev;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 300);
  };

  const generateDevelopmentProcess = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStage(2);
    }, 3000);
  };

  const startDevelopment = () => {
    setCurrentStage(3);
    const interval = setInterval(() => {
      setDevelopmentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentStage(4);
          return 100;
        }
        if (prev >= 30) {
          return prev + Math.random() * 0.2 + 0.1; // 30%以降は約0.1〜0.3%の増加
        } else {
          return prev + Math.random() * 0.5 + 0.2; // 30%未満は約0.2〜0.7%の増加
        }
      });
    }, 200);

    // ⏰ TIME MATRIX設定 - カウントダウンの間隔と減少量
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        // カウントダウン減少量: 1 = 1秒ずつ, 0.5 = 0.5秒ずつ, 2 = 2秒ずつ
        return prev - 1;
      });
    }, 1000); // 更新間隔: 1000ms = 1秒, 500ms = 0.5秒, 2000ms = 2秒
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 🎨 言語切り替えボタンコンポーネント
  const LanguageToggle = () => (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
        className="group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
        <div className="relative bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/30 rounded-lg px-3 py-2 text-xs font-medium text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2">
          <Globe className="w-3 h-3" />
          <span className="font-mono">{language === 'ja' ? 'EN' : 'JA'}</span>
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </button>
    </div>
  );

  const selectedBusiness = {
    name: t.businessName,
    description: t.businessDescription,
    keywords: t.keywords
  };

  const techStack = t.techStack.map((item, index) => ({
    ...item,
    status: index < 2 ? "completed" : index < 4 ? "in-progress" : "pending",
    icon: ["⚛️", "🚀", "🗄️", "🧠", "🔐", "☁️"][index]
  }));

  const developmentSteps = t.developmentSteps;

  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.1}s`,
            transform: `scale(${particle.size})`
          }}
        />
      ))}
    </div>
  );

  if (currentStage === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        <ParticleBackground />
        <LanguageToggle />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 p-6 max-w-4xl w-full">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <Users className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {t.votingSystemTitle}
              </h1>
              <p className="text-gray-300 text-base">{t.votingSystemSubtitle}</p>
            </div>

            <div className="relative mb-6">
              <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-xl p-4 border border-cyan-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-xl animate-pulse" />
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  {selectedBusiness.name}
                </h2>
                <p className="text-gray-300 mb-3 leading-relaxed text-sm">{selectedBusiness.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBusiness.keywords.map((keyword, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30 backdrop-blur-sm hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="relative">
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1 font-mono">
                  {voteCount}/15
                </div>
                <div className="text-gray-400 text-base">{t.neuralConsensus}</div>
              </div>
              <div className="relative mt-4">
                <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm border border-gray-600/30">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(voteCount / 15) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="absolute -top-1 -bottom-1 left-0 right-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm -z-10" />
              </div>
            </div>

            <button
              onClick={simulateVoting}
              disabled={isVoting || voteCount >= 12}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2">
                {isVoting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.processingData}
                  </>
                ) : voteCount >= 12 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.consensusAchieved}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    {t.initiateVoting}
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
        <ParticleBackground />
        <LanguageToggle />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#00ff88 1px, transparent 1px),
              linear-gradient(90deg, #00ff88 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-500/20 p-6 max-w-4xl w-full">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {t.consensusLocked}
              </h1>
              <p className="text-gray-300 text-base">{t.aiSystemReady}</p>
            </div>

            <div className="relative mb-6">
              <div className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-4 border border-green-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-cyan-400/5 rounded-xl animate-pulse" />
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-400 animate-spin" />
                  {selectedBusiness.name}
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">{selectedBusiness.description}</p>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-green-500/30">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-semibold text-base">{t.projectApproved}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {t.neuralConsensusStatus}: {Math.round((voteCount / 15) * 100)}% | {t.statusActive}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generateDevelopmentProcess}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-white py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2">
                <Code className="w-5 h-5" />
                {t.initializeMatrix}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStage === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        <ParticleBackground />
        <LanguageToggle />
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#8b5cf6 1px, transparent 1px),
              linear-gradient(90deg, #8b5cf6 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 p-6 max-w-full w-full">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <Code className="w-16 h-16 text-purple-400 mx-auto" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {t.developmentMatrix}
              </h1>
              <p className="text-gray-300 text-base">{t.architectureGenerated}</p>
            </div>

            {isGenerating ? (
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mx-auto" />
                  <div className="absolute inset-0 bg-purple-400/10 rounded-full animate-pulse" />
                </div>
                <p className="text-gray-300 text-lg mb-3">{t.neuralConfiguring}</p>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.2}s`}} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      {t.techStackMatrix}
                    </h3>
                    <div className="space-y-3">
                      {techStack.map((item, index) => (
                        <div key={index} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                              <div className="text-xl">{item.icon}</div>
                              <div>
                                <div className="font-semibold text-white text-base">{item.name}</div>
                                <div className="text-gray-400 text-sm">{item.tech}</div>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-bold border ${
                              item.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              'bg-gray-500/20 text-gray-400 border-gray-500/30'
                            }`}>
                              {t.techStackStatuses[item.status]}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-400" />
                      {t.executionProtocol}
                    </h3>
                    <div className="space-y-3">
                      {developmentSteps.map((step, index) => (
                        <div key={index} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="relative flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <div className="text-white font-medium text-sm">{step}</div>
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-6 border border-purple-500/30 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      {t.neuralProcessingTime}
                    </h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 font-mono">
                    24:00:00
                    </div>
                    <div className="text-gray-400 text-base">{t.quantumDevelopment}</div>
                  </div>

                  <button
                    onClick={startDevelopment}
                    className="relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
                    <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-3 px-8 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      {t.executeProtocol}
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
        <ParticleBackground />
        <LanguageToggle />
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#22c55e 1px, transparent 1px),
              linear-gradient(90deg, #22c55e 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-2">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-500/20 p-4 max-w-full w-full">
            <div className="text-center mb-4">
              <div className="relative mb-3">
                <Clock className="w-12 h-12 text-green-400 mx-auto animate-spin" />
                <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                {t.synthesisActive}
              </h1>
              <p className="text-gray-300 text-sm">{t.quantumProgress}</p>
            </div>

            <div className="text-center mb-4">
              <div className="bg-gradient-to-br from-green-900/50 to-cyan-900/50 rounded-xl p-4 border border-green-500/30 backdrop-blur-sm max-w-md mx-auto">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  {t.timeMatrix}
                </h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1 font-mono">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-gray-400 text-sm">{t.countdownLaunch}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-green-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Brain className="w-4 h-4 text-green-400" />
                    {t.neuralProgress}
                  </h3>
                  <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                    {Math.round(developmentProgress)}%
                  </div>
                </div>
                
                <div className="relative mb-3">
                  <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm border border-gray-600/30">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-cyan-500 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                      style={{ width: `${developmentProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-sm -z-10" />
                </div>

                <div className="space-y-1">
                  {developmentSteps.map((step, index) => {
                    const stepProgress = Math.max(0, developmentProgress - (index * 14.3));
                    const isCompleted = stepProgress >= 14.3;
                    const isInProgress = stepProgress > 0 && stepProgress < 14.3;
                    
                    return (
                      <div key={index} className="relative group">
                        <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                          isCompleted ? 'bg-green-500/10' : 
                          isInProgress ? 'bg-green-500/10' : 'bg-gray-500/5'
                        }`} />
                        <div className="relative flex items-center gap-2 p-2 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                            isCompleted ? 'bg-gradient-to-r from-green-500 to-green-400 text-white' :
                            isInProgress ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white' :
                            'bg-gray-600 text-gray-300'
                          }`}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          <div className={`text-xs font-medium transition-all duration-500 ${
                            isCompleted ? 'text-green-400' :
                            isInProgress ? 'text-green-400' :
                            'text-gray-400'
                          }`}>
                            {step}
                          </div>
                          {isInProgress && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-green-500/20 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  {t.currentProcess}
                </h3>
                
                <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg p-3 mb-3 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-1 flex items-center gap-1">
                    <Brain className="w-3 h-3 text-green-400" />
                    {t.neuralProcess}
                  </h4>
                  <div className="text-xs text-gray-300">
                    {t.processMessages[
                      developmentProgress < 14.3 ? 0 :
                      developmentProgress < 28.6 ? 1 :
                      developmentProgress < 42.9 ? 2 :
                      developmentProgress < 57.2 ? 3 :
                      developmentProgress < 71.5 ? 4 :
                      developmentProgress < 85.8 ? 5 : 6
                    ]}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg p-3 border border-gray-600/30">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-green-400" />
                    {t.systemStatus}
                  </h4>
                  <div className="space-y-1">
                    {techStack.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 flex items-center gap-1">
                          <span className="text-sm">{item.icon}</span>
                          {item.name}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-xs font-bold border ${
                          developmentProgress > (index + 1) * 15 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          developmentProgress > index * 15 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {developmentProgress > (index + 1) * 15 ? t.techStackStatuses.completed :
                           developmentProgress > index * 15 ? t.techStackStatuses.inProgress : t.techStackStatuses.pending}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
        <ParticleBackground />
        <LanguageToggle />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#00ff88 1px, transparent 1px),
              linear-gradient(90deg, #00ff88 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-500/20 p-6 max-w-5xl w-full text-center">
            <div className="relative mb-6">
              <Rocket className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              {t.launchComplete}
            </h1>
            <p className="text-lg text-gray-300 mb-6">{t.synthesisComplete}</p>
            
            <div className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 mb-6 border border-green-500/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-cyan-400/5 rounded-xl animate-pulse" />
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                <Globe className="w-6 h-6 text-green-400" />
                {selectedBusiness.name}
              </h2>
              <p className="text-gray-300 mb-4 text-base">{t.developmentComplete}: 24:00:00</p>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-white py-2 px-6 rounded-lg font-bold text-base transition-all duration-300 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  {t.launchApplication}
                </button>
                <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-2 px-6 rounded-lg font-bold text-base transition-all duration-300 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  {t.viewReport}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  100%
                </div>
                <div className="text-gray-400 text-sm">{t.neuralSynthesis}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  24:00:00
                </div>
                <div className="text-gray-400 text-sm">{t.developmentTime}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  7
                </div>
                <div className="text-gray-400 text-sm">{t.neuralModules}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentStage(0);
                setVoteCount(0);
                setDevelopmentProgress(0);
                // ⏰ TIME MATRIX設定 - リセット時の初期時間（上記の初期値と同じ値にする）
                setTimeRemaining(86400); // 初期時間と同じ値に設定
              }}
              className="relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                {t.newVenture}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BusinessCreationDemo;
