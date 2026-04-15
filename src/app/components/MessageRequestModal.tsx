import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useMessaging } from '../context/MessagingContext';

interface MessageRequestModalProps {
  creatorId: string;
  creatorUsername: string;
  onClose: () => void;
}

export function MessageRequestModal({ creatorId, creatorUsername, onClose }: MessageRequestModalProps) {
  const [message, setMessage] = useState('');
  const { sendMessageRequest } = useMessaging();
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessageRequest(creatorId, creatorUsername, message.trim());
    setSent(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#212226] rounded-[16px] border border-[#323339] w-full max-w-[520px] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#323339]">
          <h2 className="font-['Tahoma',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
            Draft Message to {creatorUsername}
          </h2>
          <button
            onClick={onClose}
            className="size-[32px] rounded-full bg-[#2a2a2e] flex items-center justify-center cursor-pointer hover:bg-[#323339] transition-colors"
          >
            <X size={16} className="text-[rgba(255,255,255,0.6)]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
          {sent ? (
            <div className="flex items-center justify-center py-[40px]">
              <p className="font-['Satoshi',sans-serif] font-[500] text-[16px] text-[#4ade80]">
                Message request sent!
              </p>
            </div>
          ) : (
            <>
              <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.5)] leading-[1.4]">
                Write a message to introduce yourself and explain what you'd like to collaborate on. The creator will need to accept your request before you can chat.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I'd love to collaborate with you on..."
                rows={6}
                className="w-full bg-[#2a2a2e] border border-[#323339] rounded-[12px] px-[16px] py-[14px] font-['Satoshi',sans-serif] text-[16px] text-[rgba(255,255,255,0.87)] placeholder:text-[rgba(255,255,255,0.3)] outline-none resize-none focus:border-[#a5ff5f] transition-colors leading-[1.6]"
              />
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="flex justify-end px-[24px] py-[16px] border-t border-[#323339]">
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`flex gap-[8px] items-center h-[40px] px-[20px] rounded-[8px] font-['Satoshi',sans-serif] font-[700] text-[14px] transition-colors cursor-pointer ${
                message.trim()
                  ? 'bg-[#a5ff5f] text-black hover:bg-[#8de649]'
                  : 'bg-[rgba(39,39,39,0.87)] text-[rgba(255,255,255,0.3)] cursor-not-allowed'
              }`}
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}