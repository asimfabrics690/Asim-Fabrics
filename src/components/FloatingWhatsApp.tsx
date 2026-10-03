import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck, Check } from 'lucide-react';
import { AsimLogoMark } from './AsimLogo';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  status?: 'sending' | 'delivered';
}

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastSentSuccess, setLastSentSuccess] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Assalam-o-Alaikum! Welcome to ASIM FABRICS. How can we assist you with our 76×68 export cotton bedsheets or fabrics today?',
      time: 'Just now',
    },
  ]);

  const quickPrompts = [
    'I want to place an order for bedsheets',
    'I need wholesale / bulk prices',
    'Do you have 76×68 pure cotton fabric in stock?',
    'What are the dimensions for King Size?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `user-${Date.now()}`;

    // 1. Instantly append user's message with 'sending' status
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed,
      time: timeStr,
      status: 'sending',
    };

    setMessages((prev) => [...prev, newMsg]);
    setCustomMsg('');
    setIsSending(true);

    // 2. Transition to 'delivered' with double check marks (WhatsApp style)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsgId ? { ...m, status: 'delivered' } : m))
      );
      setIsSending(false);
      setLastSentSuccess(trimmed);

      // Bot confirmation reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Inquiry sent! Opening WhatsApp chat with our sales desk (+92 314 6148488)...`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);

        // Launch WhatsApp link
        const encoded = encodeURIComponent(trimmed);
        window.open(`https://wa.me/923146148488?text=${encoded}`, '_blank');
      }, 350);
    }, 400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-92 bg-white rounded-2xl shadow-2xl border border-[#EFE7DA] overflow-hidden animate-fadeIn flex flex-col max-h-[520px]">
          {/* Header */}
          <div className="bg-[#6B001A] text-[#F8F5EF] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <AsimLogoMark size={22} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm leading-tight text-white">
                  ASIM FABRICS
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#D4B36A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Online · Typically replies in minutes</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#F8F5EF] space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#E1FFC7] text-[#111B21] rounded-tr-none border border-[#c3f09f]'
                      : 'bg-white text-[#2A2A2A] rounded-tl-none border border-[#EFE7DA]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      msg.sender === 'user' ? 'text-[#667781]' : 'text-[#8696A0]'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && (
                      <span className="inline-flex items-center ml-0.5">
                        {msg.status === 'delivered' ? (
                          <span
                            className="inline-flex items-center text-[#53BDEB]"
                            title="Delivered (Double Check)"
                          >
                            <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center text-[#8696A0]"
                            title="Sending..."
                          >
                            <Check className="w-3 h-3 stroke-[2]" />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Visual Indicator of Success Banner */}
            {lastSentSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] p-2 rounded-xl flex items-center gap-1.5 animate-fadeIn">
                <CheckCheck className="w-4 h-4 text-[#25D366] shrink-0 stroke-[2.5]" />
                <span className="font-medium">Inquiry sent successfully to WhatsApp!</span>
              </div>
            )}

            {/* Quick Inquiry Options */}
            <div className="pt-1">
              <div className="text-[10px] font-semibold text-[#6B001A] uppercase tracking-wider mb-1.5">
                Quick Inquiries:
              </div>

              <div className="space-y-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left p-2 bg-white hover:bg-[#EFE7DA] border border-[#EFE7DA] rounded-lg text-xs text-[#2A2A2A] transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{prompt}</span>
                    <span className="text-[#6B001A] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#EFE7DA] shrink-0">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Type inquiry here..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(customMsg);
                  }
                }}
                disabled={isSending}
                className="flex-1 px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-xl focus:outline-none focus:border-[#6B001A] text-[#2A2A2A]"
              />
              <button
                onClick={() => handleSend(customMsg)}
                disabled={isSending || !customMsg.trim()}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                  isSending
                    ? 'bg-emerald-100 text-emerald-700'
                    : customMsg.trim()
                    ? 'bg-[#25D366] text-white hover:bg-[#20b859] shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                title="Send inquiry"
                aria-label="Send WhatsApp message"
              >
                {isSending ? (
                  <CheckCheck className="w-4 h-4 text-emerald-600 animate-pulse stroke-[2.5]" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#2A2A2A]/60 px-1">
              <span>Direct to: +92 314 6148488</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCheck className="w-3 h-3 text-[#53BDEB] stroke-[2.5]" /> Double check verified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20b859] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer relative group"
        aria-label="Chat on WhatsApp with ASIM FABRICS"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B36A] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4B36A]" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;

