export interface PricingModel {
    id: string;
    name: string;
    inputPrice: number; // $ per 1M tokens
    outputPrice: number; // $ per 1M tokens
    cachedInputPrice?: number; // $ per 1M tokens
}

export const PRICING_MODELS: PricingModel[] = [
    { id: "gpt-5.2", name: "gpt-5.2", inputPrice: 1.75, outputPrice: 14.00, cachedInputPrice: 0.175 },
    { id: "gpt-5.1", name: "gpt-5.1", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5", name: "gpt-5", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5-mini", name: "gpt-5-mini", inputPrice: 0.25, outputPrice: 2.00, cachedInputPrice: 0.025 },
    { id: "gpt-5-nano", name: "gpt-5-nano", inputPrice: 0.05, outputPrice: 0.40, cachedInputPrice: 0.005 },
    { id: "gpt-5.2-chat-latest", name: "gpt-5.2-chat-latest", inputPrice: 1.75, outputPrice: 14.00, cachedInputPrice: 0.175 },
    { id: "gpt-5.1-chat-latest", name: "gpt-5.1-chat-latest", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5-chat-latest", name: "gpt-5-chat-latest", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5.2-codex", name: "gpt-5.2-codex", inputPrice: 1.75, outputPrice: 14.00, cachedInputPrice: 0.175 },
    { id: "gpt-5.1-codex-max", name: "gpt-5.1-codex-max", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5.1-codex", name: "gpt-5.1-codex", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5-codex", name: "gpt-5-codex", inputPrice: 1.25, outputPrice: 10.00, cachedInputPrice: 0.125 },
    { id: "gpt-5.2-pro", name: "gpt-5.2-pro", inputPrice: 21.00, outputPrice: 168.00 },
    { id: "gpt-5-pro", name: "gpt-5-pro", inputPrice: 15.00, outputPrice: 120.00 },
    { id: "gpt-4.1", name: "gpt-4.1", inputPrice: 2.00, outputPrice: 8.00, cachedInputPrice: 0.50 },
    { id: "gpt-4.1-mini", name: "gpt-4.1-mini", inputPrice: 0.40, outputPrice: 1.60, cachedInputPrice: 0.10 },
    { id: "gpt-4.1-nano", name: "gpt-4.1-nano", inputPrice: 0.10, outputPrice: 0.40, cachedInputPrice: 0.025 },
    { id: "gpt-4o", name: "gpt-4o", inputPrice: 2.50, outputPrice: 10.00, cachedInputPrice: 1.25 },
    { id: "gpt-4o-2024-05-13", name: "gpt-4o-2024-05-13", inputPrice: 5.00, outputPrice: 15.00 },
    { id: "gpt-4o-mini", name: "gpt-4o-mini", inputPrice: 0.15, outputPrice: 0.60, cachedInputPrice: 0.075 },
    { id: "o1", name: "o1", inputPrice: 15.00, outputPrice: 60.00, cachedInputPrice: 7.50 },
    { id: "o1-pro", name: "o1-pro", inputPrice: 150.00, outputPrice: 600.00 },
    { id: "o3-pro", name: "o3-pro", inputPrice: 20.00, outputPrice: 80.00 },
    { id: "o3", name: "o3", inputPrice: 2.00, outputPrice: 8.00, cachedInputPrice: 0.50 },
    { id: "o4-mini", name: "o4-mini", inputPrice: 1.10, outputPrice: 4.40, cachedInputPrice: 0.275 },
    { id: "o3-mini", name: "o3-mini", inputPrice: 1.10, outputPrice: 4.40, cachedInputPrice: 0.55 },
    { id: "o1-mini", name: "o1-mini", inputPrice: 1.10, outputPrice: 4.40, cachedInputPrice: 0.55 },
    { id: "gpt-5.1-codex-mini", name: "gpt-5.1-codex-mini", inputPrice: 0.25, outputPrice: 2.00, cachedInputPrice: 0.025 },
    { id: "codex-mini-latest", name: "codex-mini-latest", inputPrice: 1.50, outputPrice: 6.00, cachedInputPrice: 0.375 },
];

export function getPricing(modelId: string): PricingModel | undefined {
    return PRICING_MODELS.find(m => m.id === modelId);
}

export function calculateCost(modelId: string, inputTokens: number, outputTokens: number, cachedInputTokens: number = 0): number {
    const model = getPricing(modelId);
    if (!model) return 0;

    const inputCost = (inputTokens / 1_000_000) * model.inputPrice;
    const outputCost = (outputTokens / 1_000_000) * model.outputPrice;
    const cachedInputCost = model.cachedInputPrice ? (cachedInputTokens / 1_000_000) * model.cachedInputPrice : 0;

    return inputCost + outputCost + cachedInputCost;
}
