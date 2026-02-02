import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { calculateCost } from './pricing-data';

interface UsageStats {
    inputTokens: number;
    outputTokens: number;
    totalCost: number;
    requestCount: number;
}


export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface SessionContextType {
    apiKey: string | null;
    selectedModel: string | null;
    usage: UsageStats;
    messages: Message[];
    setApiKey: (key: string) => void;
    setSelectedModel: (model: string) => void;
    trackUsage: (modelId: string, input: number, output: number) => void;
    addMessage: (message: Message) => void;
    resetSession: () => void;
    isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [usage, setUsage] = useState<UsageStats>({
        inputTokens: 0,
        outputTokens: 0,
        totalCost: 0,
        requestCount: 0,
    });

    const trackUsage = (modelId: string, input: number, output: number) => {
        const cost = calculateCost(modelId, input, output);

        setUsage(prev => ({
            inputTokens: prev.inputTokens + input,
            outputTokens: prev.outputTokens + output,
            totalCost: prev.totalCost + cost,
            requestCount: prev.requestCount + 1,
        }));
    };

    const addMessage = (message: Message) => {
        setMessages(prev => [...prev, message]);
    };

    const resetSession = () => {
        setApiKey(null);
        setSelectedModel(null);
        setMessages([]);
        setUsage({
            inputTokens: 0,
            outputTokens: 0,
            totalCost: 0,
            requestCount: 0,
        });
    };

    return (
        <SessionContext.Provider
            value={{
                apiKey,
                selectedModel,
                usage,
                messages,
                setApiKey,
                setSelectedModel,
                trackUsage,
                addMessage,
                resetSession,
                isAuthenticated: !!apiKey && !!selectedModel
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
