import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Search, Send, Paperclip, Smile, MoreHorizontal, Clock, ExternalLink, User, MessageSquareText } from 'lucide-react';
import { useMessaging, Conversation, CURRENT_USER_HANDLE } from '../context/MessagingContext';
import { creators, getCreatorSidebarLinkEntries } from '../data/mock-data';
import { UserProfileAvatar } from './UserProfileAvatar';
import { LinkPlatformIcon } from './LinkPlatformIcon';
import { InterestTagPillList } from './InterestTagPill';

function PeerAvatar({
  avatarUrl,
  username,
  variant,
}: {
  avatarUrl?: string;
  username: string;
  variant: 'list' | 'header' | 'message' | 'panel';
}) {
  const initial = username.replace('@', '').charAt(0).toUpperCase();
  if (avatarUrl) {
    if (variant === 'message') {
      return (
        <img
          alt=""
          src={avatarUrl}
          className="size-[32px] rounded-full object-cover shrink-0 mt-[2px] ring-1 ring-[#323339]"
        />
      );
    }
    if (variant === 'panel') {
      return (
        <img
          alt=""
          src={avatarUrl}
          className="size-[64px] rounded-full object-cover shrink-0 ring-2 ring-[#323339] shadow-[0px_0px_32px_rgba(165,255,95,0.2)]"
        />
      );
    }
    return (
      <img
        alt=""
        src={avatarUrl}
        className="size-[36px] rounded-full object-cover shrink-0 ring-1 ring-[#323339]"
      />
    );
  }
  if (variant === 'message') {
    return (
      <div className="size-[32px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0 mt-[2px]">
        <span className="font-['Tahoma',sans-serif] font-[700] text-[11px] text-black">{initial}</span>
      </div>
    );
  }
  if (variant === 'panel') {
    return (
      <div className="size-[64px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shadow-[0px_0px_32px_rgba(165,255,95,0.3)]">
        <span className="font-['Tahoma',sans-serif] font-[700] text-[24px] text-black">{initial}</span>
      </div>
    );
  }
  if (variant === 'header') {
    return (
      <div className="size-[36px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
        <span className="font-['Tahoma',sans-serif] font-[700] text-[14px] text-black">{initial}</span>
      </div>
    );
  }
  return (
    <div className="size-[36px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
      <span className="font-['Tahoma',sans-serif] font-[700] text-[13px] text-black">{initial}</span>
    </div>
  );
}

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
        <h2 className="font-['Satoshi',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)] mb-[12px]">
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
        {filtered.length === 0 ? (
          <div className="p-[16px]">
            <div className="bg-[#212226] border border-[#323339] rounded-[12px] p-[16px]">
              <p className="font-['Satoshi',sans-serif] text-[13px] text-[rgba(255,255,255,0.6)] leading-[1.4]">
                No conversations match your search.
              </p>
            </div>
          </div>
        ) : (
          filtered.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];
          const isActive = conv.id === activeId;
          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`flex gap-[10px] items-start w-full p-[14px] text-left transition-colors cursor-pointer border-b border-[#323339] ${
                isActive ? 'bg-[#2a2a2e]' : 'hover:bg-[#212226]'
              }`}
            >
              <PeerAvatar avatarUrl={conv.creatorAvatar} username={conv.creatorUsername} variant="list" />
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
        }))}
      </div>
    </div>
  );
}

function ChatEmptyState() {
  return (
    <div className="flex-1 min-w-0 h-full flex items-center justify-center px-[24px]">
      <div className="max-w-[420px] w-full bg-[#212226] border border-[#323339] rounded-[16px] p-[24px]">
        <div className="size-[48px] rounded-[12px] bg-[rgba(39,39,39,0.87)] border border-[#323339] flex items-center justify-center mb-[14px]">
          <MessageSquareText size={20} className="text-[#a5ff5f]" strokeWidth={1.5} />
        </div>
        <h2 className="font-['Tahoma',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
          Select a conversation
        </h2>
        <p className="mt-[8px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
          Choose a creator on the left to view messages. New conversations will show up here once you send or receive a message request.
        </p>
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

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#323339] shrink-0">
        <div className="flex items-center gap-[12px]">
          <PeerAvatar
            avatarUrl={conversation.creatorAvatar}
            username={conversation.creatorUsername}
            variant="header"
          />
          <span className="font-['Satoshi',sans-serif] font-[700] text-[16px] text-[rgba(255,255,255,0.87)]">
            {conversation.creatorUsername}
          </span>
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
            {group.messages.map((msg) => {
              const isMine = msg.from === CURRENT_USER_HANDLE;
              return (
              <div
                key={msg.id}
                className={`flex gap-[10px] ${isMine ? 'flex-row-reverse' : ''}`}
              >
                {!isMine && (
                  <PeerAvatar
                    avatarUrl={conversation.creatorAvatar}
                    username={conversation.creatorUsername}
                    variant="message"
                  />
                )}
                {isMine && (
                  <UserProfileAvatar className="size-[32px] rounded-full object-cover shrink-0 mt-[2px]" />
                )}
                <div className={`max-w-[65%] flex flex-col gap-[4px] ${isMine ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-[14px] py-[10px] rounded-[16px] ${
                      isMine
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
            );
            })}
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
  const navigate = useNavigate();
  const profileCreator = creators.find((c) => c.id === conversation.creatorId);
  const sidebarLinks = getCreatorSidebarLinkEntries(profileCreator);
  const interestTags = profileCreator?.interestTags ?? [];
  const localTime = profileCreator?.localTime;

  return (
    <div className="w-[240px] shrink-0 border-l border-[#323339] h-full overflow-y-auto p-[22px] flex flex-col gap-[24px]">
      {/* Avatar & username */}
      <div className="flex flex-col items-center gap-[12px]">
        <PeerAvatar
          avatarUrl={conversation.creatorAvatar}
          username={conversation.creatorUsername}
          variant="panel"
        />
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

      {/* Local time — same field as profile sidebar */}
      {localTime && (
        <div className="flex items-center gap-[8px] min-w-0">
          <Clock size={13} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
          <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)] min-w-0">
            Local time {localTime}
          </span>
        </div>
      )}

      {/* Interests — same tags as profile / creator cards */}
      {interestTags.length > 0 && (
        <div className="flex flex-col gap-[10px]">
          <span className="font-['Satoshi',sans-serif] font-[700] text-[12px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.8px]">
            Interests
          </span>
          <InterestTagPillList tags={interestTags} />
        </div>
      )}

      {/* Links — same merge + cap as profile sidebar (socials then portfolio) */}
      {sidebarLinks.length > 0 && (
        <div className="flex flex-col gap-[10px]">
          <span className="font-['Satoshi',sans-serif] font-[700] text-[12px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.8px]">
            Links
          </span>
          <div className="flex flex-col gap-[8px] w-full min-w-0">
            {sidebarLinks.map((entry) =>
              entry.kind === 'social' ? (
                <a
                  key={`social-${entry.social.platform}-${entry.social.handle}`}
                  href={entry.social.url}
                  onClick={(e) => e.preventDefault()}
                  title={`${entry.social.platform}: ${entry.social.handle}`}
                  className="flex gap-[8px] items-center min-h-[38px] px-[8px] py-[5px] rounded-[8px] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer min-w-0"
                >
                  <span className="size-[28px] rounded-full bg-[#272727] flex items-center justify-center shrink-0 border border-[#323339]">
                    <LinkPlatformIcon platform={entry.social.platform} className="size-[16px]" />
                  </span>
                  <span className="flex-1 min-w-0 font-['Satoshi',sans-serif] font-[400] text-[12px] text-[rgba(255,255,255,0.87)] truncate">
                    {entry.social.handle}
                  </span>
                  <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)] shrink-0" strokeWidth={1.5} />
                </a>
              ) : (
                <a
                  key={`portfolio-${entry.link.platform}-${entry.idx}`}
                  href={entry.link.url}
                  onClick={(e) => e.preventDefault()}
                  title={entry.link.platform}
                  className="flex gap-[8px] items-center min-h-[38px] px-[8px] py-[5px] rounded-[8px] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer min-w-0"
                >
                  <span className="size-[28px] rounded-full bg-[#272727] flex items-center justify-center shrink-0 border border-[#323339]">
                    <LinkPlatformIcon platform={entry.link.platform} className="size-[16px]" />
                  </span>
                  <span className="flex-1 min-w-0 font-['Satoshi',sans-serif] font-[400] text-[12px] text-[rgba(255,255,255,0.87)] truncate">
                    {entry.link.platform}
                  </span>
                  <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)] shrink-0" strokeWidth={1.5} />
                </a>
              )
            )}
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

  const activeConv = useMemo(
    () => conversations.find((c) => c.id === conversationId),
    [conversations, conversationId]
  );

  useEffect(() => {
    // Preserve route behavior: only auto-navigate when no conversationId is provided.
    if (!conversationId && conversations.length > 0) navigate(`/chat/${conversations[0].id}`, { replace: true });
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
      <div className="flex h-[calc(100vh-82px-80px)] w-full bg-[#0e0c13] rounded-[16px] border border-[#323339] overflow-hidden">
        <ConversationList
          conversations={conversations}
          activeId={undefined}
          onSelect={handleSelectConversation}
          search={search}
          onSearchChange={setSearch}
        />
        <ChatEmptyState />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-82px-80px)] w-full bg-[#0e0c13] rounded-[16px] border border-[#323339] overflow-hidden">
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