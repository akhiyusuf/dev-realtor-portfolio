'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, Loader2 } from 'lucide-react';
import { chatWithAI } from '../services/openrouter';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Dynamically import ReactMarkdown with no SSR to prevent hydration issues
const DynamicMarkdown = dynamic(
  () => import('react-markdown').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-current bg-opacity-5 rounded-lg p-4">
        <div className="h-4 bg-current bg-opacity-10 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-current bg-opacity-10 rounded w-1/2"></div>
      </div>
    )
  }
);

// Custom components for markdown rendering
const MarkdownComponents = {
  // Handle code blocks and inline code
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (inline) {
      return (
        <code 
          className="px-1.5 py-0.5 rounded bg-opacity-10 bg-current font-mono text-sm" 
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="not-prose my-4">
        <SyntaxHighlighter
          language={language}
          style={useTheme().theme === 'dark' ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.5rem',
            background: useTheme().theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
          }}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },

  // Prevent paragraph wrapping of block elements
  p: ({ children }: any) => {
    const hasBlockElement = React.Children.toArray(children).some(
      child => 
        React.isValidElement(child) && 
        (child.type === 'pre' || 
         child.type === SyntaxHighlighter ||
         child.type === 'table' ||
         child.type === 'ul' ||
         child.type === 'ol' ||
         child.props?.className?.includes('not-prose') ||
         child.props?.className?.includes('overflow-x-auto'))
    );

    if (hasBlockElement) {
      return <>{children}</>;
    }

    return <div className="mb-4 last:mb-0">{children}</div>;
  },

  // Table components with proper structure
  table: ({ children }: any) => (
    <div className="not-prose overflow-x-auto my-4 rounded-lg border border-current border-opacity-10">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-current bg-opacity-5 border-b border-current border-opacity-10">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => (
    <tr className="border-b border-current border-opacity-5 last:border-b-0">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-2 text-left font-semibold border-r border-current border-opacity-5 last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-2 border-r border-current border-opacity-5 last:border-r-0">
      {children}
    </td>
  ),

  // Lists with proper spacing
  ul: ({ children }: any) => (
    <div className="not-prose my-4">
      <ul className="list-disc pl-6 space-y-1">
        {children}
      </ul>
    </div>
  ),
  ol: ({ children }: any) => (
    <div className="not-prose my-4">
      <ol className="list-decimal pl-6 space-y-1">
        {children}
      </ol>
    </div>
  ),
  li: ({ children }: any) => <li>{children}</li>,

  // Other block elements
  blockquote: ({ children }: any) => (
    <div className="not-prose my-4">
      <blockquote className="border-l-4 border-current border-opacity-20 pl-4 py-1 italic">
        {children}
      </blockquote>
    </div>
  ),

  // Headings with proper spacing
  h1: ({ children }: any) => (
    <div className="not-prose my-6">
      <h1 className="text-2xl font-bold">{children}</h1>
    </div>
  ),
  h2: ({ children }: any) => (
    <div className="not-prose my-5">
      <h2 className="text-xl font-bold">{children}</h2>
    </div>
  ),
  h3: ({ children }: any) => (
    <div className="not-prose my-4">
      <h3 className="text-lg font-bold">{children}</h3>
    </div>
  ),
  h4: ({ children }: any) => (
    <div className="not-prose my-4">
      <h4 className="text-base font-bold">{children}</h4>
    </div>
  ),

  // Links with proper styling
  a: ({ children, href }: any) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {children}
    </a>
  ),

  // Horizontal rule
  hr: () => (
    <div className="not-prose my-8">
      <hr className="border-current border-opacity-10" />
    </div>
  ),
};

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await chatWithAI(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-colors
          ${isDark
            ? 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5]'
            : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A]'
          }`}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 right-4 w-[400px] max-w-[90vw] rounded-2xl shadow-2xl overflow-hidden
            ${isDark
              ? 'bg-[#000000] border border-[#1A1A1A]'
              : 'bg-[#FFFFFF] border border-[#E5E5E5]'
            }`}
        >
          {/* Header */}
          <div 
            className={`px-6 py-4 flex items-center justify-between border-b
              ${isDark
                ? 'border-[#1A1A1A]'
                : 'border-[#E5E5E5]'
              }`}
          >
            <div className="flex items-center gap-3">
              <Bot className={isDark ? 'text-[#CCCCCC]' : 'text-[#333333]'} />
              <h3 className={`font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'}`}>
                AI Assistant
              </h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full transition-colors
                ${isDark
                  ? 'text-[#CCCCCC] hover:bg-[#1A1A1A]'
                  : 'text-[#333333] hover:bg-[#F5F5F5]'
                }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div 
            className={`h-[450px] overflow-y-auto p-6 space-y-6
              ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]'}`}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Bot className={`w-12 h-12 mb-2 ${isDark ? 'text-[#333333]' : 'text-[#CCCCCC]'}`} />
                <p className={`text-sm max-w-[280px] ${isDark ? 'text-[#999999]' : 'text-[#666666]'}`}>
                  Hi! I'm your AI development assistant. How can I help you today?
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    relative group max-w-[85%] 
                    ${message.role === 'user'
                      ? isDark
                        ? 'bg-[#FFFFFF] text-[#000000] rounded-2xl px-4 py-3'
                        : 'bg-[#000000] text-[#FFFFFF] rounded-2xl px-4 py-3'
                      : isDark
                        ? 'text-[#FFFFFF]'
                        : 'text-[#000000]'
                    }
                  `}
                >
                  <Suspense 
                    fallback={
                      <div className="animate-pulse bg-current bg-opacity-5 rounded-lg p-4">
                        <div className="h-4 bg-current bg-opacity-10 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-current bg-opacity-10 rounded w-1/2"></div>
                      </div>
                    }
                  >
                    <div className={message.role === 'assistant' ? 'markdown-content' : ''}>
                      {message.role === 'assistant' ? (
                        <DynamicMarkdown components={MarkdownComponents}>
                          {message.content}
                        </DynamicMarkdown>
                      ) : (
                        <div className="prose-sm">{message.content}</div>
                      )}
                    </div>
                  </Suspense>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className={isDark ? 'text-[#FFFFFF]' : 'text-[#000000]'}>
                  <Loader2 className={`w-4 h-4 animate-spin ${isDark ? 'text-[#666666]' : 'text-[#999999]'}`} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div 
            className={`p-4 border-t
              ${isDark
                ? 'border-[#1A1A1A]'
                : 'border-[#E5E5E5]'
              }`}
          >
            <form onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className={`flex-1 resize-none rounded-lg p-2 max-h-32 focus:outline-none focus:ring-2
                  ${isDark
                    ? 'bg-[#1A1A1A] text-[#FFFFFF] placeholder-[#666666] focus:ring-[#333333]'
                    : 'bg-[#F5F5F5] text-[#000000] placeholder-[#999999] focus:ring-[#CCCCCC]'
                  }`}
                rows={1}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50
                  ${isDark
                    ? 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5] disabled:hover:bg-[#FFFFFF]'
                    : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] disabled:hover:bg-[#000000]'
                  }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
