import React, { useState, useEffect } from 'react';
import { Sparkles, Download, Copy, Trash2, ArrowRight, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';

interface SavedVision {
  id: string;
  prompt: string;
  url: string;
  timestamp: string;
  presetTitle?: string;
}

const PRESETS = [
  {
    title: "My Future Tech HQ in Accra",
    prompt: "A modern co-working tech hub in Accra, Ghana, bright with natural sunlight, filled with green plants and local tropical wood, laptops showing dashboard code, software development hub, photorealistic, 4k resolution, cinematic lighting.",
    category: "Technology",
    emoji: "💻"
  },
  {
    title: "Eco Agribusiness Drone Hub",
    prompt: "Advanced organic farming greenhouse in Kumasi, drone surveying crops, hydroponic levels, solar panel setups, modern agribusiness entrepreneur, high tech agriculture, vibrant colors, detailed watercolor style.",
    category: "Agribusiness",
    emoji: "🌱"
  },
  {
    title: "My Dream Clinic in Western Region",
    prompt: "An elegant, clean pediatric medical room with high-quality local artwork on the walls in Western Ghana, open windows showing palm trees, professional doctor smiling, warm encouraging lighting, realistic digital art.",
    category: "Healthcare",
    emoji: "🏥"
  },
  {
    title: "Tropical Modern Library Space",
    prompt: "Sustainable modern civic library architecture by the seaside in Cape Coast, built with compressed earth bricks, beautiful solar columns, reading students, lush gardens, architectural visualization, masterpiece 3d render.",
    category: "Architecture",
    emoji: "🏛️"
  },
  {
    title: "Sustainable Fashion Runway",
    prompt: "A global runway featuring modern couture matching traditional smock and kente textiles into avant-garde fashion design, detailed premium textures, high-fashion editorial lighting, trending on ArtStation.",
    category: "Creative Arts",
    emoji: "🧵"
  },
  {
    title: "Ghanaian Graduation Day",
    prompt: "A joyous graduation ceremony at a premier university like KNUST, a proud smart Ghanaian student wearing graduation gown over kente sash holding a degree certificate, happy parents cheering, photorealistic, golden hour sunshine.",
    category: "Milestone",
    emoji: "🎓"
  }
];

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [savedVisions, setSavedVisions] = useState<SavedVision[]>([]);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load saved visions on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('career_path_visions');
      if (stored) {
        setSavedVisions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading saved visions", e);
    }
  }, []);

  // Save to localStorage whenever list changes
  const saveVisionsList = (list: SavedVision[]) => {
    setSavedVisions(list);
    try {
      localStorage.setItem('career_path_visions', JSON.stringify(list));
    } catch (e) {
      console.error("Error saving visions", e);
    }
  };

  // Simulate premium realistic generation loading steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgressStep(0);
      interval = setInterval(() => {
        setProgressStep(prev => {
          if (prev < 3) {
            return prev + 1;
          }
          return prev;
        });
      }, 1500);
    } else {
      setProgressStep(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handlePresetClick = (preset: typeof PRESETS[0]) => {
    setPrompt(preset.prompt);
    setActivePreset(preset.title);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedUrl(null);

    // Build unique ID and random seed to prevent aggressive caching
    const seed = Math.floor(Math.random() * 10000000);
    const sanitizedPrompt = encodeURIComponent(prompt.trim() + ", premium corporate design, ultra-detailed, inspiring art, 4k");
    const targetUrl = `https://image.pollinations.ai/prompt/${sanitizedPrompt}?width=800&height=500&nologo=true&seed=${seed}`;

    // Force image loading to perform fully before displaying
    const img = new Image();
    img.src = targetUrl;
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      setGeneratedUrl(targetUrl);
      setIsGenerating(false);

      // Save to board list automatically
      const newVision: SavedVision = {
        id: seed.toString(),
        prompt: prompt.trim(),
        url: targetUrl,
        timestamp: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        presetTitle: PRESETS.find(p => p.prompt === prompt.trim())?.title
      };

      saveVisionsList([newVision, ...savedVisions]);
    };
    img.onerror = () => {
      setIsGenerating(false);
      alert("Oops! The AI model is currently busy. Please tweak your prompt slightly or try again shortly.");
    };
  };

  const handleDeleteVision = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedVisions.filter(v => v.id !== id);
    saveVisionsList(updated);
    if (generatedUrl && generatedUrl.includes(`seed=${id}`)) {
      setGeneratedUrl(null);
    }
  };

  const handleCopyLink = async (url: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error("Could not copy link", err);
    }
  };

  const steps = [
    "Establishing high-speed link with AI Core...",
    "Scanning parameters and thematic prompt cues...",
    "Synthesizing customized digital pigments...",
    "Refining image contrast and resolving aesthetic values..."
  ];

  return (
    <div className="space-y-16 animate-fade-in" id="vision-generator-section">
      {/* Premium Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border border-yellow-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Studio</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Visual Career <span className="text-yellow-500">Vision Board</span>
        </h2>
        <p className="text-slate-500 text-lg font-medium leading-relaxed">
          Unlock your imagination! Enter any career aspirations or select one of our premium preset options to generate custom concepts of your future workspace, campus milestones, or professional dreams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Creation Controls Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-xl space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <span className="w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">AI</span>
              <span>Workspace Architect</span>
            </h3>

            {/* Quick Presets Grid */}
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Choose Inspired Presets:</span>
              <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => handlePresetClick(preset)}
                    className={`flex items-start text-left p-3 rounded-xl border transition-all ${
                      activePreset === preset.title 
                        ? 'border-yellow-400 bg-yellow-50/50 text-slate-900' 
                        : 'border-slate-100 hover:border-slate-300 bg-slate-50/50 text-slate-600'
                    }`}
                  >
                    <span className="text-xl mr-3 mt-0.5" role="img" aria-label={preset.title}>
                      {preset.emoji}
                    </span>
                    <div>
                      <span className="text-xs font-black block leading-none text-slate-400 uppercase mb-1">{preset.category}</span>
                      <span className="text-sm font-bold block">{preset.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Form */}
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Describe Your Vision:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setActivePreset(null);
                  }}
                  rows={4}
                  placeholder="e.g., A computer science researcher at UG Legon examining robotic prototypes, high-tech lab, futuristic design, beautiful digital illustration..."
                  className="w-full text-sm outline-none px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-800 transition-colors placeholder-slate-400 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-4.5 rounded-2xl font-black text-white flex items-center justify-center space-x-2.5 shadow-xl transition-all active:scale-98 ${
                  isGenerating || !prompt.trim()
                    ? 'bg-slate-300 cursor-not-allowed shadow-none'
                    : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Styling Canvas...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span>Paint My Vision</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Live Canvas Generation Screen */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-[8/5] flex flex-col items-center justify-center text-center p-8 relative shadow-2xl space-y-4 border border-slate-850">
            {isGenerating ? (
              <div className="space-y-6 max-w-md">
                {/* Visual loading bars */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
                  <ImageIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
                    Rendering Progress
                  </p>
                  <p className="text-white font-bold text-lg leading-snug">
                    {steps[progressStep]}
                  </p>
                  <p className="text-slate-400 text-xs">
                    This will take about 5–10 seconds.
                  </p>
                </div>
              </div>
            ) : generatedUrl ? (
              <>
                <img
                  src={generatedUrl}
                  alt={prompt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 pointer-events-auto">
                  <div className="max-w-md text-left space-y-1">
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20 backdrop-blur-md">
                      Interactive Vision
                    </span>
                    <p className="text-white font-black text-xl tracking-tight leading-tight line-clamp-1 mt-1.5">{prompt}</p>
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      onClick={(e) => handleCopyLink(generatedUrl, 'main', e)}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all border border-white/10"
                      title="Copy public URL link"
                    >
                      {copiedId === 'main' ? <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <a
                      href={generatedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-xl transition-all shadow-lg"
                      title="Open full size in new tab"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 max-w-sm">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                  🎨
                </div>
                <div>
                  <h4 className="text-white font-black text-xl tracking-tight">Interactive Canvas Area</h4>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed font-semibold">
                    Enter some descriptions on the left workspace or click on one of our pre-arranged ideas to paint your dynamic vision board instantly!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery of saved vision boards */}
      {savedVisions.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Visions & Aspirations Gallery</h3>
              <p className="text-slate-500 text-sm font-medium">Your customized dream careers, workspaces, and study hubs.</p>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear your visions board? This action cannot be undone.")) {
                  saveVisionsList([]);
                  setGeneratedUrl(null);
                }
              }}
              className="text-xs font-black text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center space-x-1 hover:bg-red-50 px-3 py-2 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Gallery</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedVisions.map((vision) => (
              <div
                key={vision.id}
                onClick={() => setGeneratedUrl(vision.url)}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-slate-300 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group relative"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img
                    src={vision.url}
                    alt={vision.prompt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center space-x-1 border border-slate-100">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-slate-800 text-sm font-bold leading-snug line-clamp-2">
                    "{vision.prompt}"
                  </p>
                  
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 pt-2 border-t border-slate-50">
                    <span>{vision.timestamp}</span>
                    <div className="flex items-center space-x-1.5 pointer-events-auto">
                      <button
                        onClick={(e) => handleCopyLink(vision.url, vision.id, e)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-all"
                        title="Copy image link"
                      >
                        {copiedId === vision.id ? <CheckCircle className="w-3.5 h-3.5 text-green-400 animate-pulse" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => handleDeleteVision(vision.id, e)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                        title="Remove vision card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
