import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { fieldService } from '@/api/field.service';
import { FieldForm } from '@/components/FieldForm';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/admin/fields/create')({
  component: CreateField,
});

function CreateField() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return fieldService.createField(data);
    },
    onSuccess: () => {
      toast.success('Field created successfully!');
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      navigate({ to: '/admin/fields' });
    },
    onError: () => {
      toast.error('Failed to create field');
    },
  });

  return (
    <div className="max-w-2xl">
      <FieldForm
        onSubmit={(data) => createMutation.mutateAsync(data)}
        isLoading={createMutation.isPending}
        title="Create New Field"
        submitText="Create Field"
      />
    </div>
  );
}
