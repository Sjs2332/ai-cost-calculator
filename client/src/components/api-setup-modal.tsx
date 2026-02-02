import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSession } from "@/lib/session-store";
import { PRICING_MODELS } from "@/lib/pricing-data";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, Lock } from "lucide-react";

export default function ApiSetupModal() {
    const { isAuthenticated, setApiKey, setSelectedModel } = useSession();
    const [open, setOpen] = useState(!isAuthenticated);
    const [inputKey, setInputKey] = useState("");
    const [inputModel, setInputModel] = useState<string>("");

    useEffect(() => {
        setOpen(!isAuthenticated);
    }, [isAuthenticated]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputKey.trim() && inputModel) {
            setApiKey(inputKey.trim());
            setSelectedModel(inputModel);
        }
    };

    // Prevent closing by clicking outside
    const handleOpenChange = (newOpen: boolean) => {
        if (isAuthenticated) {
            setOpen(newOpen);
        }
        // If not authenticated, force stay open
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Setup API Access
                    </DialogTitle>
                    <DialogDescription>
                        Enter your OpenAI API Key and select a model to start a new session.
                        Data is only stored in your browser memory for this session.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="model">Select Text Model</Label>
                            <Select onValueChange={setInputModel} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a model..." />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                    {PRICING_MODELS.map((model) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            <span className="font-medium">{model.id}</span>
                                            <span className="ml-2 text-xs text-muted-foreground">
                                                (${model.inputPrice}/{model.outputPrice})
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apiKey">OpenAI API Key</Label>
                            <div className="relative">
                                <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="apiKey"
                                    type="password"
                                    placeholder="sk-..."
                                    className="pl-9"
                                    value={inputKey}
                                    onChange={(e) => setInputKey(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                Your key is sent directly to OpenAI via a secure server proxy. It is never saved to a database.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full" disabled={!inputKey || !inputModel}>
                            Start Session
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
