import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Search, Send, Paperclip, Smile, MoreHorizontal, MapPin, ExternalLink, User } from 'lucide-react';
import { useMessaging, Conversation } from '../context/MessagingContext';

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function ConversationList({
  conversations,
  activeId,
  onSelect,
  search,
  onSearchChange,
}: {
  conversations: Conversation[];
  activeId: string | undefined;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  const filtered = conversations.filter((c) =>
    c.creatorUsername.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-[260px] shrink-0 border-r border-[#323339] h-full">
      <div className="p-[16px] border-b border-[#323339]">
        <h2 className="font-['Tahoma',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)] mb-[12px]">
          Messages
        </h2>
        <div className="flex items-center gap-[8px] bg-[#212226] border border-[#323339] rounded-[8px] px-[10px] py-[8px]">
          <Search size={14} className="text-[rgba(255,255,255,0.3)] shrink-0" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none font-['Satoshi',sans-serif] text-[13px] text-[rgba(255,255,255,0.87)] placeholder:text-[rgba(255,255,255,0.3)] w-full"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];
          const initial = conv.creatorUsername.replace('@', '').charAt(0).toUpperCase();
          const isActive = conv.id === activeId;
          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`flex gap-[10px] items-start w-full p-[14px] text-left transition-colors cursor-pointer border-b border-[#323339] ${
                isActive ? 'bg-[#2a2a2e]' : 'hover:bg-[#212226]'
              }`}
            >
              <div className="size-[36px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
                <span className="font-['Tahoma',sans-serif] font-[700] text-[13px] text-black">
                  {initial}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-[4px]">
                  <span className="font-['Satoshi',sans-serif] font-[700] text-[13px] text-[rgba(255,255,255,0.87)] truncate">
                    {conv.creatorUsername}
                  </span>
                  <span className="font-['Satoshi',sans-serif] font-[400] text-[11px] text-[rgba(255,255,255,0.3)] shrink-0">
                    {timeAgo(lastMsg.timestamp)}
                  </span>
                </div>
                <p className="font-['Satoshi',sans-serif] font-[400] text-[12px] text-[rgba(255,255,255,0.4)] truncate mt-[2px]">
                  {lastMsg.text}
                </p>
                {conv.status === 'pending' && (
                  <span className="font-['Satoshi',sans-serif] font-[500] text-[10px] text-[#f59e0b] mt-[2px] inline-block">
                    Pending
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatArea({
  conversation,
  newMessage,
  setNewMessage,
  onSend,
  showInfoPanel,
  onToggleInfoPanel,
}: {
  conversation: Conversation;
  newMessage: string;
  setNewMessage: (v: string) => void;
  onSend: () => void;
  showInfoPanel: boolean;
  onToggleInfoPanel: () => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversation.messages.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  const groupedMessages: { date: string; messages: typeof conversation.messages }[] = [];
  conversation.messages.forEach((msg) => {
    const date = formatDate(msg.timestamp);
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && last.date === date) {
      last.messages.push(msg);
    } else {
      groupedMessages.push({ date, messages: [msg] });
    }
  });

  const initial = conversation.creatorUsername.replace('@', '').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#323339] shrink-0">
        <div className="flex items-center gap-[12px]">
          <div className="size-[36px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
            <span className="font-['Tahoma',sans-serif] font-[700] text-[14px] text-black">
              {initial}
            </span>
          </div>
          <span className="font-['Satoshi',sans-serif] font-[700] text-[16px] text-[rgba(255,255,255,0.87)]">
            {conversation.creatorUsername}
          </span>
          {conversation.status === 'accepted' && (
            <span className="size-[8px] rounded-full bg-[#4ade80]" />
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            className="size-[32px] rounded-full hover:bg-[#2a2a2e] flex items-center justify-center transition-colors cursor-pointer"
          >
            <MoreHorizontal size={18} className="text-[rgba(255,255,255,0.5)]" />
          </button>
          <button
            onClick={onToggleInfoPanel}
            className={`size-[32px] rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              showInfoPanel ? 'bg-[#a5ff5f]' : 'hover:bg-[#2a2a2e]'
            }`}
            title="Toggle profile info"
          >
            <User size={16} className={showInfoPanel ? 'text-black' : 'text-[rgba(255,255,255,0.5)]'} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-[20px] py-[20px] flex flex-col gap-[20px]">
        {groupedMessages.map((group) => (
          <div key={group.date} className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex-1 h-px bg-[#323339]" />
              <span className="font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.8px]">
                {group.date}
              </span>
              <div className="flex-1 h-px bg-[#323339]" />
            </div>
            {group.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-[10px] ${msg.type === 'sent' ? 'flex-row-reverse' : ''}`}
              >
                {msg.type === 'received' && (
                  <div className="size-[32px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0 mt-[2px]">
                    <span className="font-['Tahoma',sans-serif] font-[700] text-[11px] text-black">
                      {initial}
                    </span>
                  </div>
                )}
                {msg.type === 'sent' && (
                  <div className="size-[32px] rounded-full bg-[rgba(39,39,39,0.87)] flex items-center justify-center shrink-0 mt-[2px]">
                    <span className="font-['Tahoma',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.6)]">
                      Y
                    </span>
                  </div>
                )}
                <div className={`max-w-[65%] flex flex-col gap-[4px] ${msg.type === 'sent' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-[14px] py-[10px] rounded-[16px] ${
                      msg.type === 'sent'
                        ? 'bg-[#2a2a2e] border border-[#3a3a42] rounded-br-[4px]'
                        : 'bg-[#2a2a2e] border border-[#323339] rounded-bl-[4px]'
                    }`}
                  >
                    <p
                      className="font-['Satoshi',sans-serif] font-[400] text-[14px] leading-[1.5] text-[rgba(255,255,255,0.87)]"
                    >
                      {msg.text}
                    </p>
                  </div>
                  <span className="font-['Satoshi',sans-serif] font-[400] text-[11px] text-[rgba(255,255,255,0.25)]">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {conversation.status === 'accepted' ? (
        <div className="flex items-end gap-[10px] px-[20px] py-[14px] border-t border-[#323339] shrink-0">
          <div className="flex gap-[4px]">
            <button className="size-[36px] rounded-[8px] hover:bg-[#2a2a2e] flex items-center justify-center transition-colors cursor-pointer">
              <Paperclip size={18} className="text-[rgba(255,255,255,0.4)]" />
            </button>
            <button className="size-[36px] rounded-[8px] hover:bg-[#2a2a2e] flex items-center justify-center transition-colors cursor-pointer">
              <Smile size={18} className="text-[rgba(255,255,255,0.4)]" />
            </button>
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-[#2a2a2e] border border-[#323339] rounded-[12px] px-[14px] py-[10px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.87)] placeholder:text-[rgba(255,255,255,0.3)] outline-none resize-none focus:border-[#a5ff5f] transition-colors leading-[1.4]"
          />
          <button
            onClick={onSend}
            disabled={!newMessage.trim()}
            className={`size-[40px] rounded-[12px] flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              newMessage.trim() ? 'bg-[#a5ff5f] hover:bg-[#8de649]' : 'bg-[rgba(39,39,39,0.87)]'
            }`}
          >
            <Send size={16} className={newMessage.trim() ? 'text-black' : 'text-[rgba(255,255,255,0.3)]'} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-[18px] border-t border-[#323339] shrink-0">
          <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.4)]">
            {conversation.status === 'pending'
              ? 'Waiting for the creator to accept your message request...'
              : 'This conversation has been declined.'}
          </p>
        </div>
      )}
    </div>
  );
}

function UserInfoPanel({ conversation }: { conversation: Conversation }) {
  const info = conversation.creatorInfo;
  const initial = conversation.creatorUsername.replace('@', '').charAt(0).toUpperCase();
  const navigate = useNavigate();

  return (
    <div className="w-[240px] shrink-0 border-l border-[#323339] h-full overflow-y-auto p-[20px] flex flex-col gap-[20px]">
      {/* Avatar & username */}
      <div className="flex flex-col items-center gap-[12px]">
        <div className="size-[64px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center">
          <span className="font-['Tahoma',sans-serif] font-[700] text-[24px] text-black">
            {initial}
          </span>
        </div>
        <span className="font-['Satoshi',sans-serif] font-[700] text-[15px] text-[rgba(255,255,255,0.87)]">
          {conversation.creatorUsername}
        </span>
        <button
          onClick={() => navigate(`/creator/${conversation.creatorId}`)}
          className="font-['Satoshi',sans-serif] font-[500] text-[12px] text-[#a5ff5f] hover:underline cursor-pointer"
        >
          View Full Profile
        </button>
      </div>

      {/* Local time */}
      {info?.localTime && (
        <div className="flex items-center gap-[6px]">
          <MapPin size={13} className="text-[rgba(255,255,255,0.4)]" />
          <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)]">
            Local Time {info.localTime}
          </span>
        </div>
      )}

      {/* Interests */}
      {info?.interests && info.interests.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          <span className="font-['Satoshi',sans-serif] font-[700] text-[12px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.8px]">
            Interests
          </span>
          <div className="flex flex-wrap gap-[6px]">
            {info.interests.map((tag) => (
              <span
                key={tag}
                className="px-[10px] py-[4px] rounded-full bg-[rgba(39,39,39,0.87)] border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.6)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {info?.links && info.links.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          <span className="font-['Satoshi',sans-serif] font-[700] text-[12px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.8px]">
            Links
          </span>
          <div className="flex flex-col gap-[6px]">
            {info.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                className="flex items-center gap-[8px] text-[rgba(255,255,255,0.5)] hover:text-[#a5ff5f] transition-colors group"
              >
                <ExternalLink size={12} className="shrink-0" />
                <span className="font-['Satoshi',sans-serif] font-[500] text-[12px] group-hover:text-[#a5ff5f]">
                  {link.platform}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const { conversations, addMessage } = useMessaging();
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const activeConv = conversations.find((c) => c.id === conversationId) || conversations[0];

  useEffect(() => {
    if (!conversationId && conversations.length > 0) {
      navigate(`/chat/${conversations[0].id}`, { replace: true });
    }
  }, [conversationId, conversations, navigate]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeConv) return;
    addMessage(activeConv.id, newMessage.trim());
    setNewMessage('');
  };

  const handleSelectConversation = (id: string) => {
    setNewMessage('');
    navigate(`/chat/${id}`);
  };

  if (!activeConv) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="font-['Satoshi',sans-serif] text-[rgba(255,255,255,0.6)] text-[16px]">
          No conversations yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-82px-80px)] w-full bg-[#0e0c13] rounded-[8px] border border-[#323339] overflow-hidden">
      <ConversationList
        conversations={conversations}
        activeId={activeConv.id}
        onSelect={handleSelectConversation}
        search={search}
        onSearchChange={setSearch}
      />
      <ChatArea
        conversation={activeConv}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSend={handleSend}
        showInfoPanel={showInfoPanel}
        onToggleInfoPanel={() => setShowInfoPanel(!showInfoPanel)}
      />
      {showInfoPanel && <UserInfoPanel conversation={activeConv} />}
    </div>
  );
}