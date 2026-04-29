import { createFileRoute } from '@tanstack/react-router';
import { AgentLayout } from '@/components/AgentLayout';

export const Route = createFileRoute('/agent')({
  component: () => <AgentLayout />,
});
