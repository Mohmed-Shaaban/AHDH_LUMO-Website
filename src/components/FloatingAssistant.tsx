import { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Check, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAssistantStore } from '@/providers/context/assistantStore';
import { useAssistantChat, useCbtMessage, useConfirmTool } from '@/features/ai/useAssistant';
import { format } from 'date-fns';
import ToolResultRenderer from './ToolResultRenderer';

const FloatingAssistant = () => {
  const [input, setInput] = useState('');
  const {
    isOpen, toggle, close,
    mode, messages, pendingTool, cbtSessionEnded,
    addMessage, resetChat,
  } = useAssistantStore();

  const chatMutation = useAssistantChat();
  const confirmMutation = useConfirmTool();
  const cbtMutation = useCbtMessage();

  const isPending = chatMutation.isPending || confirmMutation.isPending || cbtMutation.isPending;

  const handleSend = () => {
    const text = input.trim();
    if (!text || isPending) return;

    addMessage({ id: crypto.randomUUID(), role: 'user', text });
    setInput('');

    if (mode === 'cbt') {
      cbtMutation.mutate(text);
    } else {
      chatMutation.mutate(text);
    }
  };

  return (
    <>
      <Button
        onClick={toggle}
        size="icon"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-purple-600 shadow-lg hover:bg-purple-700"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] flex-col rounded-2xl bg-[#1a0f2e] text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div>
              <p className="font-medium">
                {mode === 'cbt' ? 'CBT Session' : 'AI Assistant'}
              </p>
              <p className="text-xs text-white/50">Online and Ready to Help</p>
            </div>
            <button onClick={close}><X className="size-4 text-white/50" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {mode === 'cbt' && (
              <p className="mb-3 text-center text-[11px] text-white/40">
                Not medical advice. In crisis, call 08008880700.
              </p>
            )}
                     <div className="flex flex-col gap-2">
  {messages.map((m) => (
    <div
      key={m.id}
      className={cn(
        'flex flex-col gap-0.5',
        m.role === 'user' ? 'items-end' : 'items-start',
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-xl px-3 py-2 text-sm',
          m.role === 'user'
            ? 'bg-purple-600 text-white'
            : 'bg-white/10 text-white',
        )}
      >
        {m.text}
        {m.role === 'assistant' && m.tool && <ToolResultRenderer tool={m.tool} />}
      </div>
      <span className="px-1 text-[10px] text-white/30">
        {format(new Date(m.createdAt), 'HH:mm')}
      </span>
    </div>
  ))}
  {isPending && (
    <div className="flex items-center gap-1 text-white/40">
      <Loader2 className="size-3 animate-spin" /> typing…
    </div>
  )}
</div>
          </div>

          <div className="border-t border-white/10 p-4">
            {pendingTool && (
              <div className="mb-3 flex flex-col gap-2">
                <Button
                  onClick={() => confirmMutation.mutate()}
                  disabled={confirmMutation.isPending}
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Check className="size-4" />
                  Confirm & Add
                </Button>
                <Button variant="outline" className="gap-2 border-white/10" disabled>
                  <Pencil className="size-4" />
                  Adjust Task
                </Button>
              </div>
            )}

            {mode === 'cbt' && cbtSessionEnded ? (
              <Button onClick={resetChat} className="w-full bg-purple-600 hover:bg-purple-700">
                Start a new session
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message"
                  className="border-white/10 bg-white/5"
                  disabled={isPending}
                />
                <Button size="icon" onClick={handleSend} disabled={isPending} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;