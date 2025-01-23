export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="text-sm">
      {'success' in message && <div className="border-foreground text-foreground">{message.success}</div>}
      {'error' in message && <div className="border-destructive text-destructive">{message.error}</div>}
      {'message' in message && <div className="text-foreground">{message.message}</div>}
    </div>
  );
}
